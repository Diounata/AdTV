'use client'
import { Typography } from '@/components/ui/typography'
import { Header } from '@/features/dashboard/components/sidebar/header'

export default function Page() {
  return (
    <Header title="Início">
      <div>
        <Typography variant="h6">Bem-vindo novamente, Alex Araújo</Typography>
      </div>
    </Header>
  )
}
