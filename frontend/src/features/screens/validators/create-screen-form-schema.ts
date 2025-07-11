import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const createScreenFormSchema = z.object({
  name: formSchema.string(),
  slug: formSchema.slug(),
  sectorId: formSchema.string().uuid(),
});

export type CreateScreenFormInput = z.infer<typeof createScreenFormSchema>;
