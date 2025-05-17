import { z } from "zod";
import { formErrors } from "../form-errors";

export const gender = z.enum(["male", "female"], {
  message: formErrors.required,
});
