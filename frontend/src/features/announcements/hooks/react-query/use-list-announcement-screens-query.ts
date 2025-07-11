import { axiosClient } from "@/lib/axios/axios-client";
import { useQuery } from "@tanstack/react-query";

export type ListAnnouncementScreensResponseData = Array<{
  id: string;
  name: string;
  mediaFilename: string;
}>;

interface Props {
  announcementId: string;
}

export function useListAnnouncementScreensQuery({ announcementId }: Props) {
  return useQuery({
    queryKey: ["list-announcement-screens", announcementId],
    queryFn: async () => {
      const response =
        await axiosClient.get<ListAnnouncementScreensResponseData>(
          `/announcements_screens/announcement/${announcementId}`,
        );
      return response.data;
    },
  });
}
