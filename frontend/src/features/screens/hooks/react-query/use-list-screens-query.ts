import { axiosClient } from "@/lib/axios/axios-client";
import { PaginationOutput } from "@/lib/types/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { ScreenDisplay } from "../../types/screen-display";

export function useListScreensQuery() {
  const [page] = useQueryState("pagina", parseAsInteger.withDefault(1));

  return useQuery({
    queryKey: ["list-screens", page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await axiosClient.get<PaginationOutput<ScreenDisplay>>(
        `/screens?page=${page}`,
      );
      return response.data;
    },
  });
}
