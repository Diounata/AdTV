"use client";
import { ModalSheetDrawer } from "@/components/ui/drawer-sheet";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/form/input";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useCreateUser } from "../../hooks/form/use-create-user-form";
import { UserTypeSelect } from "./inputs/user-type-select";

export function CreateUserForm() {
  const [isCreatingUser, setIsCreatingUser] = useQueryState(
    "cadastrar-usuario",
    parseAsBoolean.withDefault(false),
  );
  const { createUserForm, onSubmit } = useCreateUser();

  return (
    <ModalSheetDrawer.Root
      isOpen={isCreatingUser}
      setIsOpen={setIsCreatingUser}
    >
      <ModalSheetDrawer.Header>
        <ModalSheetDrawer.Title>Criar usuário</ModalSheetDrawer.Title>
        <ModalSheetDrawer.Description>
          Preencha o formulário para criar um novo usuário
        </ModalSheetDrawer.Description>
      </ModalSheetDrawer.Header>

      <Form {...createUserForm}>
        <form
          onSubmit={createUserForm.handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between overflow-y-auto"
        >
          <div className="flex flex-1 flex-col gap-4 px-4">
            <Input label="Nome" name="name" />
            <UserTypeSelect />
            <Input label="E-mail" name="email" />
            <Input
              label="Senha"
              name="password"
              inputProps={{ type: "password" }}
            />
            <Input
              label="Repetir senha"
              name="repeatPassword"
              inputProps={{ type: "password" }}
            />
          </div>

          <ModalSheetDrawer.Footer>
            <SubmitButton onSubmitChildren="Criando">Criar</SubmitButton>
            <ModalSheetDrawer.Close>Cancelar</ModalSheetDrawer.Close>
          </ModalSheetDrawer.Footer>
        </form>
      </Form>
    </ModalSheetDrawer.Root>
  );
}
