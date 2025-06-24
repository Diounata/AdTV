import { axiosClient } from "@/lib/axios/axios-client";
import { handleAxiosRequestError } from "@/lib/react-hook-form/handle-request-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import { screensFormErrors } from "../../helpers/errors";

interface EditScreenRequestData {
  screenId: string;
  name: string;
  slug: string;
  sectorId: string;
}

interface Props {
  form: UseFormReturn<any>;
}

export function useEditScreenMutation({ form }: Props) {
  return useMutation({
    mutationFn: async ({ screenId, ...data }: EditScreenRequestData) =>
      await axiosClient.put(`/screens/${screenId}`, data),
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
