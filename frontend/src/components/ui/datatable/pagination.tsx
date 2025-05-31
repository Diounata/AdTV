import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { useDatatable } from './root'

interface Props {
  pagesTotal: number
}

export function Pagination({ pagesTotal }: Props) {
  const [page, setPage] = useQueryState('pagina', parseAsInteger.withDefault(1))
  const { table } = useDatatable()

  const setFirstPage = () => {
    table.setPageIndex(0)
    setPage(1)
  }

  const previousPage = () => {
    if (page === 1) return
    table.previousPage()
    setPage(page => page - 1)
  }

  const nextPage = () => {
    if (page === pagesTotal) return
    table.nextPage()
    setPage(page => page + 1)
  }

  const setLastPage = () => {
    table.setPageIndex(pagesTotal - 1)
    setPage(pagesTotal)
  }

  useEffect(() => {
    if (page <= 0) {
      table.setPageIndex(1)
      setPage(1)
    }
  }, [page, setPage, table])

  return (
    <section className="flex items-center gap-2">
      <Typography variant="smallText">
        Página {page} de {pagesTotal}
      </Typography>

      <section className="flex">
        <Button variant="ghost" size="icon" onClick={setFirstPage} disabled={page <= 1}>
          <ChevronsLeft />
        </Button>

        <Button variant="ghost" size="icon" onClick={previousPage} disabled={page <= 1}>
          <ChevronLeft />
        </Button>

        <Button variant="ghost" size="icon" onClick={nextPage} disabled={page >= pagesTotal}>
          <ChevronRight />
        </Button>

        <Button variant="ghost" size="icon" onClick={setLastPage} disabled={page >= pagesTotal}>
          <ChevronsRight />
        </Button>
      </section>
    </section>
  )
}
