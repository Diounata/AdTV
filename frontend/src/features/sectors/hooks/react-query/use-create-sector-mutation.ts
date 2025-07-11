import { sectorsFormErrors } from "@/features/sectors/helpers/errors";
import { axiosClient } from "@/lib/axios/axios-client";
import { handleAxiosRequestError } from "@/lib/react-hook-form/handle-request-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import { useListSectorsQuery } from "./use-list-sectors-query";

interface CreateSectorRequestData {
  name: string;
  slug: string;
}

interface Props {
  form: UseFormReturn<any>;
}

export function useCreateSectorMutation({ form }: Props) {
  const listSectorsQuery = useListSectorsQuery();
  return useMutation({
    mutationFn: async (data: CreateSectorRequestData) =>
      await axiosClient.post("/sectors", data),
    onSuccess: () => {
      listSectorsQuery.refetch();
    },
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
