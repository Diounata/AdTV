import { z } from "zod";
import { formErrors } from "../form-errors";

interface Props {
  isOptional?: boolean;
}

const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
const optionalPhoneRegex = /^\(\d{2}\) \d{5}-\d{4}|^$/;

export const phone = (props?: Props) =>
  z
    .string()
    .refine(
      (value) =>
        !!value.match(props?.isOptional ? optionalPhoneRegex : phoneRegex),
      formErrors.phone.invalid,
    )
    .transform((value) => value.replace(/\D/g, ""));
