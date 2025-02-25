// import type { ComponentType } from 'preact';

// TODO 2025-02-11 jeremboo: a11y integration
// TODO 2025-02-11 jeremboo: Do I really different URLS per language ?
// {
//   [Languages.en] : {},
//   [Languages.fr] : {},
// }

import Home from '~spa/pages/index';
import Projects from '~spa/pages/projects';
import About from '~spa/pages/about';

export const ROUTES_SPA = {
  home: {
    path: `${import.meta.env.BASE_URL}`,
    Component: Home
  },
  projects: {
    path: `${import.meta.env.BASE_URL}projects`,
    Component: Projects
  },
  about: {
    path: `${import.meta.env.BASE_URL}about`,
    Component: About
  }
};

export const ROUTES_STATIC = {
  blog: {
    path: `${import.meta.env.BASE_URL}blog`
  }
};

export const ROUTES = { ...ROUTES_SPA, ...ROUTES_STATIC };


export type RouteKeys = keyof typeof ROUTES;

export const getRouteKeyFromPath = (path: string) => {
  return (Object.keys(ROUTES) as RouteKeys[]).reduce((acc, key) => {
    const pageProps = ROUTES[key];
    if (pageProps && pageProps.path === path) {
      acc = key;
    }
    return acc;
  }, undefined as (RouteKeys | undefined));
}

export const getPathFromRouteKey = (route: RouteKeys) => ROUTES[route].path;


// Check if the given path are in the SPA scope
const escapedPaths = Object.values(ROUTES_SPA).map(({ path }) => path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const spaScope = new RegExp(`^(${escapedPaths.join('|')})$`);
export const isInScope = (href: string) => spaScope.test(href);