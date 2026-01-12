export function useIsPageProtected() {
  const route = useRoute()
  const authMiddlewareName = 'auth'

  const isProtected = computed(
    () =>
      route.meta.middleware &&
      Array.isArray(route.meta.middleware) &&
      route.meta.middleware.includes(authMiddlewareName)
  )

  return {
    isProtected
  }
}
