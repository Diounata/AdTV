import { Button } from "@/components/ui/button";
import { Datatable } from "@/components/ui/datatable";
import { DialogTrigger } from "@/components/ui/dialog";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useCreateAnnouncement } from "../../hooks/forms/use-create-announcement-form";
import { AnnouncementFormDialog } from "../announcement-form-dialog";

export function AnnouncementHeader() {
  const { createAnnouncementForm, onSubmit } = useCreateAnnouncement();
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useQueryState(
    "criar-anuncio",
    parseAsBoolean.withDefault(false),
  );

  return (
    <Datatable.Header className="flex-col items-start gap-4 md:flex-row">
      <div className="flex flex-col">
        <Typography variant="h2">Anúncios</Typography>
        <Typography variant="smallText" className="font-normal opacity-65">
          Gerencie os anúncios disponíveis no sistema
        </Typography>
      </div>

      <AnnouncementFormDialog
        type="create"
        form={createAnnouncementForm}
        onSubmit={onSubmit}
        isOpen={isCreatingAnnouncement}
        onOpenChange={setIsCreatingAnnouncement}
      >
        <DialogTrigger asChild>
          <Button size="lg">
            <Plus />
            Novo anúncio
          </Button>
        </DialogTrigger>
      </AnnouncementFormDialog>
    </Datatable.Header>
  );
}
