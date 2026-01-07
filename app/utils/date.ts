export function toLocalDate(isoDate: string) {
  const date = new Date(isoDate)

  const formatted = date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return formatted
}
