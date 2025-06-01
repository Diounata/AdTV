import { formSchema } from '@/lib/zod/form-schemas'
import z from 'zod'

export const createUserFormSchema = z.object({
  name: formSchema.string(),
  email: formSchema.email,
  type: formSchema.string(),
})

export type CreateUserFormInput = z.infer<typeof createUserFormSchema>
