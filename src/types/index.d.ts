export type LanguagesNames = { [key in Languages]: string };

export type SimplifiedTweenVars = { duration?: number; ease?: string };

/*
 * * *******************
 * * SECTION
 * * *******************
 */

export type PageProps<TPage = Pages, T = {}> = T & {
  sectionName: TPage;
};

export type PageListProps<T = {}> = {
  component: (props: PageProps<Pages, T>) => JSX.Element;
  props: PageProps<Pages, T>;
};

export type PageList = {
  [key in Pages]: PageListProps;
};
