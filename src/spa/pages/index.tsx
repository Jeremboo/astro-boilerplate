import RouteAnimated from '~spa/components/RouteAnimated';
import Nav from '~spa/components/Nav';
import { getPathFromRouteKey } from '~data/routing';

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
      }, 500);
    });

  return (
    <RouteAnimated url={getPathFromRouteKey('home')} animateIn={animateIn} animateOut={animateOut}>
      <h2 class="text-2xl">HOME</h2>
      <Nav />
    </RouteAnimated>
  );
};
