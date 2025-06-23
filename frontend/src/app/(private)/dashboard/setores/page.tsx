"use client";
import { MainContent } from "@/features/dashboard/components/main-content";
import { SectorsDatatable } from "@/features/sectors/components/sectors-datatable";

export default function SectorsPage() {
  return (
    <MainContent.Root>
      <MainContent.Header>Setores</MainContent.Header>
      <MainContent.Content>
        <SectorsDatatable />
      </MainContent.Content>
    </MainContent.Root>
  );
}
