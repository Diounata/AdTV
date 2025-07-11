import { axiosClient } from '@/lib/axios/axios-client'
import { handleAxiosRequestError } from '@/lib/react-hook-form/handle-request-error'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UseFormReturn } from 'react-hook-form'
import { usersFormErrors } from '../../helpers/errors'
import { useListUsersQuery } from './use-list-users-query'

interface CreateUserRequestData {
  name: string
  email: string
  type: 'ADMIN' | 'DEFAULT'
  password: string
}

interface Props {
  form: UseFormReturn<any>
}

export function useCreateUserMutation({ form }: Props) {
  const listUsersQuery = useListUsersQuery()
  return useMutation({
    mutationFn: async (data: CreateUserRequestData) => await axiosClient.post('/users', data),
    onSuccess: () => {
      listUsersQuery.refetch()
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
