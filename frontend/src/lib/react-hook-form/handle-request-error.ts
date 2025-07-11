import { AxiosError } from 'axios'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { registerFormError } from './register-form-error'

export interface FormErrorProps {
  name: string
  message: string
}

interface Props {
  e: AxiosError<any>
  form: UseFormReturn<any>
  formErrors: { [key: string]: FormErrorProps }
}

export function handleAxiosRequestError({ e, form, formErrors }: Props) {
  if (!(e.response?.data.code in formErrors)) {
    return toast.error('HTTP error', {
      description: 'Um erro inexperado aconteceu. Por favor tente novamente.',
    })
  }

  registerFormError({
    form,
    ...formErrors[e.response?.data.code],
  })
}
