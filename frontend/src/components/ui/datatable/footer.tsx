import { PropsWithChildren } from "react";

export function Footer({ children }: PropsWithChildren) {
  return <footer className="flex justify-between">{children}</footer>;
}
