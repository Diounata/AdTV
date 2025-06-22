import { formSchema } from '@/lib/zod/form-schemas'
import { formErrors } from '@/lib/zod/form-schemas/form-errors'
import z from 'zod'

export const editUserCredentialsFormSchema = z
  .object({
    email: formSchema.email,
    password: formSchema.password,
    newPassword: formSchema.password,
    repeatNewPassword: formSchema.password,
  })
  .refine(({ newPassword, repeatNewPassword }) => newPassword === repeatNewPassword, {
    message: formErrors.password.doesNotMatch,
    path: ['repeatNewPassword'],
  })

export type EditUserCredentialsFormInput = z.infer<typeof editUserCredentialsFormSchema>
