import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const editAnnouncementFormSchema = z.object({
  name: formSchema.string(),
  media: formSchema.image({ isOptional: true }),
});

export type EditAnnouncementFormInput = z.infer<
  typeof editAnnouncementFormSchema
>;
