import { z } from "zod";
import { formErrors } from "../form-errors";

interface Props {
  isOptional?: boolean;
}

const postalCodeRegex = /^\d{5}-\d{3}$/;
const optionalPostalCodeRegex = /^\d{5}-\d{3}|^$/;

export const postalCode = (props: Props) =>
  z
    .string()
    .regex(
      props?.isOptional ? optionalPostalCodeRegex : postalCodeRegex,
      formErrors.postalCode.invalid,
    )
    .transform((value) => value.replace(/\D/g, ""));
