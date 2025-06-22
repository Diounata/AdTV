"use client";
import { Badge } from "@/components/ui/badge";

import { User } from "@/features/users/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { UsersDatatableActions } from "./actions";

export const userDatatableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: () => <span className="pl-18">Nome</span>,
    cell: ({ row }) => {
      const name = row.original.name || "Sem nome";
      return (
        <p className="line-clamp-1 truncate text-pretty">
          <Badge variant="outline" className="mr-2 w-16">
            {row.original.type === "ADMIN" ? "ADMIN" : "PADRÃO"}
          </Badge>
          {name}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: "E-mail",
    cell: ({ row }) => row.original.email || "-",
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
    cell: ({ row }) => <UsersDatatableActions user={row.original} />,
  },
];
