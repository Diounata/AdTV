import { axiosClient } from "@/lib/axios/axios-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Announcement } from "../../types/announcement";

interface Props {
  announcementId: string;
}

export function useGetAnnouncementQuery({ announcementId }: Props) {
  return useQuery({
    queryKey: ["get-announcement", announcementId],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await axiosClient.get<Announcement>(
        `/announcements/${announcementId}`,
      );
      return response.data;
    },
  });
}
