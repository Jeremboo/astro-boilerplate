import classNames from 'classnames';
import type { ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';

import { $isPopupOpen } from '~store/index';

type Props = {
  classes?: string;
  popupClasses?: string;
  isVisible: boolean;
  children: ComponentChildren;
};

export default function Popup({ isVisible, children, classes, popupClasses }: Props) {
  useEffect(() => {
    $isPopupOpen.set(isVisible);
  }, [isVisible]);
  return (
    <div
      aria-hidden={!isVisible}
      open={isVisible}
      class={classNames(classes, 'fixed left-0 top-0 z-popup flex h-full w-full items-center justify-center', {
        '': isVisible,
        'pointer-events-none': !isVisible
      })}
    >
      <div
        class={classNames(
          '-z-1 bg-blackTransparent absolute left-0 top-0 h-full w-full transition-opacity duration-base',
          {
            'opacity-100': isVisible,
            'opacity-0': !isVisible
          }
        )}
      />
      <div
        class={classNames(
          'py-12 flex max-w-lg flex-col items-center bg-white px-20 text-center text-black transition-[transform,opacity] duration-long',
          popupClasses,
          {
            '-translate-y-10 opacity-100': isVisible,
            'translate-y-0 opacity-0': !isVisible
          }
        )}
      >
        {children}
      </div>
    </div>
  );
}
