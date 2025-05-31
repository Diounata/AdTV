import { CreateUserFormInput, createUserFormSchema } from '@/features/users/validators/create-user-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {}

export function useCreateUser() {
  const [, setIsCreatingUser] = useQueryState('cadastrar-usuario', parseAsBoolean)
  const createUserForm = useForm<CreateUserFormInput>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: '',
      email: '',
      type: '',
    },
  })

  const onSubmit: SubmitHandler<CreateUserFormInput> = useCallback(
    async ({}) => {
      setIsCreatingUser(false)
      toast.success('Usuário cadastrado com sucesso')
    },
    [setIsCreatingUser]
  )

  return {
    createUserForm,
    onSubmit,
  }
}
