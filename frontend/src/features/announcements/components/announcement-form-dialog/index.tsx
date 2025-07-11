import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/form/input";
import { InputFile } from "@/components/ui/form/input-file";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { PropsWithChildren } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

interface Props extends PropsWithChildren {
  type: "create" | "edit";
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnnouncementFormDialog({
  type,
  form,
  onSubmit,
  children,
  isOpen,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Novo" : "Editar"} anúncio
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes do{" "}
            {type === "create" ? "novo" : "anúncio existente"}.
          </DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <div className="my-4 flex flex-1 flex-col gap-4">
                <Input label="Anúncio" name="name" />
                <InputFile
                  label="Imagem do anúncio"
                  name="media"
                  inputProps={{
                    placeholder: "Selecione uma imagem",
                    accept: "image/png, image/jpeg",
                  }}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancelar</Button>
                </DialogClose>

                <SubmitButton onSubmitChildren="Criando">
                  {type === "create" ? "Criar" : "Salvar"}
                </SubmitButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
