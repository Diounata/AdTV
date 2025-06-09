'use client'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/form/input'
import { SubmitButton } from '@/components/ui/form/submit-button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { useEditUserCredentials } from '../hooks/form/use-edit-user-credentials-form'

interface Props {
  form: UseFormReturn<any>
  onSubmit: SubmitHandler<any>
}

export function EditUserCredentialsForm() {
  const isMobile = useIsMobile()
  const {
    editUserCredentialsForm: form,
    onSubmit,
    isEditingUserCredentials: isOpen,
    setIsEditingUserCredentials: setIsOpen,
  } = useEditUserCredentials()

  const title = 'Editar credenciais'
  const description = 'Preencha o formulário para atualizar suas credenciais de acesso.'

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <FormComponent form={form} onSubmit={onSubmit} />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <FormComponent form={form} onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  )
}

function FormComponent({ form, onSubmit }: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
        <div className="flex-1 flex flex-col gap-4 px-4">
          <Input label="E-mail" name="email" inputProps={{ disabled: true }} />

          <Input label="Senha atual" name="currentPassword" inputProps={{ type: 'password' }} />
          <Input label="Nova senha" name="newPassword" inputProps={{ type: 'password' }} />
          <Input label="Repetir nova senha" name="repeatNewPassword" inputProps={{ type: 'password' }} />
        </div>

        <SheetFooter>
          <SubmitButton onSubmitChildren="Atualizando">Atualizar credenciais</SubmitButton>

          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  )
}
