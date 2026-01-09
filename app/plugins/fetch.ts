import { createPostRepository } from '~/entities/post/repository'
import { useAuthStore } from '~/entities/auth-user/composables'

export default defineNuxtPlugin({
  name: 'fetch',
  parallel: true,
  async setup() {
    const config = useRuntimeConfig()
    const baseURL = config.public.baseApiUrl
    const authStore = useAuthStore()

    const appFetch = $fetch.create({
      baseURL,
      onRequest({ options }) {
        options.headers.append('Accept', 'application/json')

        if (import.meta.browser) {
          let token = authStore.getToken() // xss attacks included of course

          if (token) {
            options.headers.append('Authorization', `Bearer ${token}`)
          }
        }
      },
      async onResponseError({ response }) {}
    })

    const api = {
      posts: createPostRepository(appFetch)
    }

    return {
      provide: {
        appFetch,
        api
      }
    }
  }
})
