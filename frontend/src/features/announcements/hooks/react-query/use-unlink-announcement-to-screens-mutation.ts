import { axiosClient } from "@/lib/axios/axios-client";
import { useMutation } from "@tanstack/react-query";

interface UnlinkAnnouncementToScreensBody {
  screensId: string[];
}

interface Props {
  announcementId: string;
}

export function useUnlinkAnnouncementToScreensMutation({
  announcementId,
}: Props) {
  return useMutation({
    mutationFn: async (body: UnlinkAnnouncementToScreensBody) => {
      await axiosClient.post(
        `/announcements_screens/unlink/${announcementId}`,
        body,
      );
    },
  });
}
