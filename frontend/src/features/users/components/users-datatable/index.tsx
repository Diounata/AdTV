"use client";
import { If } from "@/components/if";
import { Button } from "@/components/ui/button";
import { Datatable } from "@/components/ui/datatable";
import { Loading } from "@/components/ui/loading";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useListUsersQuery } from "../../hooks/react-query/use-list-users-query";
import { CreateUserForm } from "../forms/create-user-form";
import { userDatatableColumns } from "./columns";

export function UsersDatatable() {
  const [, setIsCreatingUser] = useQueryState(
    "cadastrar-usuario",
    parseAsBoolean.withDefault(false),
  );
  const { data: usersData, isLoading } = useListUsersQuery();

  return (
    <Datatable.Root
      columns={userDatatableColumns}
      data={usersData?.items ?? []}
    >
      <Datatable.Header className="flex-col items-start gap-3 md:flex-row md:items-end">
        <div className="flex flex-col">
          <Typography variant="h2">Usuários</Typography>
          <Typography variant="smallText" className="font-normal opacity-65">
            Gerencie os usuários disponíveis no sistema
          </Typography>
        </div>

        <Button
          type="button"
          onClick={() => setIsCreatingUser(true)}
          className="w-full md:w-fit"
        >
          <Plus /> Novo
        </Button>

        <CreateUserForm />
      </Datatable.Header>

      <If
        condition={!isLoading}
        fallback={<Loading label="Carregando usuários..." />}
      >
        <Datatable.Table />

        <Datatable.Footer>
          <Datatable.PageContentTotalItems
            currentPageTotalItems={usersData?.items.length ?? 0}
            totalItems={usersData?.totalItems ?? 0}
            pagesTotal={usersData?.totalPages ?? 0}
            page={usersData?.page ?? 0}
            singularText="usuário"
            pluralText="usuários"
          />

          <Datatable.Pagination pagesTotal={usersData?.totalPages ?? 0} />
        </Datatable.Footer>
      </If>
    </Datatable.Root>
  );
}
