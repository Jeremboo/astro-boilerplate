import { Router } from 'wouter-preact';


import PopupError from './components/PopupError';
import { ROUTES_SPA } from '~data/routing';

const routes = Object.values(ROUTES_SPA).map(({ Component }) => {
  return <Component />;
})

export default ({ pathname }: { pathname: string }) => {
  // if (import.meta.env.SSR) {
  //   locationStub(pathname);
  // }
  // return (
  //   <>
  //     <LocationProvider scope={spaScope}>
  //       <ErrorBoundary>
  //           <Router
  //             onRouteChange={() => {
  //               $pageCurrentLoaded.set(true);
  //             }}
  //             onLoadEnd={() => {
  //               $pageCurrentLoaded.set(true);
  //             }}
  //             >{routes}</Router>
  //       </ErrorBoundary>
  //     </LocationProvider>
  //     <PopupError />
  //   </>
  // );
  return <>
    <Router ssrPath={pathname}>{routes}</Router>
    <PopupError />
  </>
};
