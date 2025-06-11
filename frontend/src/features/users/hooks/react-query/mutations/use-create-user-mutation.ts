import { axiosClient } from '@/lib/axios/axios-client'
import { useMutation } from '@tanstack/react-query'

interface CreateUserRequestData {
  name: string
  email: string
  type: 'ADMIN' | 'DEFAULT'
  password: string
}

export function useCreateUserMutation() {
  return useMutation({
    mutationFn: async (data: CreateUserRequestData) => await axiosClient.post('/users', { data }),
  })
}
