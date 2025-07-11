import { toast } from "sonner";
import { useDeleteAnnouncementMutation } from "../react-query/use-delete-announcement-mutation";
import { useListAnnouncementsQuery } from "../react-query/use-list-announcements-query";

interface Props {
  announcementId: string;
}

export function useDeleteAnnouncementHandler({ announcementId }: Props) {
  const deleteAnnouncementMutation = useDeleteAnnouncementMutation();
  const listAnnouncementsQuery = useListAnnouncementsQuery();

  async function deleteAnnouncementHandler() {
    await deleteAnnouncementMutation.mutateAsync({ announcementId });
    listAnnouncementsQuery.refetch();
    toast.success("Anúncio excluído com sucesso!");
  }

  return { deleteAnnouncementHandler };
}
