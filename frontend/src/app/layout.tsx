import { DependenciesWrapper } from '@/components/dependencies-wrapper'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | AdTV',
    default: 'AdTV',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>
        <DependenciesWrapper>
          <Suspense>{children}</Suspense>
        </DependenciesWrapper>
      </body>
    </html>
  )
}
