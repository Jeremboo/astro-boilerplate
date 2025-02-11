import { Pages } from '~types/enum';

// TODO 2025-02-11 jeremboo: a11y integration
// TODO 2025-02-11 jeremboo: Do I really different URLS per language ?
// {
//   [Languages.en] : {},
//   [Languages.fr] : {},
// }

export const PAGES_SPA = {
  [Pages.home]: {
    path: `${import.meta.env.BASE_URL}`,
    component: () => import('~spa/pages/index')
  },
  [Pages.projects]: {
    path: `${import.meta.env.BASE_URL}projects`,
    component: () => import('~spa/pages/projects')
  },
  [Pages.about]: {
    path: `${import.meta.env.BASE_URL}about`,
    component: () => import('~spa/pages/about')
  }
};

export const PAGES_STATIC = {
  [Pages.blog]: {
    path: `${import.meta.env.BASE_URL}blog`
  }
};

export const PAGES = { ...PAGES_SPA, ...PAGES_STATIC };
