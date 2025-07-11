import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const editScreenFormSchema = z.object({
  name: formSchema.string(),
  slug: formSchema.slug(),
  sectorId: formSchema.string().uuid(),
});

export type EditScreenFormInput = z.infer<typeof editScreenFormSchema>;
