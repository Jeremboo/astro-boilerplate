// https://github.com/nanostores/nanostores#guide
import { atom } from 'nanostores';

import { Pages } from '~types/enum';

/*
 * * *******************
 * * PAGES
 * * *******************
 */

// TODO 2023-12-04 jeremboo: HRM error here. Check https://github.com/vitejs/vite/issues/3301 to see how to solve it
export const $pageCurrent = atom<Pages>(Pages.home);
export const $pageCurrentLoaded = atom<boolean>(false);

export const $pageNext = atom<Pages>($pageCurrent.get());

export const goToPage = (nextPage: Pages) => {
  $pageNext.set(nextPage);
};
