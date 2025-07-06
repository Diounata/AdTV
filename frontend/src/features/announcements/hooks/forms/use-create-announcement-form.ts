import {
  CreateAnnouncementFormInput,
  createAnnouncementFormSchema,
} from "@/features/announcements/validators/create-announcement-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateAnnouncementMutation } from "../react-query/use-create-announcement-mutation";
import { useListAnnouncementsQuery } from "../react-query/use-list-announcements-query";

export function useCreateAnnouncement() {
  const [, setIsCreatingAnnouncement] = useQueryState(
    "criar-anuncio",
    parseAsBoolean.withDefault(false),
  );
  const createAnnouncementMutation = useCreateAnnouncementMutation();
  const listAnnouncementsQuery = useListAnnouncementsQuery();
  const createAnnouncementForm = useForm<CreateAnnouncementFormInput>({
    resolver: zodResolver(createAnnouncementFormSchema),
    defaultValues: {
      name: "",
      media: undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateAnnouncementFormInput> = useCallback(
    async ({ name, media }) => {
      if (!media) return toast.error("Please select a media file.");
      await createAnnouncementMutation.mutateAsync({ name, media });
      toast.success("Anúncio criado com sucesso");
      listAnnouncementsQuery.refetch();
      setIsCreatingAnnouncement(false);
    },
    [
      createAnnouncementMutation,
      listAnnouncementsQuery,
      setIsCreatingAnnouncement,
    ],
  );

  return {
    createAnnouncementForm,
    onSubmit,
  };
}
