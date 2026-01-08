export default defineNuxtPlugin({
  name: 'fetch',
  parallel: true,
  async setup() {
    const config = useRuntimeConfig()
    const baseURL = config.public.baseApiUrl

    const appFetch = $fetch.create({
      baseURL,
      onRequest({ options }) {
        options.headers.append('Accept', 'application/json')
      },
      async onResponseError({ response }) {}
    })

    return {
      provide: {
        appFetch
      }
    }
  }
})
