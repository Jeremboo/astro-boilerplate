import { atom, onMount } from 'nanostores';

export const windowSize = atom({ width: 0, height: 0 });

// TODO 2023-11-17 jeremboo: orientation change should only be on mobile

onMount(windowSize, () => {
  const handleResize = () => {
    windowSize.set({ width: window.innerWidth, height: window.innerHeight });
  };
  window.addEventListener('orientationchange', handleResize);
  window.addEventListener('resize', handleResize);
  handleResize();
  return () => {
    window.removeEventListener('orientationchange', handleResize);
    window.removeEventListener('resize', handleResize);
  };
});
