'use client'
import { Badge } from '@/components/ui/badge'
import { User } from '@/features/users/types/user'
import { ColumnDef } from '@tanstack/react-table'
import { formatDistanceToNow } from 'date-fns'
import { UserActionsDropdown } from './actions-dropdown'

export const userDatatableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      const name = row.original.name || 'Sem nome'
      const type = row.original.type

      return (
        <p className="line-clamp-1 truncate text-pretty">
          <Badge variant="outline" className="uppercase w-16">
            {type === 'ADMIN' ? 'Admin' : 'Padrão'}
          </Badge>{' '}
          {name}
        </p>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    cell: ({ row }) => row.original.email || '-',
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => formatDistanceToNow(new Date(row.original.createdAt), { addSuffix: true }),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Atualizado em',
    cell: ({ row }) =>
      row.original.updatedAt ? formatDistanceToNow(new Date(row.original.updatedAt), { addSuffix: true }) : 'Nunca',
  },
  {
    accessorKey: 'actions',
    enableHiding: false,
    header: '',
    cell: ({ row }) => <UserActionsDropdown user={row.original} />,
  },
]
