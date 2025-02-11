import { useStore } from '@nanostores/preact';
import classNames from 'classnames';

import { $isMenuOpen } from '~store/index';

export default function Menu() {
  const isMenuOpen = useStore($isMenuOpen);

  return (
    <div
      aria-hidden={!isMenuOpen}
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
        <div class="flex gap-2">
          <a class="rounded-full bg-black px-4 py-2" href="/">
            Home
          </a>
          <a class="rounded-full bg-black px-4 py-2" href="/about">
            About
          </a>
          <a class="rounded-full bg-black px-4 py-2" href="/projects">
            Projects
          </a>
          <a class="rounded-full bg-black px-4 py-2" href="/blog">
            Blog
          </a>
        </div>
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
