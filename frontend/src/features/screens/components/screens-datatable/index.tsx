"use client";
import { If } from "@/components/if";
import { Button } from "@/components/ui/button";
import { Datatable } from "@/components/ui/datatable";
import { Loading } from "@/components/ui/loading";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { useListScreensQuery } from "../../hooks/react-query/use-list-screens-query";
import { CreateScreenForm } from "../forms/create-screen-form";
import { EditScreenForm } from "../forms/edit-screen-form";
import { screenDatatableColumns } from "./columns";

export function ScreensDatatable() {
  const [screenId] = useQueryState(
    "editar-tela",
    parseAsString.withDefault(""),
  );
  const [, setIsCreatingScreen] = useQueryState(
    "cadastrar-tela",
    parseAsBoolean.withDefault(false),
  );
  const { data: screensData, isLoading } = useListScreensQuery();

  return (
    <Datatable.Root
      columns={screenDatatableColumns}
      data={screensData?.items ?? []}
    >
      <Datatable.Header className="flex-col items-start gap-3 md:flex-row md:items-end">
        <div className="flex flex-col">
          <Typography variant="h2">Telas</Typography>
          <Typography variant="smallText" className="font-normal opacity-65">
            Gerencie as telas disponíveis no sistema
          </Typography>
        </div>

        <Button
          type="button"
          onClick={() => setIsCreatingScreen(true)}
          className="w-full md:w-fit"
        >
          <Plus /> Novo
        </Button>

        <CreateScreenForm />
        <If condition={screenId}>
          <EditScreenForm screenId={screenId} />
        </If>
      </Datatable.Header>

      <If
        condition={!isLoading}
        fallback={<Loading label="Carregando telas..." />}
      >
        <Datatable.Table />

        <Datatable.Footer>
          <Datatable.PageContentTotalItems
            currentPageTotalItems={screensData?.items.length ?? 0}
            totalItems={screensData?.totalItems ?? 0}
            pagesTotal={screensData?.totalPages ?? 0}
            page={screensData?.page ?? 0}
            singularText="tela"
            pluralText="telas"
          />

          <Datatable.Pagination pagesTotal={screensData?.totalPages ?? 0} />
        </Datatable.Footer>
      </If>
    </Datatable.Root>
  );
}
