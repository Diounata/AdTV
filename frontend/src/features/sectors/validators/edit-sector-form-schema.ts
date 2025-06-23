import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const editSectorFormSchema = z.object({
  name: formSchema.string(),
  slug: formSchema.slug(),
});

export type EditSectorFormInput = z.infer<typeof editSectorFormSchema>;
