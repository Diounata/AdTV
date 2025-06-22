'use client'
import { ModalSheetDrawer } from '@/components/ui/drawer-sheet'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/form/input'
import { SubmitButton } from '@/components/ui/form/submit-button'
import { useEditUserCredentials } from '../../hooks/form/use-edit-user-credentials-form'

export function EditUserCredentialsForm() {
  const { editUserCredentialsForm, onSubmit, isEditingUserCredentials, setIsEditingUserCredentials } =
    useEditUserCredentials()

  return (
    <ModalSheetDrawer.Root isOpen={isEditingUserCredentials} setIsOpen={setIsEditingUserCredentials}>
      <ModalSheetDrawer.Header>
        <ModalSheetDrawer.Title>Editar credenciais</ModalSheetDrawer.Title>
        <ModalSheetDrawer.Description>Preencha o formulário para editar suas credenciais</ModalSheetDrawer.Description>
      </ModalSheetDrawer.Header>

      <Form {...editUserCredentialsForm}>
        <form
          onSubmit={editUserCredentialsForm.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-full overflow-y-auto"
        >
          <div className="flex-1 flex flex-col gap-4 px-4">
            <Input label="E-mail" name="email" inputProps={{ disabled: true }} />
            <Input label="Senha atual" name="password" inputProps={{ type: 'password' }} />
            <Input label="Nova senha" name="newPassword" inputProps={{ type: 'password' }} />
            <Input label="Repetir nova senha" name="repeatNewPassword" inputProps={{ type: 'password' }} />
          </div>

          <ModalSheetDrawer.Footer>
            <SubmitButton onSubmitChildren="Criando">Editar</SubmitButton>
            <ModalSheetDrawer.Close>Cancelar</ModalSheetDrawer.Close>
          </ModalSheetDrawer.Footer>
        </form>
      </Form>
    </ModalSheetDrawer.Root>
  )
}
