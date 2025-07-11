"use client";
import { Screen } from "@/features/screens/types/screen";
import { axiosClient } from "@/lib/axios/axios-client";
import { useQuery } from "@tanstack/react-query";

interface GetScreenRequestData {
  screenId: string;
}

type GetScreenResponseData = Screen;

export function useGetScreenQuery({ screenId }: GetScreenRequestData) {
  return useQuery({
    queryKey: ["get-screen", screenId],
    queryFn: async () => {
      const response = await axiosClient.get<GetScreenResponseData>(
        `/screens/${screenId}`,
      );
      return response.data;
    },
  });
}
