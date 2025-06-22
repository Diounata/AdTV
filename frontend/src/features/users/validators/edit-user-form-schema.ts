import { formSchema } from '@/lib/zod/form-schemas'
import z from 'zod'

export const editUserFormSchema = z.object({
  name: formSchema.string(),
})

export type EditUserFormInput = z.infer<typeof editUserFormSchema>
