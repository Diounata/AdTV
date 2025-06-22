import { Typography } from '@/components/ui/typography'
import { MainContent } from '@/features/dashboard/components/main-content'

export default function Page() {
  return (
    <MainContent.Root>
      <MainContent.Header>Início</MainContent.Header>
      <MainContent.Content>
        <Typography variant="h6">Bem-vindo novamente</Typography>
      </MainContent.Content>
    </MainContent.Root>
  )
}
