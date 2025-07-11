import { axiosClient } from "@/lib/axios/axios-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Sector } from "../../types/sector";

export function useListAllSectorsQuery() {
  return useQuery({
    queryKey: ["list-all-sectors"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await axiosClient.get<Sector[]>("/sectors/all");
      return response.data;
    },
  });
}
