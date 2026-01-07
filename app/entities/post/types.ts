import type { User } from '~/entities/user/types'

export type Post = {
  id: number
  url: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  UserId: number
  User: User
}
