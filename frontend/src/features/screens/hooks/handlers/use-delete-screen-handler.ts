import { toast } from "sonner";
import { useDeleteScreenMutation } from "../react-query/use-delete-screen-mutation";
import { useListScreensQuery } from "../react-query/use-list-screens-query";

interface Props {
  screenId: string;
}

export function useDeleteScreenHandler({ screenId }: Props) {
  const deleteScreenMutation = useDeleteScreenMutation();
  const listScreensQuery = useListScreensQuery();

  async function deleteScreenHandler() {
    await deleteScreenMutation.mutateAsync({ screenId });
    listScreensQuery.refetch();
    toast.success("Tela excluída com sucesso!");
  }

  return { deleteScreenHandler };
}
