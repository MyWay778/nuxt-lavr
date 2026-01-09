import { slugify } from 'transliteration'

export function useTransliterate(value: MaybeRefOrGetter, options = { slugify: true }) {
  return computed(() => {
    return options.slugify ? slugify(toValue(value)) : toValue(value) // transliterate can be imported and used
  })
}
