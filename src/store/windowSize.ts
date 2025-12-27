import { atom, onMount } from 'nanostores';

import windowResize from '~utils/listeners/windowResize';

export const $windowSize = atom({ width: 0, height: 0 });

// TODO 2023-11-17 jeremboo: orientation change should only be on mobile

onMount($windowSize, () => {
  const handleResize = () => {
    $windowSize.set({ width: window.innerWidth, height: window.innerHeight });
  };

  windowResize.add(handleResize);
  handleResize();
  return () => {
    windowResize.remove(handleResize);
  };
});
