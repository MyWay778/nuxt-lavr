<script setup lang="ts">
  import { useAuthStore } from '~/entities/auth-user/composables'

  const initForm = {
    login: '',
    password: ''
  }
  const form = ref({ ...initForm })
  const errorMessage = ref('')
  const authStore = useAuthStore()

  // navigate to home page if user is authenticated
  watchEffect(() => {
    if (authStore.isAuthenticated.value) {
      navigateTo('/')
    }
  })

  async function submit() {
    errorMessage.value = ''

    try {
      await authStore.login(form.value.login, form.value.password)
      form.value = { ...initForm }
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
    <form @submit.prevent="submit">
      <div v-if="errorMessage">{{ errorMessage }}</div>

      <label>
        <span>Login</span>
        <input
          v-model="form.login"
          name="login"
          type="text" />
      </label>

      <label>
        <span>Password</span>
        <input
          v-model="form.password"
          name="password"
          type="password" />
      </label>

      <button type="submit">Login</button>
    </form>
  </main>
</template>
