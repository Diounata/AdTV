import { z } from "zod";
import { formErrors } from "../form-errors";

interface Props {
  isOptional?: boolean;
}

export const string = (props?: Props) =>
  z
    .string()
    .min(props?.isOptional ? 0 : 1, formErrors.required)
    .trim();
