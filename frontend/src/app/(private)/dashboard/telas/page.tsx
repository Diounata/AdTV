"use client";
import { MainContent } from "@/features/dashboard/components/main-content";
import { ScreensDatatable } from "@/features/screens/components/screens-datatable";

export default function ScreensPage() {
  return (
    <MainContent.Root>
      <MainContent.Header>Telas</MainContent.Header>
      <MainContent.Content>
        <ScreensDatatable />
      </MainContent.Content>
    </MainContent.Root>
  );
}
