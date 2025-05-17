import { formSchema } from '@/lib/zod/form-schemas'
import z from 'zod'

export const signInUserFormSchema = z.object({
  email: formSchema.email,
  password: formSchema.password,
})

export type SignInUserFormInput = z.infer<typeof signInUserFormSchema>
