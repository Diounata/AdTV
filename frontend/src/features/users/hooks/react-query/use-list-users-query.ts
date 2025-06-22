import { User } from '@/features/users/types/user'
import { axiosClient } from '@/lib/axios/axios-client'
import { PaginationOutput } from '@/lib/types/pagination'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'

export function useListUsersQuery() {
  const [page] = useQueryState('pagina', parseAsInteger.withDefault(1))

  return useQuery({
    queryKey: ['list-users', page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await axiosClient.get<PaginationOutput<User>>(`/users?page=${page}`)
      return response.data
    },
  })
}
