// TransitionAnimation
// TransitionAnimationPair

import type { TransitionDirectionalAnimations } from 'astro';

const customAnimationTransition = ({
  animInName = 'fade-in',
  animInDuration = 1,
  animOutName = 'fade-out',
  animOutDuration = 1,
  transitionOffset = 0
} = {}): TransitionDirectionalAnimations => {
  const anim = {
    old: {
      name: animOutName,
      duration: `${animOutDuration}s`,
      easing: 'linear',
      fillMode: 'forwards',
      delay: '0s'
    },
    new: {
      name: animInName,
      duration: `${animInDuration}s`,
      easing: 'linear',
      fillMode: 'backwards',
      delay: `${animOutDuration + transitionOffset}s`
    }
  };
  return {
    forwards: anim,
    backwards: anim
  };
};

// NOTE 2023-11-17 jeremboo: A transition delaying the transition but without animation
export const delayedTransition = (duration: number) => {
  return customAnimationTransition({
    animInDuration: 0,
    animOutDuration: 0,
    transitionOffset: duration
  });
};

// NOTE 2023-11-17 jeremboo: Custom classic fade out as dummy example
export const classicAnimationTransition = (animInDuration: number, animOutDuration: number, delay: number = 0) => {
  return customAnimationTransition({
    animInDuration,
    animOutDuration,
    transitionOffset: delay
  });
};

export default customAnimationTransition;
