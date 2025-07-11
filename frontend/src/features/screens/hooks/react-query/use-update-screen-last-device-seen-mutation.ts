import { axiosClient } from "@/lib/axios/axios-client";
import { useMutation } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

export function useUpdateScreenLastDeviceSeenMutation() {
  const [screenId] = useQueryState("tela-id");

  return useMutation({
    mutationFn: async () => {
      await axiosClient.patch(`/screens/${screenId}/last-device-seen-at`, {
        lastDeviceSeenAt: new Date().toISOString(),
      });
    },
  });
}
