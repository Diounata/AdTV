import { toast } from "sonner";
import { useDeleteSectorMutation } from "../react-query/use-delete-sector-mutation";
import { useListSectorsQuery } from "../react-query/use-list-sectors-query";

interface Props {
  sectorId: string;
}

export function useDeleteSectorHandler({ sectorId }: Props) {
  const deleteSectorMutation = useDeleteSectorMutation();
  const listSectorsQuery = useListSectorsQuery();

  async function deleteSectorHandler() {
    await deleteSectorMutation.mutateAsync({ sectorId });
    listSectorsQuery.refetch();
    toast.success("Setor excluído com sucesso!");
  }

  return { deleteSectorHandler };
}
