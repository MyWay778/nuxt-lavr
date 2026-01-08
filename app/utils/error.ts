import type { NuxtError } from '#app'

export function handlePageError(error: NuxtError) {
  if (error.statusCode === 404) {
    throw createError({ statusCode: 404, message: 'Страница не найдена' })
  }
}
