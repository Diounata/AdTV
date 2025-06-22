import { FormErrorProps } from '@/lib/react-hook-form/handle-request-error'

interface Props {
  [key: string]: FormErrorProps
}

export const usersFormErrors: Props = {
  'email-being-used': {
    name: 'email',
    message: 'Este e-mail já está sendo utilizado',
  },
  'account-not-found': {
    name: 'email',
    message: 'Conta não encontrada',
  },
  'invalid-credentials': {
    name: 'password',
    message: 'Credenciais inválidas',
  },
}
