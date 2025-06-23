"use client";
import { If } from "@/components/if";
import { Button } from "@/components/ui/button";
import { Datatable } from "@/components/ui/datatable";
import { Loading } from "@/components/ui/loading";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { useListSectorsQuery } from "../../hooks/react-query/use-list-sectors-query";
import { CreateSectorForm } from "../forms/create-sector-form";
import { EditSectorForm } from "../forms/edit-sector-form";
import { sectorDatatableColumns } from "./columns";

export function SectorsDatatable() {
  const [sectorId] = useQueryState(
    "editar-setor",
    parseAsString.withDefault(""),
  );
  const [, setIsCreatingSector] = useQueryState(
    "cadastrar-setor",
    parseAsBoolean.withDefault(false),
  );
  const { data: sectorsData, isLoading } = useListSectorsQuery();

  return (
    <Datatable.Root
      columns={sectorDatatableColumns}
      data={sectorsData?.items ?? []}
    >
      <Datatable.Header className="flex-col items-start gap-3 md:flex-row md:items-end">
        <div className="flex flex-col">
          <Typography variant="h2">Setores</Typography>
          <Typography variant="smallText" className="font-normal opacity-65">
            Gerencie os setores disponíveis no sistema
          </Typography>
        </div>

        <Button
          type="button"
          onClick={() => setIsCreatingSector(true)}
          className="w-full md:w-fit"
        >
          <Plus /> Novo
        </Button>

        <CreateSectorForm />
        <If condition={sectorId}>
          <EditSectorForm sectorId={sectorId} />
        </If>
      </Datatable.Header>

      <If
        condition={!isLoading}
        fallback={<Loading label="Carregando setores..." />}
      >
        <Datatable.Table />

        <Datatable.Footer>
          <Datatable.PageContentTotalItems
            currentPageTotalItems={sectorsData?.items.length ?? 0}
            totalItems={sectorsData?.totalItems ?? 0}
            pagesTotal={sectorsData?.totalPages ?? 0}
            page={sectorsData?.page ?? 0}
            singularText="setor"
            pluralText="setores"
          />

          <Datatable.Pagination pagesTotal={sectorsData?.totalPages ?? 0} />
        </Datatable.Footer>
      </If>
    </Datatable.Root>
  );
}
