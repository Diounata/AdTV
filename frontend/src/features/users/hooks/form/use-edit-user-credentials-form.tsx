import {
  EditUserCredentialsFormInput,
  editUserCredentialsFormSchema,
} from '@/features/users/validators/edit-user-credentials-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEditUserCredentialsMutation } from '../react-query/mutations/use-edit-user-credentials-mutation'

export function useEditUserCredentials() {
  const [isEditingUserCredentials, setIsEditingUserCredentials] = useQueryState(
    'editar-credenciais',
    parseAsBoolean.withDefault(false)
  )
  const editUserCredentialsMutation = useEditUserCredentialsMutation()
  const editUserCredentialsForm = useForm<EditUserCredentialsFormInput>({
    resolver: zodResolver(editUserCredentialsFormSchema),
    defaultValues: {
      email: 'alex.araujo@ifms.edu.br',
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  })

  const onSubmit: SubmitHandler<EditUserCredentialsFormInput> = useCallback(
    async ({ currentPassword, newPassword }) => {
      await editUserCredentialsMutation.mutateAsync({ currentPassword, newPassword })

      setIsEditingUserCredentials(false)
      toast.success('Credenciais atualizada com sucesso')
    },
    [editUserCredentialsMutation, setIsEditingUserCredentials]
  )

  return {
    editUserCredentialsForm,
    onSubmit,
    isEditingUserCredentials,
    setIsEditingUserCredentials,
  }
}
