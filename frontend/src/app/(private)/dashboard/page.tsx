import { Typography } from "@/components/ui/typography";
import { MainContent } from "@/features/dashboard/components/main-content";

export default function Page() {
  return (
    <MainContent.Root>
      <MainContent.Header>Início</MainContent.Header>
      <MainContent.Content>
        <header>
          <Typography variant="h2">Bem vindo novamente!</Typography>
        </header>
      </MainContent.Content>
    </MainContent.Root>
  );
}
