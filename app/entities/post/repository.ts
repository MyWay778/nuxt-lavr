import type { Repository } from '~/types'
import type { Post } from './types'
import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function createPostRepository(
  fetch: $Fetch<unknown, NitroFetchRequest>
): Pick<Repository<Post>, 'getAll' | 'get'> {
  return {
    getAll() {
      return fetch('/posts')
    },
    get(id: string) {
      return fetch(`/posts/${id}`)
    }
  }
}
