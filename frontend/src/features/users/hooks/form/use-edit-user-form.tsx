import { EditUserFormInput, editUserFormSchema } from '@/features/users/validators/edit-user-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {}

export function useEditUser() {
  const [isEditingUser, setIsEditingUser] = useQueryState('editar-usuario', parseAsBoolean.withDefault(false))
  const editUserForm = useForm<EditUserFormInput>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onSubmit: SubmitHandler<EditUserFormInput> = useCallback(
    async ({}) => {
      setIsEditingUser(false)
      toast.success('Conta atualizada com sucesso')
    },
    [setIsEditingUser]
  )

  return {
    editUserForm,
    onSubmit,
    isEditingUser,
    setIsEditingUser,
  }
}
