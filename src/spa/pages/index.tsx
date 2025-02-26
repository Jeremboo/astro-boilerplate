import RouteAnimated from '~spa/components/RouteAnimated';
import Nav from '~spa/components/Nav';
import { getPathFromRouteKey } from '~data/routing';
import Popup from '~spa/components/Popup';
import { useState } from 'preact/hooks';
import Button from '~spa/components/Button';

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


  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClose = () => {
    setIsPopupOpen(false);
  }

  const handleOpen = () => {
    setIsPopupOpen(true);
  }


  return (
    <RouteAnimated url={getPathFromRouteKey('home')} animateIn={animateIn} animateOut={animateOut}>
      <h2 class="text-2xl">HOME</h2>
      <Nav />

      <Button onClick={handleOpen}>Open Popup</Button>

      <Popup isVisible={isPopupOpen}>
        My popup
        <Button onClick={() => null}>ILDE</Button>
        <Button onClick={() => null}>ILDE</Button>
        <Button onClick={handleClose}>Close</Button>
      </Popup>
    </RouteAnimated>
  );
};
