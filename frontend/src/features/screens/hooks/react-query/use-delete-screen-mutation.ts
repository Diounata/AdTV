import { axiosClient } from "@/lib/axios/axios-client";
import { useMutation } from "@tanstack/react-query";

interface DeleteScreenRequestData {
  screenId: string;
}

export function useDeleteScreenMutation() {
  return useMutation({
    mutationFn: async ({ screenId }: DeleteScreenRequestData) =>
      await axiosClient.delete(`/screens/${screenId}`),
  });
}
