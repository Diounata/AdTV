import { axiosClient } from '@/lib/axios/axios-client'
import { useMutation } from '@tanstack/react-query'

interface EditUserRequestData {
  name: string
}

export function useEditUserMutation() {
  return useMutation({
    mutationFn: async (data: EditUserRequestData) => await axiosClient.put('/users', data),
  })
}
