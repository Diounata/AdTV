import { LoaderCircle } from 'lucide-react'

interface Props {
  label?: string
}

export function Loading({ label = 'Carregando' }: Props) {
  return (
    <div className="flex items-center gap-2">
      <LoaderCircle className="animate-spin" size={24} /> {label}
    </div>
  )
}
