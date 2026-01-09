import { createPostRepository } from '../repository'

export async function useFetchPost(id: MaybeRefOrGetter) {
  const postRepository = createPostRepository(useNuxtApp().$appFetch)
  return useAsyncData(`post-${toValue(id)}`, () => postRepository.get(toValue(id)), {
    default: () => null
  }).then(res => {
    usePageErrorHandler(res.error)
    return res
  })
}
