import Nav from '~spa/components/Nav';
import Page from '~spa/components/Page';
import { Pages } from '~types/enum';

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
    <Page pageId={Pages.home} animateIn={animateIn} animateOut={animateOut}>
      <h2 class="text-2xl">HOME</h2>
      <Nav />
    </Page>
  );
};
