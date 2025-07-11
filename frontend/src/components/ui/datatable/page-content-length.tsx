import { cn } from "@/lib/utils";
import { Typography } from "../typography";

interface Props {
  currentPageTotalItems: number;
  totalItems: number;
  singularText: string;
  page: number;
  pagesTotal: number;
  pluralText: string;
}

export function PageContentTotalItems({
  currentPageTotalItems,
  totalItems,
  singularText,
  pluralText,
  page,
  pagesTotal,
}: Props) {
  return (
    <section className="flex w-full flex-col gap-1 md:mr-8 md:flex-row md:items-center md:gap-0">
      <Typography variant="mutedText" className="mr-auto">
        Exibindo {currentPageTotalItems} de {totalItems}{" "}
        {totalItems === 1 ? singularText : pluralText}
      </Typography>

      <Typography
        variant="smallText"
        className={cn(pagesTotal < 1 && "hidden")}
      >
        Página {page} de {pagesTotal}
      </Typography>
    </section>
  );
}
