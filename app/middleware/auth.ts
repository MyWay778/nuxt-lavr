import { useAuthStore } from '~/entities/auth-user/composables'

export default defineNuxtRouteMiddleware(to => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated.value) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
