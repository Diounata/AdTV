import { axiosClient } from "@/lib/axios/axios-client";
import { useMutation } from "@tanstack/react-query";

interface CreateAnnouncementRequestData {
  name: string;
  media: File;
}

export function useCreateAnnouncementMutation() {
  return useMutation({
    mutationFn: async ({ name, media }: CreateAnnouncementRequestData) => {
      const formData = new FormData();
      formData.append("file", media);
      formData.append("metadata", JSON.stringify({ name }));
      await axiosClient.post("/announcements", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });
}
