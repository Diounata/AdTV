import { axiosClient } from '@/lib/axios/axios-client'
import { handleAxiosRequestError } from '@/lib/react-hook-form/handle-request-error'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UseFormReturn } from 'react-hook-form'
import { usersFormErrors } from '../../helpers/errors'

interface EditUserCredentialsRequestData {
  currentPassword: string
  newPassword: string
}

interface Props {
  form: UseFormReturn<any>
}

export function useEditUserCredentialsMutation({ form }: Props) {
  return useMutation({
    mutationFn: async (data: EditUserCredentialsRequestData) => await axiosClient.put('/users/password', data),
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
