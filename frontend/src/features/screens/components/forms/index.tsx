"use client";
import { ModalSheetDrawer } from "@/components/ui/drawer-sheet";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/form/input";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { SectorSelect } from "./inputs/sector-select";

interface Props {
  type: "create" | "edit";
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ScreenForm({ type, form, onSubmit, isOpen, setIsOpen }: Props) {
  return (
    <ModalSheetDrawer.Root isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalSheetDrawer.Header>
        <ModalSheetDrawer.Title>
          {type === "create" ? "Criar" : "Editar"} tela
        </ModalSheetDrawer.Title>
        <ModalSheetDrawer.Description>
          Preencha o formulário para {type === "create" ? "criar" : "editar"}{" "}
          uma nova tela
        </ModalSheetDrawer.Description>
      </ModalSheetDrawer.Header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between overflow-y-auto"
        >
          <div className="flex flex-1 flex-col gap-4 px-4">
            <Input label="Nome" name="name" />
            <Input label="Slug" name="slug" />
            <SectorSelect />
          </div>

          <ModalSheetDrawer.Footer>
            <SubmitButton onSubmitChildren="Criando">
              {type === "create" ? "Criar" : "Editar"}
            </SubmitButton>
            <ModalSheetDrawer.Close>Cancelar</ModalSheetDrawer.Close>
          </ModalSheetDrawer.Footer>
        </form>
      </Form>
    </ModalSheetDrawer.Root>
  );
}
