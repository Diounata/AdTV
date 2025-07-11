"use client";
import { Typography } from "@/components/ui/typography";
import { MainContent } from "@/features/dashboard/components/main-content";

export default function AboutPage() {
  return (
    <MainContent.Root>
      <MainContent.Header>Sobre o site</MainContent.Header>
      <MainContent.Content>
        <header>
          <Typography variant="h2">Sobre o site</Typography>
        </header>

        <main>
          <Typography>
            Este site foi desenvolvido como trabalho da disciplina{" "}
            <span className="font-medium uppercase">
              frameworks para desenvolvimento web
            </span>{" "}
            do curso de {""}
            <span className="font-medium uppercase">
              TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS
            </span>{" "}
            do{" "}
            <span className="font-medium uppercase">
              IFMS – Campus Três Lagoas
            </span>
            .
          </Typography>

          <Typography>
            O projeto foi realizado no primeiro semetre de 2025, com o objetivo
            de aplicar na prática os conhecimentos abordados em sala de aula por
            meio do desenvolvimento de um projeto para a instituição de ensino.
            Este trabalho tem fins exclusivamente acadêmicos.
          </Typography>

          <Typography>
            A equipe de desenvolvimento é composta pelos estudantes:
          </Typography>

          <Typography variant="ul">
            <li>
              <div>Gabriel Felipe Oliveira Freitas</div>
              <span>gabriel.freitas8@estudante.ifms.edu.br</span>
            </li>

            <li>
              <div>Gustavo Felipe Oliveira Freitas</div>
              <span>gustavo.freitas4@estudante.ifms.edu.br</span>
            </li>

            <li>
              <div>Jonatham Cordeiro Aguiar Luz</div>
              <span>jonatham.luz@estudante.ifms.edu.br</span>
            </li>

            <li>
              <div>Victor Cazuo Hino Ayabe</div>
              <span>victor.ayabe@estudante.ifms.edu.br</span>
            </li>
          </Typography>

          <Typography>
            Para mais informações, entre em contato com algum dos membros da
            equipe.
          </Typography>
        </main>
      </MainContent.Content>
    </MainContent.Root>
  );
}
