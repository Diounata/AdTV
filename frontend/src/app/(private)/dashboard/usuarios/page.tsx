'use client'
import { Header } from '@/features/dashboard/components/sidebar/header'
import { UsersDatatable } from '@/features/users/components/users-datatable'

export default function Page() {
  return (
    <Header title="Usuários">
      <UsersDatatable />
    </Header>
  )
}
