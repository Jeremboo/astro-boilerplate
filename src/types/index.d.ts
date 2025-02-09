export type LanguagesNames = { [key in Languages]: string };

export type SimplifiedTweenVars = { duration?: number; ease?: string };

/*
 * * *******************
 * * SECTION
 * * *******************
 */

export type SectionProps<TSection = Sections, T = {}> = T & {
  sectionName: TSection;
};

export type SectionListProps<T = {}> = {
  component: (props: SectionProps<Sections, T>) => JSX.Element;
  props: SectionProps<Sections, T>;
};

export type SectionList = {
  [key in Sections]: SectionListProps;
};
