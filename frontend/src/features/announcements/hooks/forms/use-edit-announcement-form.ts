import {
  EditAnnouncementFormInput,
  editAnnouncementFormSchema,
} from "@/features/announcements/validators/edit-announcement-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEditAnnouncementMutation } from "../react-query/use-edit-announcement-mutation";
import { useGetAnnouncementQuery } from "../react-query/use-get-announcement-query";
import { useListAnnouncementsQuery } from "../react-query/use-list-announcements-query";

interface Props {
  announcementId: string;
}

export function useEditAnnouncement({ announcementId }: Props) {
  const [editingAnnouncement, setEditingAnnouncement] = useQueryState(
    "editar-anuncio",
    parseAsString.withDefault(""),
  );
  const editAnnouncementMutation = useEditAnnouncementMutation({
    announcementId: editingAnnouncement,
  });
  const getAnnouncementQuery = useGetAnnouncementQuery({ announcementId });
  const listAnnouncementsQuery = useListAnnouncementsQuery();
  const editAnnouncementForm = useForm({
    resolver: zodResolver(editAnnouncementFormSchema),
    defaultValues: {
      name: "",
      media: undefined,
    },
  });

  const onSubmit: SubmitHandler<EditAnnouncementFormInput> = useCallback(
    async ({ name, media }) => {
      await editAnnouncementMutation.mutateAsync({ name, media });
      toast.success("Anúncio editado com sucesso");
      listAnnouncementsQuery.refetch();
      setEditingAnnouncement(null);
    },
    [editAnnouncementMutation, listAnnouncementsQuery, setEditingAnnouncement],
  );

  useEffect(() => {
    if (getAnnouncementQuery.data) {
      editAnnouncementForm.reset({
        name: getAnnouncementQuery.data.name,
        media: undefined,
      });
    }
  }, [editAnnouncementForm, getAnnouncementQuery.data]);

  return {
    editAnnouncementForm,
    onSubmit,
    editingAnnouncement,
    setEditingAnnouncement,
  };
}
