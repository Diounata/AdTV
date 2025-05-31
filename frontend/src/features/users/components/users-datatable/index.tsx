'use client'
import { Button } from '@/components/ui/button'
import { Datatable } from '@/components/ui/datatable'
import { Typography } from '@/components/ui/typography'
import { Plus } from 'lucide-react'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useCreateUser } from '../../hooks/form/use-create-user-form'
import { User } from '../../types/user'
import { UserForm } from '../user-form'
import { userDatatableColumns } from './columns'

export function UsersDatatable() {
  const userData: User[] = [
    {
      id: '1',
      name: 'João Silva',
      type: 'ADMIN',
      email: 'joao.silva@example.com',
      createdAt: '2024-06-01T10:00:00Z',
      updatedAt: '2024-06-05T12:00:00Z',
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      type: 'DEFAULT',
      email: 'maria.oliveira@example.com',
      createdAt: '2024-06-02T09:30:00Z',
      updatedAt: '2024-06-06T11:15:00Z',
    },
    {
      id: '3',
      name: 'Carlos Souza',
      type: 'DEFAULT',
      email: 'carlos.souza@example.com',
      createdAt: '2024-06-03T14:20:00Z',
      updatedAt: '2024-06-07T13:45:00Z',
    },
    {
      id: '4',
      name: 'Ana Paula',
      type: 'ADMIN',
      email: 'ana.paula@example.com',
      createdAt: '2024-06-04T08:10:00Z',
      updatedAt: '2024-06-08T10:30:00Z',
    },
    {
      id: '5',
      name: 'Lucas Pereira',
      type: 'DEFAULT',
      email: 'lucas.pereira@example.com',
      createdAt: '2024-06-05T16:50:00Z',
      updatedAt: '2024-06-09T15:20:00Z',
    },
  ]

  const { createUserForm, onSubmit } = useCreateUser()
  const [isCreatingUser, setIsCreatingUser] = useQueryState('cadastrar-usuario', parseAsBoolean.withDefault(false))

  return (
    <Datatable.Root columns={userDatatableColumns} data={userData}>
      <Datatable.Header className="md:items-end md:flex-row flex-col items-start gap-3">
        <div className="flex flex-col">
          <Typography variant="h2">Usuários</Typography>
          <Typography variant="smallText" className="font-normal opacity-65">
            Gerencie os usuários disponíveis no sistema
          </Typography>
        </div>

        <Button type="button" onClick={() => setIsCreatingUser(true)} className="w-full md:w-fit">
          <Plus /> Novo
        </Button>

        <UserForm
          form={createUserForm}
          onSubmit={onSubmit}
          type="create"
          isOpen={isCreatingUser}
          setIsOpen={setIsCreatingUser}
        />
      </Datatable.Header>

      <Datatable.Table />

      <Datatable.Footer>
        <Datatable.PageContentLength length={userData.length} singularText="usuário" pluralText="usuários" />

        <Datatable.Pagination pagesTotal={1} />
      </Datatable.Footer>
    </Datatable.Root>
  )
}
