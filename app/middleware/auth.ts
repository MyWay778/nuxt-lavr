import { useAuthStore } from '~/entities/auth-user/composables'

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
