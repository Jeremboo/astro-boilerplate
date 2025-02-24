import type { ComponentChildren } from "preact";
import { PAGES } from "~data/routing";
import { goToPage } from "~store/pages";
import type { Pages } from "~types/enum";

type Props = {
  page: Pages;
  children: ComponentChildren
}

export default ({ page, children }: Props) => {
  const handleOnClick = (e: MouseEvent) => {
    goToPage(page);
  };
  return <a href={PAGES[page]?.path} onClick={handleOnClick}>{children}</a>
}