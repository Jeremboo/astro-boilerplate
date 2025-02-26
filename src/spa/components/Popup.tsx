import classNames from 'classnames';
import type { ComponentChildren } from 'preact';
import { useRef } from 'preact/hooks';
import useFocusTrap from '~spa/hooks/useFocusTrap';

type Props = {
  classes?: string;
  popupClasses?: string;
  isVisible: boolean;
  children: ComponentChildren;
};

export default function Popup({ isVisible, children, classes, popupClasses }: Props) {

  const wrapperRef = useRef<HTMLDivElement>(null);

  useFocusTrap({ wrapperRef, isVisible })

  return (
    <div
      ref={wrapperRef}
      inert={!isVisible}
      class={classNames(classes, 'fixed left-0 top-0 z-popup flex h-full w-full items-center justify-center', {
        '': isVisible,
        'pointer-events-none': !isVisible
      })}
    >
      <div
        class={classNames(
          '-z-1 absolute left-0 top-0 h-full w-full bg-blackTransparent transition-opacity duration-base',
          {
            'opacity-100': isVisible,
            'opacity-0': !isVisible
          }
        )}
      />
      <div
        class={classNames(
          'flex max-w-lg flex-col items-center bg-white px-20 py-12 text-center text-black transition-[translate,opacity] duration-long',
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
