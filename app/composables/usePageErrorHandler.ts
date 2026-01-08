import type { NuxtError } from '#app'

export function usePageErrorHandler(
  error?: MaybeRefOrGetter<NuxtError<unknown> | undefined>,
  options = { fatal: true }
) {
  if (!error) return

  watchSyncEffect(() => {
    const errorValue = toValue(error)
    if (!errorValue) return

    if (errorValue.statusCode === 404) {
      throw createError({ statusCode: 404, message: 'Страница не найдена', fatal: options.fatal })
    }
  })
}
