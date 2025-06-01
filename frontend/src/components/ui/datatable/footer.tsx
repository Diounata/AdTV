import { PropsWithChildren } from 'react'

export function Footer({ children }: PropsWithChildren) {
  return <footer className="flex items-center justify-between">{children}</footer>
}
