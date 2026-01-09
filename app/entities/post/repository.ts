import type { Repository } from '~/types'
import type { Post } from './types'
import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function createPostRepository(
  fetch: $Fetch<unknown, NitroFetchRequest>
): Pick<Repository<Post>, 'getAll' | 'get' | 'create'> {
  return {
    getAll() {
      return fetch('/posts')
    },
    get(id) {
      return fetch(`/posts/${id}`)
    },
    create(data) {
      return fetch('/posts', {
        method: 'POST',
        body: data
      })
    }
  }
}
