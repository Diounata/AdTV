import { useEditSector } from "@/features/sectors/hooks/forms/use-edit-sector-form";
import { parseAsString, useQueryState } from "nuqs";
import { SectorForm } from ".";

interface Props {
  sectorId: string;
}

export function EditSectorForm({ sectorId }: Props) {
  const [, setSectorId] = useQueryState(
    "editar-setor",
    parseAsString.withDefault(""),
  );
  const { editSectorForm, onSubmit } = useEditSector({ sectorId });

  return (
    <SectorForm
      type="edit"
      form={editSectorForm}
      onSubmit={onSubmit}
      isOpen={!!sectorId}
      setIsOpen={() => setSectorId(null)}
    />
  );
}
