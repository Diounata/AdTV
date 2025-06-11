'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PropsWithChildren } from 'react'
import { Toaster as SonnerToaster } from './ui/sonner'

const queryClient = new QueryClient()

export function DependenciesWrapper({ children }: PropsWithChildren) {
  setDefaultOptions({ locale: ptBR })

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        {children}
        <SonnerToaster richColors position="top-center" />
      </QueryClientProvider>
    </NuqsAdapter>
  )
}
