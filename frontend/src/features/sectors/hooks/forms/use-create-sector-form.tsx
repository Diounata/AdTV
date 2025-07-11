import {
  CreateSectorFormInput,
  createSectorFormSchema,
} from "@/features/sectors/validators/create-sector-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSectorMutation } from "../react-query/use-create-sector-mutation";

export function useCreateSector() {
  const createSectorForm = useForm<CreateSectorFormInput>({
    resolver: zodResolver(createSectorFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const createSectorMutation = useCreateSectorMutation({
    form: createSectorForm,
  });
  const [, setIsCreatingSector] = useQueryState(
    "cadastrar-setor",
    parseAsBoolean,
  );

  const onSubmit: SubmitHandler<CreateSectorFormInput> = useCallback(
    async ({ name, slug }) => {
      await createSectorMutation.mutateAsync({
        name,
        slug,
      });

      setIsCreatingSector(null);
      toast.success("Setor cadastrado com sucesso");
      createSectorForm.reset();
    },
    [createSectorForm, createSectorMutation, setIsCreatingSector],
  );

  return {
    createSectorForm,
    onSubmit,
  };
}
