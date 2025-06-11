import { axiosClient } from '@/lib/axios/axios-client'
import { useMutation } from '@tanstack/react-query'

interface EditUserCredentialsRequestData {
  currentPassword: string
  newPassword: string
}

export function useEditUserCredentialsMutation() {
  return useMutation({
    mutationFn: async (data: EditUserCredentialsRequestData) => await axiosClient.put('/users/password', { data }),
  })
}
