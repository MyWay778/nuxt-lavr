<script setup lang="ts">
  import { useCreatePost } from '~/entities/post/composables'

  definePageMeta({
    middleware: ['auth']
  })

  const initialForm = {
    title: '',
    content: '',
    url: '' // transliterated from title
  }

  const form = ref({ ...initialForm })

  // Url transliteration
  const transliteratedTitle = useTransliterate(() => form.value.title)
  watchEffect(() => {
    form.value.url = transliteratedTitle.value
  })

  // Submit
  const formRef = useTemplateRef<HTMLFormElement>('form-ref')
  const { errors, create } = useCreatePost()

  async function submitHandler() {
    if (!formRef.value) return

    if (formRef.value.checkValidity()) {
      const success = await create(form.value)
      if (success) {
        navigateTo('/posts')
      }
    } else {
      formRef.value.reportValidity()
    }
  }
</script>

<template>
  <main>
    <h1>Create Post Page</h1>

    <form
      ref="form-ref"
      :class="$style.form"
      @submit.prevent="submitHandler">
      <label>
        <span>Title:&nbsp;</span>
        <input
          :class="$style.input"
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
        <div
          :class="$style.error"
          v-show="errors['content']">
          {{ errors['title'] }}
        </div>
      </label>

      <label>
        <span>Content:&nbsp;</span>
        <textarea
          :class="$style.input"
          v-model="form.content"
          @update:model-value="errors.content = ''"
          name="content"
          minlength="2"
          maxlength="255"
          required />
        <div
          :class="$style.error"
          v-show="errors['content']">
          {{ errors['content'] }}
        </div>
      </label>

      <label>
        <span>Url:&nbsp;</span>
        <input
          :value="form.url"
          name="title"
          type="text"
          readonly />
        <div
          :class="$style.error"
          v-show="errors['url']">
          {{ errors['url'] }}
        </div>
      </label>

      <button type="submit">Create</button>
    </form>
  </main>
</template>

<style module>
  .form {
    display: grid;
    gap: 10px;
    max-width: 400px;
  }

  .input:user-invalid {
    border: 2px solid red;
  }

  .input:valid {
    border: 2px solid green;
  }

  .error {
    color: red;
  }
</style>
