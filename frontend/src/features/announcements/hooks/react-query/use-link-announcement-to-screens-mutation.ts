import { axiosClient } from "@/lib/axios/axios-client";
import { useMutation } from "@tanstack/react-query";

interface LinkAnnouncementToScreensBody {
  screensId: string[];
}

interface Props {
  announcementId: string;
}

export function useLinkAnnouncementToScreensMutation({
  announcementId,
}: Props) {
  return useMutation({
    mutationFn: async (body: LinkAnnouncementToScreensBody) => {
      await axiosClient.post(`/announcements_screens/link/${announcementId}`, body);
    },
  });
}
