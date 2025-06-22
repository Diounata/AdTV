'use client'
import { axiosClient } from '@/lib/axios/axios-client'
import { useQuery } from '@tanstack/react-query'
import { User } from '../../types/user'

interface GetMeResponseData {
  user: User
}

export function useGetMeQuery() {
  return useQuery({
    queryKey: ['get-me'],
    queryFn: async () => {
      const response = await axiosClient.get<GetMeResponseData>('/users/me')
      return response.data.user
    },
  })
}
