import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

export function Header({ children, className, ...props }: Props) {
  return (
    <header
      className={cn("mb-4 flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </header>
  );
}
