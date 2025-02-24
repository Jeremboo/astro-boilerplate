import classNames from "classnames"
import type { ComponentChildren } from "preact";
import usePageTransition from "~hooks/usePageTransition";
import type { Pages } from "~types/enum";

type Props = {
  pageId: Pages;
  animateIn: () => Promise<void>,
  animateOut: () => Promise<void>,
  children: ComponentChildren;
}

export default ({ pageId, animateIn, animateOut, children }: Props) => {
  const [pageClassnames] = usePageTransition({ pageId, animateIn, animateOut });
  return (
    <section class={classNames(pageClassnames)}>
      {children}
    </section>
  )
}