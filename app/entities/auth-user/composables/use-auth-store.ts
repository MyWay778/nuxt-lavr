import type { AuthResponse, AuthUser, AuthMeResponse } from '../types'

export function useAuthStore() {
  const user = useState<AuthUser | null>('auth-user', () => null)
  const isAuthenticated = computed(() => Boolean(user.value))
  const { $appFetch } = useNuxtApp()
  const storageKey = 'token'
  const pending = ref(false)

  async function login(login: string, password: string) {
    const response = await $appFetch<AuthResponse>('/auth/login', {
      method: 'post',
      body: { login, password },
      responseType: 'json'
    })

    if (!response.user || !response.token) {
      console.warn('Auth error')
      return false
    }

    localStorage.setItem(storageKey, response.token)

    user.value = response.user

    return true
  }

  async function me() {
    if (!user.value) {
      pending.value = true

      try {
        const response = await $appFetch<AuthMeResponse>('/auth/check')
        if (response.auth && response.user) {
          user.value = response.user
        }
      } catch {
        // empty
      } finally {
        pending.value = false
      }
    }
  }

  function logout(toLogin = false) {
    localStorage.removeItem(storageKey)
    user.value = null

    if (toLogin) {
      navigateTo('/login')
    }
  }

  function getToken() {
    return localStorage.getItem(storageKey)
  }

  return {
    user,
    isAuthenticated,
    pending,
    login,
    logout,
    me,
    getToken
  }
}
