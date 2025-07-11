"use client";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { differenceInMinutes, format, formatDistanceToNow } from "date-fns";
import { ScreenDisplay } from "../../types/screen-display";
import { ScreensDatatableActions } from "./actions";

export const screenDatatableColumns: ColumnDef<ScreenDisplay>[] = [
  {
    accessorKey: "name",
    header: () => <div className="ml-20">Nome</div>,
    cell: ({ row }) => {
      const timeDifferenceInMinutes = differenceInMinutes(
        new Date(),
        row.original.lastDeviceSeenAt,
      );
      const isActive = timeDifferenceInMinutes < 5;
      const distanceToNow = formatDistanceToNow(row.original.lastDeviceSeenAt, {
        addSuffix: true,
      });

      return (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger className="flex w-18 justify-end">
              <Badge
                variant="outline"
                className={cn(
                  "ml-2 flex items-center gap-1.5 border-0",
                  isActive ? "bg-green-500/15" : "bg-red-500/15",
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-4xl",
                    isActive ? "bg-green-500" : "bg-red-500",
                  )}
                />
                {isActive ? "Ativo" : "Inativo"}
              </Badge>
            </TooltipTrigger>

            <TooltipContent
              className={cn(
                "flex items-center gap-2",
                isActive ? "bg-green-600" : "bg-red-500",
              )}
              arrowClassName={cn(
                isActive
                  ? "bg-green-600 fill-green-600"
                  : "bg-red-500 fill-red-500",
              )}
            >
              <span className="text-sm">
                {row.original.lastDeviceSeenAt ? (
                  <>Última atualização {distanceToNow} atrás</>
                ) : (
                  <>Tela nunca acessada</>
                )}
              </span>
            </TooltipContent>
          </Tooltip>

          <span>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <Badge variant="secondary">{row.original.slug}</Badge>,
  },
  {
    accessorKey: "sectorName",
    header: "Setor",
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
    cell: ({ row }) => <ScreensDatatableActions screen={row.original} />,
  },
];
