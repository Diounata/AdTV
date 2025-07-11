import { axiosClient } from "@/lib/axios/axios-client";
import { PaginationOutput } from "@/lib/types/pagination";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { User, UserType } from "../../types/user";

interface EditUserTypeRequestData {
  userId: string;
  type: UserType;
}

export function useEditUserTypeMutation() {
  const [page] = useQueryState("pagina", parseAsInteger.withDefault(1));
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditUserTypeRequestData) => {
      return await axiosClient.put("/users/type", data);
    },
    onSuccess: (_, variables, _context) => {
      queryClient.setQueryData(
        ["list-users", page],
        (oldData: PaginationOutput<User> | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            items: oldData.items.map((user) =>
              user.id === variables.userId
                ? { ...user, type: variables.type }
                : user,
            ),
          };
        },
      );
    },
  });
}
