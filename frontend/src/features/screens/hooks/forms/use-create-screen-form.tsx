import {
  CreateScreenFormInput,
  createScreenFormSchema,
} from "@/features/screens/validators/create-screen-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateScreenMutation } from "../react-query/use-create-screen-mutation";

export function useCreateScreen() {
  const createScreenForm = useForm<CreateScreenFormInput>({
    resolver: zodResolver(createScreenFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      sectorId: "",
    },
  });

  const createScreenMutation = useCreateScreenMutation({
    form: createScreenForm,
  });
  const [, setIsCreatingScreen] = useQueryState(
    "cadastrar-tela",
    parseAsBoolean,
  );

  const onSubmit: SubmitHandler<CreateScreenFormInput> = useCallback(
    async ({ name, slug, sectorId }) => {
      await createScreenMutation.mutateAsync({
        name,
        slug,
        sectorId,
      });

      setIsCreatingScreen(null);
      toast.success("Tela cadastrada com sucesso");
      createScreenForm.reset();
    },
    [createScreenForm, createScreenMutation, setIsCreatingScreen],
  );

  return {
    createScreenForm,
    onSubmit,
  };
}
