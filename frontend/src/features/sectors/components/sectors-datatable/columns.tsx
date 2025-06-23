"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { SectorDisplay } from "../../types/sector-display";
import { SectorsDatatableActions } from "./actions";

export const sectorDatatableColumns: ColumnDef<SectorDisplay>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <Badge variant="secondary">{row.original.slug}</Badge>,
  },
  {
    accessorKey: "screensCount",
    header: "Total de telas",
    cell: ({ row }) => {
      const screensCount = row.original.screensCount;
      if (screensCount === 0) return "Nenhuma";
      return `${screensCount} tela${screensCount > 1 ? "s" : ""}`;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => format(row.original.createdAt, "dd/MM/yyyy 'às' HH:mm"),
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: ({ row }) =>
      row.original.updatedAt
        ? format(row.original.updatedAt, "dd/MM/yyyy 'às' HH:mm")
        : "Nunca",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <SectorsDatatableActions sector={row.original} />,
  },
];
