import {
  EditSectorFormInput,
  editSectorFormSchema,
} from "@/features/sectors/validators/edit-sector-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEditSectorMutation } from "../react-query/use-edit-sector-mutation";
import { useGetSectorQuery } from "../react-query/use-get-sector-query";
import { useListSectorsQuery } from "../react-query/use-list-sectors-query";

interface Props {
  sectorId: string;
}

export function useEditSector({ sectorId }: Props) {
  const editSectorForm = useForm<EditSectorFormInput>({
    resolver: zodResolver(editSectorFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const [isEditingSector, setIsEditingSector] = useQueryState(
    "editar-setor",
    parseAsString,
  );

  const editSectorMutation = useEditSectorMutation({ form: editSectorForm });
  const getSectorQuery = useGetSectorQuery({ sectorId });
  const listSectorsQuery = useListSectorsQuery();

  const onSubmit: SubmitHandler<EditSectorFormInput> = useCallback(
    async ({ name, slug }) => {
      await editSectorMutation.mutateAsync({ sectorId, name, slug });

      setIsEditingSector(null);
      listSectorsQuery.refetch();
      editSectorForm.reset({ name });
      toast.success("Setor atualizado com sucesso");
    },
    [
      editSectorForm,
      editSectorMutation,
      listSectorsQuery,
      sectorId,
      setIsEditingSector,
    ],
  );

  useEffect(() => {
    if (!getSectorQuery.isLoading) {
      if (getSectorQuery.isError) {
        toast.error("Erro ao buscar setor");
        setIsEditingSector(null);
        return;
      }
      editSectorForm.setValue("name", getSectorQuery.data?.name ?? "");
      editSectorForm.setValue("slug", getSectorQuery.data?.slug ?? "");
    }
  }, [
    getSectorQuery.data,
    editSectorForm,
    getSectorQuery.isLoading,
    getSectorQuery.isError,
    setIsEditingSector,
  ]);

  return {
    editSectorForm,
    onSubmit,
    isEditingSector,
    setIsEditingSector,
  };
}
