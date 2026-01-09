<script setup lang="ts">
  definePageMeta({
    middleware: ['auth']
  })

  const initialForm = {
    title: '',
    content: '',
    url: ''
  }

  const form = ref({ ...initialForm })
  const transliteratedTitle = useTransliterate(() => form.value.title)
  watchEffect(() => {
    form.value.url = transliteratedTitle.value
  })
  const formRef = useTemplateRef<HTMLFormElement>('form-ref')

  async function submitHandler() {
    if (!formRef.value) return
    if (formRef.value.checkValidity()) {
      try {
        const response = await useNuxtApp().$api.posts.create(form.value)
        navigateTo('/posts')
      } catch (error) {
        console.warn('Error:', error)
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
          name="title"
          type="text"
          minlength="5"
          maxlength="255"
          required />
      </label>

      <label>
        <span>Content:&nbsp;</span>
        <textarea
          :class="$style.input"
          v-model="form.content"
          name="content"
          minlength="25"
          maxlength="255"
          required />
      </label>

      <label>
        <span>Url:&nbsp;</span>
        <input
          :value="form.url"
          name="title"
          type="text"
          readonly />
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
</style>
