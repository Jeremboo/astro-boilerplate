import { useStore } from '@nanostores/preact';
import classNames from 'classnames';

import { $isMenuOpen } from '~store/index';
import Nav from './Nav';
import useFocusTrap from '~spa/hooks/useFocusTrap';
import { useRef } from 'preact/hooks';

export default function Menu() {
  const isMenuOpen = useStore($isMenuOpen);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useFocusTrap({ wrapperRef, isVisible: isMenuOpen })

  return (
    <div
      ref={wrapperRef}
      class={classNames('absolute left-0 top-0 z-menu h-full w-full', {
        '': isMenuOpen,
        'pointer-events-none': !isMenuOpen
      })}
    >
      <button
        aria-hidden={true}
        onClick={() => $isMenuOpen.set(false)}
        class={classNames(
          'absolute -z-10 h-full w-full cursor-pointer bg-blackTransparent transition-opacity duration-base',
          {
            'opacity-100': isMenuOpen,
            'opacity-0': !isMenuOpen
          }
        )}
        tabIndex={-1}
      ></button>
      <div
        class={classNames('box-border h-full w-[576px] bg-background px-8 pt-20 transition-transform duration-long', {
          'translate-x-0': isMenuOpen,
          '-translate-x-full': !isMenuOpen
        })}
      >
        <Nav />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere iste corrupti tempora! Minus nulla aliquid
          ullam pariatur voluptatibus laudantium deserunt molestias sapiente molestiae, numquam voluptas totam et,
          reprehenderit velit esse.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere iste corrupti tempora! Minus nulla aliquid
          ullam pariatur voluptatibus laudantium deserunt molestias sapiente molestiae, numquam voluptas totam et,
          reprehenderit velit esse.
        </p>
      </div>
    </div>
  );
}
