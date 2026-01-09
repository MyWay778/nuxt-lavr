import type { Post } from '../types'

export function useCreatePost() {
  const errors = ref<Pick<Post, 'title' | 'content' | 'url'>>({ title: '', content: '', url: '' })

  async function create(form: Pick<Post, 'title' | 'content' | 'url'>) {
    try {
      return await useNuxtApp().$api.posts.create(form)
    } catch (error) {
      handleError(error, {
        422: error => {
          const handledErrors = handleValidationError(error)
          handledErrors.forEach(([field, message]) => {
            if (field in errors.value) {
              errors.value[field as keyof typeof errors.value] = message
            }
          })
        }
      })
    }
  }

  return { errors, create }
}
