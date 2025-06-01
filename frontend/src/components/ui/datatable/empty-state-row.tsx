import { PropsWithChildren } from 'react'
import { TableCell, TableRow } from '../table'
import { useDatatable } from './root'

export function EmptyStateRow({ children }: PropsWithChildren) {
  const { columns } = useDatatable()

  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        {children ?? 'Sem resultados.'}
      </TableCell>
    </TableRow>
  )
}
