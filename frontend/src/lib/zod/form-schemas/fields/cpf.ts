import { z } from "zod";
import { formErrors } from "../form-errors";

interface Props {
  isOptional?: boolean;
}

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const optionalCpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}|^$/;

export const cpf = (props: Props) =>
  z
    .string()
    .min(props?.isOptional ? 0 : 1, formErrors.required)
    .regex(
      props?.isOptional ? optionalCpfRegex : cpfRegex,
      formErrors.cpf.invalid,
    )
    .transform((value) => value.replace(/\D/g, ""));
