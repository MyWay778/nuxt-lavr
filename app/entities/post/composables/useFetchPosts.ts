import { createPostRepository } from '../repository'

export async function useFetchPosts(key: string = 'posts') {
  const postRepository = createPostRepository(useNuxtApp().$appFetch)
  return useAsyncData(key, () => postRepository.getAll(), {
    default: () => []
  })
}
