import { axiosClient } from '@/lib/axios/axios-client'
import { useMutation } from '@tanstack/react-query'

interface LoginUserRequestData {
  email: string
  password: string
}

interface LoginUserResponseData {
  accessToken: string
}

export function useLoginUserMutation() {
  return useMutation({
    mutationFn: async (data: LoginUserRequestData) => {
      return await axiosClient.post<LoginUserResponseData>('/auth/login', data)
    },
    onSuccess: ({ data }) => {
      localStorage.setItem('accessToken', `Bearer ${data.accessToken}`)
    },
  })
}
