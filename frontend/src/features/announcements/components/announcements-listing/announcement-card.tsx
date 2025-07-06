import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  EllipsisVertical,
  Image as LucideImage,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { Announcement } from "../../types/announcement";
import { EditAnnouncementFormDialog } from "../announcement-form-dialog/edit-announcement-form-dialog";
import { DeleteAnnouncementDialog } from "./delete-announcement-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Props {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: Props) {
  const [, setEditingAnnouncement] = useQueryState("editar-anuncio");
  return (
    <>
      <div
        className={cn(
          "rounsded-lg relative flex flex-col overflow-hidden rounded-xl bg-white shadow transition-transform duration-200",
        )}
      >
        <div className="group flex h-40 w-full items-center justify-center bg-gray-100">
          {announcement.mediaFilename ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/uploads/${announcement.mediaFilename}`}
              alt="Imagem do anúncio"
              width={100}
              height={100}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
            />
          ) : (
            <LucideImage
              size={80}
              className="text-gray-400"
              aria-label="Imagem do anúncio"
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-2 p-6">
          <Typography className="font-medium">{announcement.name}</Typography>
        </div>

        <DeleteAnnouncementDialog announcement={announcement}>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 z-10 bg-white/50 shadow-md backdrop-blur"
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setEditingAnnouncement(announcement.id)}
              >
                <Pencil /> Editar
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  <Trash2 className="text-red-600" />
                  <span className="text-red-600">Excluir</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </DeleteAnnouncementDialog>
      </div>

      <EditAnnouncementFormDialog announcement={announcement} />
    </>
  );
}
