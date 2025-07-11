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
import { useDeleteAnnouncementHandler } from "@/features/announcements/hooks/handlers/use-delete-announcement-handler";
import { Trash2 } from "lucide-react";
import { PropsWithChildren } from "react";
import { Announcement } from "../../types/announcement";

interface Props extends PropsWithChildren {
  announcement: Announcement;
}

export function DeleteAnnouncementDialog({ announcement, children }: Props) {
  const { deleteAnnouncementHandler } = useDeleteAnnouncementHandler({
    announcementId: announcement.id,
  });

  return (
    <AlertDialog>
      {children}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir anúncio</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza em excluir o anúncio{" "}
            <span className="font-bold">{announcement.name}</span>? Essa ação
            não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteAnnouncementHandler()}
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
