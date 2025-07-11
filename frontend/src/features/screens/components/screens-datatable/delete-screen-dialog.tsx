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
import { useDeleteScreenHandler } from "@/features/screens/hooks/handlers/use-delete-screen-handler";
import { Trash2 } from "lucide-react";
import { PropsWithChildren } from "react";
import { ScreenDisplay } from "../../types/screen-display";

interface Props extends PropsWithChildren {
  screen: ScreenDisplay;
}

export function DeleteScreenDialog({ screen, children }: Props) {
  const { deleteScreenHandler } = useDeleteScreenHandler({
    screenId: screen.id,
  });

  return (
    <AlertDialog>
      {children}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir tela</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza em excluir a tela{" "}
            <span className="font-bold">{screen.name}</span>? Essa ação não
            poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteScreenHandler()}
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
