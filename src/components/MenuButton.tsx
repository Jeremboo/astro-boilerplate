import { useStore } from '@nanostores/preact';
import classNames from 'classnames';

import Button from '~components/Button';
import SVGArrow from '~components/SVGArrow';
import { $isMenuOpen, $isPopupOpen } from '~store/index';

type Props = {
  menuCopy: string;
  backCopy: string;
};

export default function MenuButton({ menuCopy, backCopy }: Props) {
  const isMenuOpen = useStore($isMenuOpen);
  const isPopupOpen = useStore($isPopupOpen);

  return (
    <div class="relative z-nav">
      <Button
        ariaHidden={isMenuOpen && isPopupOpen}
        isTransparent
        isTablable={!isMenuOpen}
        classes={classNames('absolute top-1 left-5 w-36 h-12', {
          'pointer-events-none opacity-0 delay-[0ms,0ms,0ms]': isMenuOpen,
          'delay-[0ms,0ms,200ms]': !isMenuOpen
        })}
        onClick={() => $isMenuOpen.set(true)}
      >
        <span class="whitespace-nowrap">{menuCopy}</span>
      </Button>
      <Button
        ariaHidden={!isMenuOpen && isPopupOpen}
        isTransparent
        isTablable={isMenuOpen}
        isInPopup={isMenuOpen}
        classes={classNames('absolute top-1 left-5 w-36 h-12', {
          'pointer-events-none opacity-0 delay-[0ms,0ms,0ms]': !isMenuOpen,
          'delay-[0ms,0ms,200ms]': isMenuOpen
        })}
        onClick={() => $isMenuOpen.set(false)}
      >
        <SVGArrow classes="-ml-8 mr-6" />
        <span>{backCopy}</span>
      </Button>
    </div>
  );
}
