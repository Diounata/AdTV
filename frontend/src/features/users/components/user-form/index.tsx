'use client'
import { If } from '@/components/if'
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
import { UserTypeSelect } from './user-type-select'

interface Props {
  form: UseFormReturn<any>
  onSubmit: SubmitHandler<any>
  type?: 'create' | 'edit'
  isOpen?: boolean
  setIsOpen?: (isOpen: boolean) => void
}

export function UserForm(props: Props) {
  const { type = 'create', isOpen = false, setIsOpen } = props
  const title = type === 'create' ? 'Criar usuário' : 'Editar conta'
  const description =
    type === 'create'
      ? 'Preencha o formulário para criar um novo usuário'
      : 'Preencha o formulário para editar sua conta'
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <FormComponent form={props.form} onSubmit={props.onSubmit} type={type} />
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
        <FormComponent form={props.form} onSubmit={props.onSubmit} type={type} />
      </SheetContent>
    </Sheet>
  )
}

function FormComponent({ form, onSubmit, type }: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
        <div className="flex-1 flex flex-col gap-4 px-4">
          <Input label="Nome" name="name" />
          <Input label="E-mail" name="email" />

          <If condition={type === 'create'}>
            <UserTypeSelect />
          </If>
        </div>

        <SheetFooter>
          <SubmitButton onSubmitChildren={type === 'create' ? 'Criando' : 'Editando'}>
            <If condition={type === 'create'} fallback="Editar conta">
              Criar usuário
            </If>
          </SubmitButton>

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
