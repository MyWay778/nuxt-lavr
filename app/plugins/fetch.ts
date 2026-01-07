export default defineNuxtPlugin({
  name: 'fetch',
  parallel: true,
  async setup() {
    const baseURL = 'http://localhost:3001' //todo: of course it can be it env

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
