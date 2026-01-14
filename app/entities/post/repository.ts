import type { Repository } from '~/types'
import type { Post } from './types'
import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function createPostRepository(
  fetch: $Fetch<unknown, NitroFetchRequest>
): Repository<Post> & { getMy: () => Promise<Post[]> } {
  return {
    getAll() {
      return fetch('/posts')
    },
    getMy() {
      return fetch('/posts/my')
    },
    get(id) {
      return fetch(`/posts/${id}`)
    },
    create(data) {
      return fetch('/posts', {
        method: 'POST',
        body: data
      })
    },
    update(id, data) {
      return fetch(`/posts/${id}`, {
        method: 'PUT',
        body: data
      })
    },
    delete(id) {
      return fetch(`/posts/${id}`, {
        method: 'DELETE'
      })
    }
  }
}
