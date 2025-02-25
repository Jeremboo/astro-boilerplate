import classNames from "classnames"
import type { ComponentChildren } from "preact";
import useRouteTransition, { type RouteTransitionProps } from "~hooks/useRouteTransition";

type Props = RouteTransitionProps & {
  children: ComponentChildren,
}

// TODO 2025-02-24 jeremboo: Add lazy loading for children ? Maybe component ?

export default ({ url, animateIn, animateOut, cssAnimateIn, cssAnimateOut, children }: Props) => {
  const [pageClassnames, match] = useRouteTransition({ url, animateIn, animateOut, cssAnimateIn, cssAnimateOut });
  if (!match) return null;
  return (
    <section class={classNames('absolute top-0 left-0 size-full flex flex-col items-center pt-20', pageClassnames)}>
      {children}
    </section>
  )
}