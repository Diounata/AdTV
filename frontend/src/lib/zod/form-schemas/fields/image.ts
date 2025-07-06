import { z } from "zod";
import { formErrors } from "../form-errors";

const MAX_FILE_SIZE_IN_MB = 2; // 2 mb
const MAX_FILE_SIZE_IN_BYTES = 1024 * 1024 * MAX_FILE_SIZE_IN_MB; // 2 mb in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

interface Props {
  isOptional?: boolean;
}

export const image = ({ isOptional = false }: Props) =>
  z
    .custom<FileList>()
    .refine(
      (files) => isOptional || (files && files.length !== 0),
      formErrors.required,
    )
    .refine(
      (files) =>
        !files ||
        files?.length === 0 ||
        files[0]?.size <= MAX_FILE_SIZE_IN_BYTES,
      formErrors.image.exceededFileSize(MAX_FILE_SIZE_IN_MB),
    )
    .refine(
      (files) =>
        !files ||
        files?.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      formErrors.image.invalidFileType,
    )
    .transform((files) =>
      files && files.length > 0 ? (files[0] as File) : undefined,
    );
