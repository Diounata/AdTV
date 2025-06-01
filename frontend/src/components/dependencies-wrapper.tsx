'use client'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PropsWithChildren } from 'react'
import { Toaster as SonnerToaster } from './ui/sonner'

export function DependenciesWrapper({ children }: PropsWithChildren) {
  setDefaultOptions({ locale: ptBR })

  return (
    <NuqsAdapter>
      {children}
      <SonnerToaster richColors position="top-center" />
    </NuqsAdapter>
  )
}
