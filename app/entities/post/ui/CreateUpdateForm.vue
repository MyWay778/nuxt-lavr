<script setup lang="ts">
  import type { Post } from '../types'

  const { initValue, successHandler, cancelHandler } = defineProps<{
    initValue?: Partial<Post>
    successHandler?: (newPost: Post) => void
    cancelHandler?: () => void
  }>()

  const initForm = {
    title: initValue?.title || '',
    content: initValue?.content || '',
    url: initValue?.url || '' // transliterated from title
  }

  // Submit
  const formRef = useTemplateRef<HTMLFormElement>('form-ref')
  const { $api } = useNuxtApp()
  const { form, errors, message, pending, submit } = useForm(
    initForm,
    initValue ? form => $api.posts.update(String(initValue.id), { ...initValue, ...form }) : $api.posts.create
  )

  // Url transliteration
  const transliteratedTitle = useTransliterate(() => form.value.title)
  watchEffect(() => {
    form.value.url = transliteratedTitle.value
  })

  async function submitHandler() {
    if (!formRef.value) return

    if (formRef.value.checkValidity()) {
      const newPost = await submit()
      if (!newPost) return

      successHandler && successHandler(newPost)
    } else {
      formRef.value.reportValidity()
    }
  }
</script>

<template>
  <main>
    <form
      ref="form-ref"
      class="gl-form"
      @submit.prevent="submitHandler">
      <div
        v-show="message"
        class="gl-error-msg">
        {{ message }}
      </div>
      <SharedInputWrapper
        label="Title"
        :error="errors['title']">
        <input
          class="gl-input"
          v-model="form.title"
          @update:model-value="
            () => {
              errors.title = ''
              errors.url = ''
            }
          "
          name="title"
          type="text"
          minlength="5"
          maxlength="255"
          required />
      </SharedInputWrapper>

      <SharedInputWrapper
        label="Content"
        :error="errors['content']">
        <textarea
          class="gl-input"
          v-model="form.content"
          @update:model-value="errors.content = ''"
          name="content"
          minlength="5"
          maxlength="255"
          required />
      </SharedInputWrapper>

      <SharedInputWrapper
        label="Url"
        :error="errors['url']">
        <input
          class="gl-input"
          :value="form.url"
          name="url"
          type="text"
          readonly />
      </SharedInputWrapper>

      <div class="gl-flex-gap">
        <button
          type="submit"
          :disabled="pending">
          {{ initValue ? 'Update' : 'Create' }}
        </button>
        <button
          v-if="cancelHandler"
          @click="cancelHandler">
          Cancel
        </button>
      </div>
    </form>
  </main>
</template>
