import { z } from "zod";

export const slug = () =>
  z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value), {
      message: "O slug deve conter apenas letras minúsculas, números e hífens.",
    });
