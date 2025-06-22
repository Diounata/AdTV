import { EditUserFormInput, editUserFormSchema } from '@/features/users/validators/edit-user-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEditUserMutation } from '../react-query/use-edit-user-mutation'
import { useGetMeQuery } from '../react-query/use-get-me-query'

export function useEditUser() {
  const [isEditingUser, setIsEditingUser] = useQueryState('editar-usuario', parseAsBoolean.withDefault(false))
  const editUserMutation = useEditUserMutation()
  const getMeQuery = useGetMeQuery()
  const editUserForm = useForm<EditUserFormInput>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit: SubmitHandler<EditUserFormInput> = useCallback(
    async ({ name }) => {
      await editUserMutation.mutateAsync({ name })

      setIsEditingUser(false)
      getMeQuery.refetch()
      editUserForm.reset({ name })
      toast.success('Conta atualizada com sucesso')
    },
    [editUserForm, editUserMutation, getMeQuery, setIsEditingUser]
  )

  useEffect(() => {
    if (getMeQuery.data) editUserForm.setValue('name', getMeQuery.data.name)
  }, [getMeQuery.data, editUserForm])

  return {
    editUserForm,
    onSubmit,
    isEditingUser,
    setIsEditingUser,
  }
}
