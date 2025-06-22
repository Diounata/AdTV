'use client'
import { usersFormErrors } from '@/features/users/helpers/errors'
import { axiosClient } from '@/lib/axios/axios-client'
import { handleAxiosRequestError } from '@/lib/react-hook-form/handle-request-error'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UseFormReturn } from 'react-hook-form'

interface LoginUserRequestData {
  email: string
  password: string
}

interface LoginUserResponseData {
  accessToken: string
}

interface Props {
  form: UseFormReturn<any>
}

export function useLoginUserMutation({ form }: Props) {
  return useMutation({
    mutationFn: async (data: LoginUserRequestData) => {
      return await axiosClient.post<LoginUserResponseData>('/auth/login', data)
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        handleAxiosRequestError({
          e: error,
          form,
          formErrors: usersFormErrors,
        })
      }
    },
  })
}
