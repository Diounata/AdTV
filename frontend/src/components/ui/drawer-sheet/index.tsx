'use client'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
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
import { ReactNode } from 'react'
import { Button } from '../button'

interface ModalSheetDrawerProps {
  isOpen?: boolean
  setIsOpen?: (isOpen: boolean) => void
  children: ReactNode
}

function ModalSheetDrawerRoot({ isOpen = false, setIsOpen, children }: ModalSheetDrawerProps) {
  const isMobile = useIsMobile()

  const Wrapper = isMobile ? Drawer : Sheet
  const WrapperContent = isMobile ? DrawerContent : SheetContent

  return (
    <Wrapper open={isOpen} onOpenChange={setIsOpen}>
      <WrapperContent>{children}</WrapperContent>
    </Wrapper>
  )
}

function ModalSheetDrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  const isMobile = useIsMobile()
  const WrapperHeader = isMobile ? DrawerHeader : SheetHeader
  return <WrapperHeader className={isMobile ? 'text-left' : className}>{children}</WrapperHeader>
}

function ModalSheetDrawerTitle({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  const WrapperTitle = isMobile ? DrawerTitle : SheetTitle
  return <WrapperTitle>{children}</WrapperTitle>
}

function ModalSheetDrawerDescription({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  const WrapperDescription = isMobile ? DrawerDescription : SheetDescription
  return <WrapperDescription>{children}</WrapperDescription>
}

function ModalSheetDrawerFooter({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  const WrapperFooter = isMobile ? DrawerFooter : SheetFooter
  return <WrapperFooter>{children}</WrapperFooter>
}

function ModalSheetDrawerClose({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  const WrapperClose = isMobile ? DrawerClose : SheetClose
  return (
    <WrapperClose asChild>
      <Button type="button" variant="outline" className="w-full">
        {children}
      </Button>
    </WrapperClose>
  )
}

export const ModalSheetDrawer = {
  Root: ModalSheetDrawerRoot,
  Header: ModalSheetDrawerHeader,
  Title: ModalSheetDrawerTitle,
  Description: ModalSheetDrawerDescription,
  Footer: ModalSheetDrawerFooter,
  Close: ModalSheetDrawerClose,
}
