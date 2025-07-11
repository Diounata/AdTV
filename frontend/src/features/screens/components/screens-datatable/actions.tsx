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
import { Eye, EyeOff, MoreHorizontal, Pencil, Trash2, View, Wallpaper } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useDeleteScreenHandler } from "../../hooks/handlers/use-delete-screen-handler";
import { ScreenDisplay } from "../../types/screen-display";
import { DeleteScreenDialog } from "./delete-screen-dialog";
import Link from "next/link";

interface Props {
  screen: ScreenDisplay;
}

export function ScreensDatatableActions({ screen }: Props) {
  const { deleteScreenHandler } = useDeleteScreenHandler({
    screenId: screen.id,
  });
  const [, setScreenId] = useQueryState(
    "editar-tela",
    parseAsString.withDefault(""),
  );

  return (
    <DeleteScreenDialog screen={screen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/tela?tela-id=${screen.id}`} className="w-full">
              <Wallpaper />
              Visualizar tela
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setScreenId(screen.id)}>
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
    </DeleteScreenDialog>
  );
}
