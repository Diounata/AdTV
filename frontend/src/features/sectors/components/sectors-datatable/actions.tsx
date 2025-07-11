import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sector } from "@/features/sectors/types/sector";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useDeleteSectorHandler } from "../../hooks/handlers/use-delete-sector-handler";
import { DeleteSectorDialog } from "./delete-sector-dialog";

interface Props {
  sector: Sector;
}

export function SectorsDatatableActions({ sector }: Props) {
  const { deleteSectorHandler } = useDeleteSectorHandler({
    sectorId: sector.id,
  });
  const [, setSectorId] = useQueryState(
    "editar-setor",
    parseAsString.withDefault(""),
  );

  return (
    <DeleteSectorDialog sector={sector}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setSectorId(sector.id)}>
            <Pencil />
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <AlertDialogTrigger className="w-full">
              <Trash2 className="text-red-600" />
              <span className="text-red-600">Excluir</span>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </DeleteSectorDialog>
  );
}
