export function useForm<Form extends Record<string, unknown>, Response, Error>(
  initForm: Form,
  sendHandler: (form: Form) => Promise<Response | Error>
) {
  const form = ref({ ...initForm })
  const errors = ref(Object.keys(initForm).reduce((acc, key) => ({ ...acc, [key]: '' }), {})) as Ref<
    Record<keyof Form, string>
  >
  const pending = ref(false)
  const message = ref('')

  async function submit() {
    try {
      pending.value = true
      message.value = ''

      return await sendHandler(form.value)
    } catch (error) {
      const unhandledError = handleError(error, {
        422: error => {
          const handledErrors = handleValidationError(error)
          handledErrors.forEach(([field, message]) => {
            if (field in errors.value) {
              errors.value[field as keyof typeof errors.value] = message
            }
          })
        }
      })

      if (unhandledError) {
        console.warn('Unhandled error (useForm): ', unhandledError)
        message.value = 'Произошла ошибка'
        watch(form, () => (message.value = ''), { once: true })
      }
    } finally {
      pending.value = false
    }
  }

  return {
    form,
    errors,
    pending,
    message,
    submit
  }
}
