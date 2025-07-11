'use client'
import { axiosClient } from '@/lib/axios/axios-client'
import { useMutation } from '@tanstack/react-query'

export function useLogoutUserMutation() {
  return useMutation({
    mutationFn: async () => await axiosClient.post('/auth/logout'),
  })
}
