import SectionHome from '~components/SectionHome';
import SectionLoading from '~components/SectionLoading';
import { Sections } from '~types/enum';
import type { SectionList } from '~types/index';

// NOTE 2023-12-09 jeremboo: I need a key for each component to be sure the objects are different
const SECTIONS: SectionList = {
  [Sections.Loading]: { component: SectionLoading, props: { sectionName: Sections.Loading } },
  [Sections.Home]: { component: SectionHome, props: { sectionName: Sections.Home } }
};

export const SECTION_ORDER = Object.keys(SECTIONS) as Sections[];

export default SECTIONS;
