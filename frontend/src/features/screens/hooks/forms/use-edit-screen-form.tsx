import {
  EditScreenFormInput,
  editScreenFormSchema,
} from "@/features/screens/validators/edit-screen-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEditScreenMutation } from "../react-query/use-edit-screen-mutation";
import { useGetScreenQuery } from "../react-query/use-get-screen-query";
import { useListScreensQuery } from "../react-query/use-list-screens-query";

interface Props {
  screenId: string;
}

export function useEditScreen({ screenId }: Props) {
  const editScreenForm = useForm<EditScreenFormInput>({
    resolver: zodResolver(editScreenFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      sectorId: "",
    },
  });

  const [isEditingScreen, setIsEditingScreen] = useQueryState(
    "editar-tela",
    parseAsString,
  );

  const editScreenMutation = useEditScreenMutation({ form: editScreenForm });
  const getScreenQuery = useGetScreenQuery({ screenId });
  const listScreensQuery = useListScreensQuery();

  const onSubmit: SubmitHandler<EditScreenFormInput> = useCallback(
    async ({ name, slug, sectorId }) => {
      await editScreenMutation.mutateAsync({ screenId, name, slug, sectorId });

      setIsEditingScreen(null);
      listScreensQuery.refetch();
      editScreenForm.reset({ name });
      toast.success("Tela atualizada com sucesso");
    },
    [
      editScreenForm,
      editScreenMutation,
      listScreensQuery,
      screenId,
      setIsEditingScreen,
    ],
  );

  useEffect(() => {
    if (!getScreenQuery.isLoading) {
      if (getScreenQuery.isError) {
        toast.error("Erro ao buscar tela");
        setIsEditingScreen(null);
        return;
      }
      editScreenForm.setValue("name", getScreenQuery.data?.name ?? "");
      editScreenForm.setValue("slug", getScreenQuery.data?.slug ?? "");
      editScreenForm.setValue("sectorId", getScreenQuery.data?.sectorId ?? "");
    }
  }, [
    getScreenQuery.data,
    editScreenForm,
    getScreenQuery.isLoading,
    getScreenQuery.isError,
    setIsEditingScreen,
  ]);

  return {
    editScreenForm,
    onSubmit,
    isEditingScreen,
    setIsEditingScreen,
  };
}
