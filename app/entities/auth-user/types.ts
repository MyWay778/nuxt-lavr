export type AuthUser = {
  id: number
  login: string
  createdAt: string
  updatedAt: string
}

export type AuthResponse = {
  user: AuthUser
  token: string
}

export type AuthMeResponse = {
  auth: true
  user: AuthUser
}
