import type { AuthResponse, AuthUser, AuthMeResponse } from '../types'
import { FetchError } from 'ofetch'

export function useAuthStore() {
  const user = useState<AuthUser | null>('auth-user', () => null)
  const isAuthenticated = computed(() => Boolean(user.value))
  const { $appFetch } = useNuxtApp()
  const storageKey = 'token'

  async function login(login: string, password: string) {
    try {
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
    } catch (error) {
      if (error instanceof FetchError) {
        const { data } = error

        if (Array.isArray(data) && Array.isArray(data[0])) {
          if (data[0][1] === 'wrong_credentials') {
            throw new Error('Неверные логин или пароль')
          }
        }

        throw new Error('Ошибка авторизации')
      }
    }
  }

  async function me() {
    if (!user.value) {
      const token = localStorage.getItem(storageKey)
      try {
        const response = await $appFetch<AuthMeResponse>('/auth/check', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (response.auth && response.user) {
          user.value = response.user
        }
      } catch {
        // empty
      }
    }
  }

  function logout() {
    localStorage.removeItem(storageKey)
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    me
  }
}
