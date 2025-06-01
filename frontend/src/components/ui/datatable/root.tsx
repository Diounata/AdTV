'use client'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  useReactTable,
} from '@tanstack/react-table'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface DatatableContextProps<TData> {
  table: Table<TData>
  columns: ColumnDef<TData, any>[]
}

interface Props<TData, TValue> extends PropsWithChildren {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const DatatableContext = createContext({} as DatatableContextProps<any>)
export const useDatatable = () => useContext(DatatableContext)

export function Root<TData, TValue>({ columns, data, children }: Props<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <DatatableContext.Provider value={{ table, columns }}>
      <div className="w-full">{children}</div>
    </DatatableContext.Provider>
  )
}
