import { axiosClient } from "@/lib/axios/axios-client";
import { useQuery } from "@tanstack/react-query";

export type ListScreensBySectorResponseData = Array<{
  sectorId: string;
  sectorName: string;
  sectorSlug: string;
  screens: Screen[];
}>;

export interface Screen {
  id: string;
  name: string;
  slug: string;
  lastDeviceSeenAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export function useListScreensBySectorQuery() {
  return useQuery({
    queryKey: ["list-screens-by-sector"],
    queryFn: async () => {
      const response =
        await axiosClient.get<ListScreensBySectorResponseData>(
          `/screens/by-sector`,
        );
      return response.data;
    },
  });
}
