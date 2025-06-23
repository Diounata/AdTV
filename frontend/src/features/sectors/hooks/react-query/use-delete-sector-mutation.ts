import { axiosClient } from "@/lib/axios/axios-client";
import { useMutation } from "@tanstack/react-query";

interface DeleteSectorRequestData {
  sectorId: string;
}

export function useDeleteSectorMutation() {
  return useMutation({
    mutationFn: async ({ sectorId }: DeleteSectorRequestData) =>
      await axiosClient.delete(`/sectors/${sectorId}`),
  });
}
