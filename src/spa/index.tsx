import { ErrorBoundary, lazy, LocationProvider, Route, Router } from 'preact-iso';
import { locationStub } from 'preact-iso/prerender';

import { PAGES_SPA } from '~data/routing';

import PopupError from './components/PopupError';

const routes = Object.values(PAGES_SPA).map(({ path, component }) => {
  return <Route path={path} component={lazy(component)} />;
});

const escapedPaths = Object.values(PAGES_SPA).map(({ path }) => path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const spaScope = new RegExp(`^(${escapedPaths.join('|')})$`);

export default ({ pathname }: { pathname: string }) => {
  if (import.meta.env.SSR) {
    locationStub(pathname);
  }
  return (
    <>
      <LocationProvider scope={spaScope}>
        <ErrorBoundary>
          <Router>{routes}</Router>
        </ErrorBoundary>
      </LocationProvider>
      <PopupError />
    </>
  );
};
