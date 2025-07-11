import { axiosClient } from "@/lib/axios/axios-client";
import { PaginationOutput } from "@/lib/types/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { SectorDisplay } from "../../types/sector-display";

export function useListSectorsQuery() {
  const [page] = useQueryState("pagina", parseAsInteger.withDefault(1));

  return useQuery({
    queryKey: ["list-sectors", page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await axiosClient.get<PaginationOutput<SectorDisplay>>(
        `/sectors?page=${page}`,
      );
      return response.data;
    },
  });
}
