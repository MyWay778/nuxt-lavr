<script setup lang="ts">
  import { useAuthStore } from '~/entities/auth-user/composables'

  const initForm = {
    login: '',
    password: ''
  }

  const authStore = useAuthStore()
  const {
    form,
    errors,
    pending,
    message: errorMessage,
    submit
  } = useForm({
    initForm,
    sendHandler: form => authStore.login(form.login, form.password)
  })

  // navigate to home page if user is authenticated
  const route = useRoute()

  watchEffect(() => {
    if (authStore.isAuthenticated.value) {
      const redirect = (route.query.redirect as string) || '/'
      navigateTo(redirect, { replace: true })
    }
  })

  async function submitHandler() {
    try {
      await submit()
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message
      }
    }
  }
</script>

<template>
  <main>
    <h1>Login page</h1>
    <form
      class="gl-form"
      @submit.prevent="submitHandler">
      <div
        class="gl-error-msg"
        v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <SharedInputWrapper
        label="Login"
        :error="errors.login">
        <input
          v-model="form.login"
          name="login"
          type="text" />
      </SharedInputWrapper>

      <SharedInputWrapper
        label="Password"
        :error="errors.password">
        <input
          v-model="form.password"
          name="password"
          type="password" />
      </SharedInputWrapper>

      <button
        type="submit"
        :disabled="pending">
        Login
      </button>
    </form>
  </main>
</template>
