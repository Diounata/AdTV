import {
  EditUserCredentialsFormInput,
  editUserCredentialsFormSchema,
} from '@/features/users/validators/edit-user-credentials-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEditUserCredentialsMutation } from '../react-query/use-edit-user-credentials-mutation'
import { useGetMeQuery } from '../react-query/use-get-me-query'

export function useEditUserCredentials() {
  const editUserCredentialsForm = useForm<EditUserCredentialsFormInput>({
    resolver: zodResolver(editUserCredentialsFormSchema),
    defaultValues: {
      email: '',
      password: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  })

  const [isEditingUserCredentials, setIsEditingUserCredentials] = useQueryState(
    'editar-credenciais',
    parseAsBoolean.withDefault(false)
  )
  const editUserCredentialsMutation = useEditUserCredentialsMutation({ form: editUserCredentialsForm })
  const getMetQuery = useGetMeQuery()

  const onSubmit: SubmitHandler<EditUserCredentialsFormInput> = useCallback(
    async ({ password, newPassword }) => {
      await editUserCredentialsMutation.mutateAsync({ currentPassword: password, newPassword })

      setIsEditingUserCredentials(false)
      toast.success('Credenciais atualizada com sucesso')
      editUserCredentialsForm.reset({ email: editUserCredentialsForm.getValues('email') })
    },
    [editUserCredentialsForm, editUserCredentialsMutation, setIsEditingUserCredentials]
  )

  useEffect(() => {
    if (getMetQuery.data) editUserCredentialsForm.setValue('email', getMetQuery.data.email)
  }, [editUserCredentialsForm, getMetQuery.data])

  return {
    editUserCredentialsForm,
    onSubmit,
    isEditingUserCredentials,
    setIsEditingUserCredentials,
  }
}
