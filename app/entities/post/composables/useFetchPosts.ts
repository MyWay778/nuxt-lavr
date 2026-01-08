import { createPostRepository } from '../repository'

export function useFetchPosts() {
  const postRepository = createPostRepository(useNuxtApp().$appFetch)
  const { data, pending } = useAsyncData('posts', () => postRepository.getAll(), { default: () => [] })

  return {
    posts: data,
    loading: pending
  }
}
