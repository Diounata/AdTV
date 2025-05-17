'use client'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/form/input'
import Link from 'next/link'
import { useSignInUser } from '../hooks/forms/use-sign-in-user-form'

export function AuthenticationForm() {
  const { signInUserForm, onSubmit } = useSignInUser()

  return (
    <Form {...signInUserForm}>
      <form onSubmit={signInUserForm.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <Input name="email" label="E-mail" inputProps={{ type: 'email' }} />
            <Input name="password" label="Senha" inputProps={{ type: 'password' }} />

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </div>

          <div className="text-center text-sm">
            Não possui uma conta?{' '}
            <Link href="mailto:cerel@ifms.edu.com" className="underline">
              Contate-nos
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
