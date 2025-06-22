'use client'
import { ModalSheetDrawer } from '@/components/ui/drawer-sheet'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/form/input'
import { SubmitButton } from '@/components/ui/form/submit-button'
import { useEditUser } from '../../hooks/form/use-edit-user-form'

export function EditUserForm() {
  const { editUserForm, onSubmit, isEditingUser, setIsEditingUser } = useEditUser()

  return (
    <ModalSheetDrawer.Root isOpen={isEditingUser} setIsOpen={setIsEditingUser}>
      <ModalSheetDrawer.Header>
        <ModalSheetDrawer.Title>Editar usuário</ModalSheetDrawer.Title>
        <ModalSheetDrawer.Description>Preencha o formulário para editar seu usuário</ModalSheetDrawer.Description>
      </ModalSheetDrawer.Header>

      <Form {...editUserForm}>
        <form
          onSubmit={editUserForm.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-full overflow-y-auto"
        >
          <div className="flex-1 flex flex-col gap-4 px-4">
            <Input label="Nome" name="name" />
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
