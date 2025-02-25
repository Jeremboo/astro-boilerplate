import { getPathFromRouteKey } from '~data/routing';
import Nav from '~spa/components/Nav';
import Page from '~spa/components/RouteAnimated';

export default () => {
  const animateIn = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });

  const animateOut = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

  return (
    <Page url={getPathFromRouteKey('about')} animateIn={animateIn} animateOut={animateOut}>
      <h2 class="text-2xl">ABOUT</h2>
      <Nav />
    </Page>
  );
};
