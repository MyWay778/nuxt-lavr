import { createPostRepository } from '../repository'

export function useFetchPost(id: MaybeRefOrGetter) {
  const postRepository = createPostRepository(useNuxtApp().$appFetch)
  const { data, pending, error } = useAsyncData(`post-${toValue(id)}`, () => postRepository.get(toValue(id)), {
    default: () => null
  })

  usePageErrorHandler(error)

  return {
    post: data,
    loading: pending
  }
}
