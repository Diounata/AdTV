import { useCreateScreen } from "@/features/screens/hooks/forms/use-create-screen-form";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";
import { ScreenForm } from ".";

export function CreateScreenForm() {
  const { createScreenForm, onSubmit } = useCreateScreen();
  const name = createScreenForm.watch("name");
  const [isOpen, setIsOpen] = useQueryState(
    "cadastrar-tela",
    parseAsBoolean.withDefault(false),
  );

  useEffect(() => {
    createScreenForm.setValue("slug", name?.toLowerCase().replace(/\s+/g, "-"));
  }, [createScreenForm, name]);

  return (
    <ScreenForm
      type="create"
      form={createScreenForm}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
}
