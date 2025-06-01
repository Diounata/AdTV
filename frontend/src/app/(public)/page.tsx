import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthenticationForm } from '@/features/authentication/components/authentication-form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-[url('/images/background-squares.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-full max-w-lg">
        <Card className="py-10 md:py-6">
          <CardHeader className="text-center gap-0">
            <CardTitle className="flex flex-col items-center">
              <Image src="/images/logo-text.png" alt="AdTV" width={180} height={180} />
            </CardTitle>

            <CardDescription className="">Insira seus dados para acessar sua conta</CardDescription>
          </CardHeader>

          <CardContent>
            <AuthenticationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
