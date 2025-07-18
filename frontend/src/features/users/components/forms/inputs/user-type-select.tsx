import { Select } from '@/components/ui/form/select'

export function UserTypeSelect() {
  return (
    <Select
      label="Tipo"
      name="type"
      placeholder="Selecione o tipo de usuário"
      options={[
        { id: 'admin', label: 'Administrador', value: 'ADMIN' },
        { id: 'default', label: 'Padrão', value: 'DEFAULT' },
      ]}
    />
  )
}
