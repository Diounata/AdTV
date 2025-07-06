import { axiosClient } from "@/lib/axios/axios-client";
import { useMutation } from "@tanstack/react-query";

interface EditAnnouncementRequestData {
  name: string;
  media?: File;
}

export function useEditAnnouncementMutation({
  announcementId,
}: {
  announcementId: string;
}) {
  return useMutation({
    mutationFn: async ({ name, media }: EditAnnouncementRequestData) => {
      const formData = new FormData();
      if (media) formData.append("file", media);
      formData.append("metadata", JSON.stringify({ name }));
      await axiosClient.put(`/announcements/${announcementId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });
}
