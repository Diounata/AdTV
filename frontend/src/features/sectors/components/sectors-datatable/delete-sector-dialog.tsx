import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useDeleteSectorHandler } from "@/features/sectors/hooks/handlers/use-delete-sector-handler";
import { Trash2 } from "lucide-react";
import { PropsWithChildren } from "react";
import { Sector } from "../../types/sector";

interface Props extends PropsWithChildren {
  sector: Sector;
}

export function DeleteSectorDialog({ sector, children }: Props) {
  const { deleteSectorHandler } = useDeleteSectorHandler({
    sectorId: sector.id,
  });

  return (
    <AlertDialog>
      {children}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir setor</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza em excluir o setor{" "}
            <span className="font-bold">{sector.name}</span>? Essa ação não
            poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteSectorHandler()}
            className={buttonVariants({ variant: "destructive" })}
            asChild
          >
            <Button>
              <Trash2 />
              Excluir
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
