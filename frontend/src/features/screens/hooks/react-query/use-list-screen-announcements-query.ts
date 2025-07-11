import { axiosClient } from "@/lib/axios/axios-client";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

type ListScreenAnnouncementsResponseData = Array<{
  id: string;
  mediaFilename: string;
  name: string;
}>;

export function useListScreenAnnouncementsQuery() {
  const [screenId] = useQueryState("tela-id");

  return useQuery({
    queryKey: ["list-screen-announcements", screenId],
    queryFn: async () => {
      const response =
        await axiosClient.get<ListScreenAnnouncementsResponseData>(
          `/announcements_screens/screen/${screenId}`,
        );
      return response.data;
    },
    refetchInterval: 60 * 1000,
  });
}
