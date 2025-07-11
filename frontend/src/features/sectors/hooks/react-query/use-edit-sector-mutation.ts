import { axiosClient } from "@/lib/axios/axios-client";
import { handleAxiosRequestError } from "@/lib/react-hook-form/handle-request-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import { sectorsFormErrors } from "../../helpers/errors";

interface EditSectorRequestData {
  sectorId: string;
  name: string;
  slug: string;
}

interface Props {
  form: UseFormReturn<any>;
}

export function useEditSectorMutation({ form }: Props) {
  return useMutation({
    mutationFn: async ({ sectorId, ...data }: EditSectorRequestData) =>
      await axiosClient.put(`/sectors/${sectorId}`, data),
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        handleAxiosRequestError({
          e: error,
          form,
          formErrors: sectorsFormErrors,
        });
      }
    },
  });
}
