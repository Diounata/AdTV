import {
  Table as ShadCNTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { EmptyStateRow } from "./empty-state-row";
import { useDatatable } from "./root";

interface Props {
  emptyState?: typeof EmptyStateRow;
}

export function Table({ emptyState: EmptyState = EmptyStateRow }: Props) {
  const { table } = useDatatable();

  return (
    <div className="bg-card my-2 overflow-x-auto rounded-md border">
      <ShadCNTable className="w-max lg:w-full">
        <TableHeader className="bg-muted dark:bg-zinc-950">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <EmptyState />
          )}
        </TableBody>
      </ShadCNTable>
    </div>
  );
}
