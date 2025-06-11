import { axiosClient } from '@/lib/axios/axios-client'
import { useQuery } from '@tanstack/react-query'

interface ListUsersResponseData {
  users: [
    {
      id: string
      name: string
      email: string
      type: 'ADMIN' | 'DEFAULT'
      createdAt: string
      updatedAt: string | null
    }
  ]
}

export function useListUsersQuery() {
  return useQuery({
    queryKey: ['list-users'],
    queryFn: async () => await axiosClient.get<ListUsersResponseData>('/users'),
  })
}
