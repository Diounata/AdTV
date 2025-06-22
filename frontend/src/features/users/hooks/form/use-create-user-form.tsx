import {
  CreateUserFormInput,
  createUserFormSchema,
} from "@/features/users/validators/create-user-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserType } from "../../types/user";
import { useCreateUserMutation } from "../react-query/use-create-user-mutation";

export function useCreateUser() {
  const createUserForm = useForm<CreateUserFormInput>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: "",
      type: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const createUserMutation = useCreateUserMutation({ form: createUserForm });
  const [, setIsCreatingUser] = useQueryState(
    "cadastrar-usuario",
    parseAsBoolean,
  );

  const onSubmit: SubmitHandler<CreateUserFormInput> = useCallback(
    async ({ name, type, email, password }) => {
      await createUserMutation.mutateAsync({
        name,
        type: type as UserType,
        email,
        password,
      });

      setIsCreatingUser(false);
      toast.success("Usuário cadastrado com sucesso");
      createUserForm.reset();
    },
    [createUserForm, createUserMutation, setIsCreatingUser],
  );

  return {
    createUserForm,
    onSubmit,
  };
}
