import z from "zod";

export const linkAnnouncementToScreensFormSchema = z.object({
  linkedScreensId: z.array(z.string().uuid()).min(0).default([]),
  unlinkedScreensId: z.array(z.string().uuid()).min(0).default([]),
});

export type LinkAnnouncementToScreensFormInput = z.infer<
  typeof linkAnnouncementToScreensFormSchema
>;
