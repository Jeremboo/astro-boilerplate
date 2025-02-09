// https://github.com/nanostores/nanostores#guide
import { atom } from 'nanostores';

import { SECTION_ORDER } from '~data/sections';
import { Sections } from '~types/enum';

/*
 * * *******************
 * * SECTIONS PAGES
 * * *******************
 */

// TODO 2023-12-04 jeremboo: HRM error here. Check https://github.com/vitejs/vite/issues/3301 to see how to solve it
export const $sectionCurrent = atom<Sections>(Sections.Loading);
export const $sectionNext = atom<Sections>($sectionCurrent.get());

export const previousSection = () => {
  const currentSectionIdx = SECTION_ORDER.indexOf($sectionNext.get());
  $sectionNext.set(SECTION_ORDER[Math.max(0, currentSectionIdx - 1)]);
};

export const nextSection = () => {
  const currentSectionIdx = SECTION_ORDER.indexOf($sectionNext.get());
  $sectionNext.set(SECTION_ORDER[Math.min(SECTION_ORDER.length - 1, currentSectionIdx + 1)]);
};

export const goToSection = (newSection: Sections) => {
  $sectionNext.set(newSection);
};
