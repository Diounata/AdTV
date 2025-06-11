import {
  type SignInUserFormInput,
  signInUserFormSchema,
} from '@/features/authentication/validators/sign-in-user-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLoginUserMutation } from '../react-query/mutations/use-login-user-mutation'

export function useSignInUser() {
  const router = useRouter()
  const loginUserMutation = useLoginUserMutation()
  const signInUserForm = useForm<SignInUserFormInput>({
    resolver: zodResolver(signInUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SignInUserFormInput> = useCallback(
    async ({ email, password }) => {
      await loginUserMutation.mutateAsync({
        email,
        password,
      })

      toast.info('Usuário autenticado com sucesso')
      router.push('/dashboard')
    },
    [loginUserMutation, router]
  )

  return {
    signInUserForm,
    onSubmit,
  }
}
