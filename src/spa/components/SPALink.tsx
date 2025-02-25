import type { ComponentChildren } from "preact";
import { Link } from "wouter-preact";
import { isInSPAScope } from "~data/routing";

type Props = {
  href: string;
  label?: string;
  target?: string;
  children?: ComponentChildren
}

export default ({ href, target, children, label }: Props) => {
  return !import.meta.env.SSR
    ? <Link href={href} aria-label={label}>{children}</Link>
    : <a aria-label={label} target={target} href={href}>{children}</a>
}