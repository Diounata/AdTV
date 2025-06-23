import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const createSectorFormSchema = z.object({
  name: formSchema.string(),
  slug: formSchema.slug(),
});

export type CreateSectorFormInput = z.infer<typeof createSectorFormSchema>;
