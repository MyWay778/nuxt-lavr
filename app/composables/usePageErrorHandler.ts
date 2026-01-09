import type { NuxtError } from '#app'
import { FetchError } from 'ofetch'

export function usePageErrorHandler(
  error?: MaybeRefOrGetter<NuxtError<unknown> | FetchError | undefined>,
  options = { fatal: true }
) {
  if (!error) return

  const errorValue = toValue(error)
  if (!errorValue) return

  if (errorValue.statusCode === 404) {
    throw createError({ statusCode: 404, message: 'Страница не найдена', fatal: options.fatal })
  }
}
