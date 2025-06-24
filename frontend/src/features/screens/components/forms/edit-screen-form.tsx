import { useEditScreen } from "@/features/screens/hooks/forms/use-edit-screen-form";
import { parseAsString, useQueryState } from "nuqs";
import { ScreenForm } from ".";

interface Props {
  screenId: string;
}

export function EditScreenForm({ screenId }: Props) {
  const [, setScreenId] = useQueryState(
    "editar-tela",
    parseAsString.withDefault(""),
  );
  const { editScreenForm, onSubmit } = useEditScreen({ screenId });

  return (
    <ScreenForm
      type="edit"
      form={editScreenForm}
      onSubmit={onSubmit}
      isOpen={!!screenId}
      setIsOpen={() => setScreenId(null)}
    />
  );
}
