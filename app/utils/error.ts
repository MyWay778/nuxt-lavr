import type { NuxtError } from '#app'
import { FetchError } from 'ofetch'

// Page error handler
export function handlePageError(error: NuxtError) {
  if (error.statusCode === 404) {
    throw createError({ statusCode: 404, message: 'Страница не найдена' })
  }
}

// Fetch error handler
type ErrorHandler = (error: FetchError) => void

export function handleError(error: unknown, handlers: Record<number, ErrorHandler>) {
  if (!isFetchError(error)) return error

  const status = error.statusCode
  if (!status) return error

  if (handlers[status]) {
    handlers[status](error)
  } else {
    return error
  }
}

// Validation
type ValidationErrorEntry = [string, string, unknown]

export function handleValidationError(error: FetchError): ValidationErrorEntry[] {
  const errors: ValidationErrorEntry[] = []

  if (error.statusCode === 422 && Array.isArray(error.data) && error.data.length) {
    error.data.forEach(([field, message, details]) => {
      let displayMessage = ''

      if (message === 'len') {
        displayMessage = `Значение должно быть от ${details[0]} до ${details[1]} символов`
      } else if (message === 'not_unique') {
        displayMessage = 'Значение должно быть уникальным'
      }

      if (displayMessage) {
        errors.push([field, displayMessage, details])
      }
    })
  }

  return errors
}

// Error checks
function isFetchError(error: unknown): error is FetchError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    (error as any).name === 'FetchError'
  )
}

function isNuxtError(error: unknown): error is NuxtError {
  return typeof error === 'object' && error !== null && 'statusCode' in error && 'statusMessage' in error
}
