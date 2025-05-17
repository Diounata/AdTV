import {
  type SignInUserFormInput,
  signInUserFormSchema,
} from '@/features/authentication/validators/sign-in-user-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function useSignInUser() {
  const signInUserForm = useForm<SignInUserFormInput>({
    resolver: zodResolver(signInUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SignInUserFormInput> = useCallback(async ({}) => {
    toast.success('Usuário conectado')
  }, [])

  return {
    signInUserForm,
    onSubmit,
  }
}
