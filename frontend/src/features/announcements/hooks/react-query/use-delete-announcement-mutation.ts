import { axiosClient } from "@/lib/axios/axios-client";
import { useMutation } from "@tanstack/react-query";

interface DeleteAnnouncementRequestData {
  announcementId: string;
}

export function useDeleteAnnouncementMutation() {
  return useMutation({
    mutationFn: async ({ announcementId }: DeleteAnnouncementRequestData) =>
      await axiosClient.delete(`/announcements/${announcementId}`),
  });
}
