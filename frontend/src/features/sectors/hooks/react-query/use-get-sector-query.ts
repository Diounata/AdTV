"use client";
import { Sector } from "@/features/sectors/types/sector";
import { axiosClient } from "@/lib/axios/axios-client";
import { useQuery } from "@tanstack/react-query";

interface GetSectorRequestData {
  sectorId: string;
}

interface GetSectorResponseData {
  sector: Sector;
}

export function useGetSectorQuery({ sectorId }: GetSectorRequestData) {
  return useQuery({
    queryKey: ["get-sector", sectorId],
    queryFn: async () => {
      const response = await axiosClient.get<GetSectorResponseData>(
        `/sectors/${sectorId}`,
      );
      return response.data.sector;
    },
  });
}
