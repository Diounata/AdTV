import { ReactNode, useEffect } from 'react'
import { useDashboard } from '../../stores/dashboard-store'

interface Props {
  title: string
  children: ReactNode
}

export function Header({ title, children }: Props) {
  const { updateSection } = useDashboard()

  useEffect(() => {
    updateSection(title)
  }, [title, updateSection])

  return children
}
