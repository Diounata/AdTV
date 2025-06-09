import { useEditUser } from '../hooks/form/use-edit-user-form'
import { UserForm } from './user-form'

export function EditUserForm() {
  const { editUserForm, onSubmit, isEditingUser, setIsEditingUser } = useEditUser()

  return (
    <UserForm type="edit" form={editUserForm} onSubmit={onSubmit} isOpen={isEditingUser} setIsOpen={setIsEditingUser} />
  )
}
