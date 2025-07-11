import { screensFormErrors } from "@/features/screens/helpers/errors";
import { axiosClient } from "@/lib/axios/axios-client";
import { handleAxiosRequestError } from "@/lib/react-hook-form/handle-request-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import { useListScreensQuery } from "./use-list-screens-query";

interface CreateScreenRequestData {
  name: string;
  slug: string;
  sectorId: string;
}

interface Props {
  form: UseFormReturn<any>;
}

export function useCreateScreenMutation({ form }: Props) {
  const listScreensQuery = useListScreensQuery();
  return useMutation({
    mutationFn: async (data: CreateScreenRequestData) =>
      await axiosClient.post("/screens", data),
    onSuccess: () => {
      listScreensQuery.refetch();
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        handleAxiosRequestError({
          e: error,
          form,
          formErrors: screensFormErrors,
        });
      }
    },
  });
}
