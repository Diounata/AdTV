export type UserType = 'ADMIN' | 'DEFAULT'

export interface User {
  id: string
  name: string
  type: UserType
  email: string
  createdAt: string
  updatedAt?: string
}
