import { useStore } from '@nanostores/preact';
import classNames from 'classnames';

import { $isMenuOpen } from '~store/index';

export default function Menu() {
  const isMenuOpen = useStore($isMenuOpen);

  return (
    <div
      aria-hidden={!isMenuOpen}
      class={classNames('z-menu absolute left-0 top-0 h-full w-full', {
        '': isMenuOpen,
        'pointer-events-none': !isMenuOpen
      })}
    >
      <button
        aria-hidden={true}
        onClick={() => $isMenuOpen.set(false)}
        class={classNames(
          'bg-blackTransparent absolute -z-10 h-full w-full cursor-pointer transition-opacity duration-base',
          {
            'opacity-1': isMenuOpen,
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
