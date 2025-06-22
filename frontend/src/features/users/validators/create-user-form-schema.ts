import { formSchema } from "@/lib/zod/form-schemas";
import { formErrors } from "@/lib/zod/form-schemas/form-errors";
import z from "zod";

export const createUserFormSchema = z
  .object({
    name: formSchema.string(),
    type: formSchema.string(),
    email: formSchema.email,
    password: formSchema.password,
    repeatPassword: formSchema.password,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: formErrors.password.doesNotMatch,
    path: ["repeatPassword"],
  });

export type CreateUserFormInput = z.infer<typeof createUserFormSchema>;
