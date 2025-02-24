import { ErrorBoundary, lazy, LocationProvider, Route, Router } from 'preact-iso';
import { locationStub } from 'preact-iso/prerender';

import { getPageIdFromPath, PAGES, PAGES_SPA } from '~data/routing';

import PopupError from './components/PopupError';
import { $pageCurrent, $pageCurrentLoaded, $pageNext } from '~store/pages';
import { useStore } from '@nanostores/preact';
import { useMemo } from 'preact/hooks';

const routes = Object.values(PAGES_SPA).map(({ path, component }) => {
  return <Route key={path} path={path} component={lazy(component)} />;
});

const escapedPaths = Object.values(PAGES_SPA).map(({ path }) => path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const spaScope = new RegExp(`^(${escapedPaths.join('|')})$`);

export default ({ pathname }: { pathname: string }) => {
  if (import.meta.env.SSR) {
    locationStub(pathname);
  }

  const pageCurrent = useStore($pageCurrent);

  const url = useMemo(() => {
    return PAGES[pageCurrent]?.path;
  }, [pageCurrent]);

  return (
    <>
      <LocationProvider
        url={url}
        scope={spaScope}
        onPopStateChange={(_url) => {
          const pageId = getPageIdFromPath(_url)
          if (pageId != undefined) {
            $pageNext.set(pageId);
          } else {
            console.log('ERROR : unknown URL, hard refresh required');
          }
        }}
      >
        <ErrorBoundary>
          <Router
            onRouteChange={() => {
              $pageCurrentLoaded.set(true);
            }}
            onLoadEnd={() => {
              $pageCurrentLoaded.set(true);
            }}
          >{routes}</Router>
        </ErrorBoundary>
      </LocationProvider>
      <PopupError />
    </>
  );
};
