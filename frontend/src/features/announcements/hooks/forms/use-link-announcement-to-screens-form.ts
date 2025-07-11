import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LinkAnnouncementToScreensFormInput,
  linkAnnouncementToScreensFormSchema,
} from "@/features/announcements/validators/link-announcement-to-screens-form-schema";
import { useLinkAnnouncementToScreensMutation } from "../react-query/use-link-announcement-to-screens-mutation";
import { toast } from "sonner";
import { useUnlinkAnnouncementToScreensMutation } from "../react-query/use-unlink-announcement-to-screens-mutation";
import { useListAnnouncementScreensQuery } from "../react-query/use-list-announcement-screens-query";

interface Props {
  announcementId: string;
}

export function useLinkAnnouncementToScreens({ announcementId }: Props) {
  const listAnnouncementScreensQuery = useListAnnouncementScreensQuery({
    announcementId,
  });
  const linkAnnouncementToScreensMutation =
    useLinkAnnouncementToScreensMutation({ announcementId });
  const unlinkAnnouncementToScreensMutation =
    useUnlinkAnnouncementToScreensMutation({ announcementId });
  const linkAnnouncementToScreensForm = useForm({
    resolver: zodResolver(linkAnnouncementToScreensFormSchema),
    defaultValues: {
      linkedScreensId: [],
      unlinkedScreensId: [],
    },
  });

  const onSubmit: SubmitHandler<LinkAnnouncementToScreensFormInput> =
    useCallback(
      async ({ linkedScreensId, unlinkedScreensId }) => {
        const hasLinkedScreensId = linkedScreensId?.length > 0;
        const hasUnlinkedScreensId = unlinkedScreensId?.length > 0;


        if (hasLinkedScreensId) {
          await linkAnnouncementToScreensMutation.mutateAsync({
            screensId: linkedScreensId,
          });
        }

        if (hasUnlinkedScreensId) {
          await unlinkAnnouncementToScreensMutation.mutateAsync({
            screensId: unlinkedScreensId,
          });
        }

        toast.success("Telas de anúncio atualizadas com sucesso!");
      },
      [linkAnnouncementToScreensMutation, unlinkAnnouncementToScreensMutation],
    );

  useEffect(() => {
    if (listAnnouncementScreensQuery.data) {
      const linkedScreensId = listAnnouncementScreensQuery?.data?.map((screen) => screen.id) ?? [];

      linkAnnouncementToScreensForm.reset({
        linkedScreensId,
        unlinkedScreensId: [],
      });
    }
  }, [linkAnnouncementToScreensForm, listAnnouncementScreensQuery.data]);

  return {
    linkAnnouncementToScreensForm,
    onSubmit,
  };
}
