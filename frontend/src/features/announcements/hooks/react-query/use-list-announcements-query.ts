import { axiosClient } from "@/lib/axios/axios-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Announcement } from "../../types/announcement";

export function useListAnnouncementsQuery() {
  return useQuery({
    queryKey: ["list-announcements"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response =
        await axiosClient.get<Announcement[]>(`/announcements`);
      return response.data;
    },
  });
}
