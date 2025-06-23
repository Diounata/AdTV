import { useCreateSector } from "@/features/sectors/hooks/forms/use-create-sector-form";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";
import { SectorForm } from ".";

export function CreateSectorForm() {
  const { createSectorForm, onSubmit } = useCreateSector();
  const name = createSectorForm.watch("name");
  const [isOpen, setIsOpen] = useQueryState(
    "cadastrar-setor",
    parseAsBoolean.withDefault(false),
  );

  useEffect(() => {
    createSectorForm.setValue("slug", name?.toLowerCase().replace(/\s+/g, "-"));
  }, [createSectorForm, name]);

  return (
    <SectorForm
      type="create"
      form={createSectorForm}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
}
