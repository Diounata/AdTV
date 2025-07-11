"use client";
import { MainContent } from "@/features/dashboard/components/main-content";
import { UsersDatatable } from "@/features/users/components/users-datatable";

export default function UsersPage() {
  return (
    <MainContent.Root>
      <MainContent.Header>Usuários</MainContent.Header>
      <MainContent.Content>
        <UsersDatatable />
      </MainContent.Content>
    </MainContent.Root>
  );
}
