import { axiosClient } from '@/lib/axios/axios-client'
import { useQuery } from '@tanstack/react-query'
import { decodeJwt } from 'jose'

interface GetMeResponseData {
  user: {
    id: string
    name: string
    email: string
    type: 'ADMIN' | 'DEFAULT'
    createdAt: string
    updatedAt?: string
  }
}

export function useGetMeQuery() {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) throw new Error('Unauthorized user')

  const { sub } = decodeJwt(accessToken)

  return useQuery({
    queryKey: ['get-me', sub],
    queryFn: async () => await axiosClient.get<GetMeResponseData>('/auth/me'),
  })
}
