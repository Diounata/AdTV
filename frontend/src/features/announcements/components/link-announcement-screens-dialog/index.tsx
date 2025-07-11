import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Announcement } from "../../types/announcement";
import { PropsWithChildren } from "react";
import { useListScreensBySectorQuery } from "@/features/screens/hooks/react-query/use-list-screens-by-sector-query";
import { Loading } from "@/components/ui/loading";
import { Checkbox } from "@/components/ui/form/checkbox";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLinkAnnouncementToScreens } from "../../hooks/forms/use-link-announcement-to-screens-form";

interface Props extends PropsWithChildren {
  announcement: Announcement;
}

export function LinkAnnouncementScreensDialog({
  children,
  announcement,
}: Props) {
  const listScreensBySectorQuery = useListScreensBySectorQuery();
  const { linkAnnouncementToScreensForm, onSubmit } =
    useLinkAnnouncementToScreens({ announcementId: announcement.id });

  return (
    <Dialog>
      {children}
      <DialogContent className="md:min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Vincular telas ao anúncio</DialogTitle>
          <DialogDescription>
            Visualize e edite quais são as telas em que este anúncio será
            exibido.
          </DialogDescription>
        </DialogHeader>

        {listScreensBySectorQuery.isLoading ? (
          <Loading label="Carregando telas..." />
        ) : (
          <Form {...linkAnnouncementToScreensForm}>
            <form
              onSubmit={linkAnnouncementToScreensForm.handleSubmit(onSubmit)}
            >
              {listScreensBySectorQuery.data?.map((sector) => (
                <div key={sector.sectorId} className="mb-3">
                  <h3 className="mb-2 text-lg font-semibold">
                    {sector.sectorName}
                  </h3>

                  <ul className="flex list-none flex-wrap gap-2">
                    {sector.screens.map((screen) => (
                      <Card className="rounded-md px-3 py-2" key={screen.id}>
                        <Checkbox
                          label={screen.name}
                          name="linkedScreensId"
                          value={screen.id}
                        />
                      </Card>
                    ))}
                  </ul>
                </div>
              ))}

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Fechar
                  </Button>
                </DialogClose>

                <SubmitButton onSubmitChildren="Vinculando">
                  <Link /> Vincular telas
                </SubmitButton>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
