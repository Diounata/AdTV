import { FormErrorProps } from "@/lib/react-hook-form/handle-request-error";

interface Props {
  [key: string]: FormErrorProps;
}

export const screensFormErrors: Props = {
  "slug-being-used": {
    name: "slug",
    message: "Este slug já está sendo utilizado",
  },
};
