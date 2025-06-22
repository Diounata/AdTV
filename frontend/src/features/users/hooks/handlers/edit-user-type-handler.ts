import { toast } from "sonner";
import { User } from "../../types/user";
import { useEditUserTypeMutation } from "../react-query/use-edit-user-type-mutation";

interface Props {
  user: User;
}

export function useEditUserTypeHandler({ user }: Props) {
  const editUserTypeMutation = useEditUserTypeMutation();

  const editUserTypeMutationHandler = async () => {
    await editUserTypeMutation.mutateAsync({
      userId: user.id,
      type: user.type === "ADMIN" ? "DEFAULT" : "ADMIN",
    });

    toast.success("Tipo de usuário atualizado com sucesso");
  };

  return { editUserTypeMutationHandler };
}
