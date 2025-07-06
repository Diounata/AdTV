import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const createAnnouncementFormSchema = z.object({
  name: formSchema.string(),
  media: formSchema.image({ isOptional: false }),
});

export type CreateAnnouncementFormInput = z.infer<
  typeof createAnnouncementFormSchema
>;
