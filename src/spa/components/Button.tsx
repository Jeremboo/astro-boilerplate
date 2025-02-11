import { useStore } from '@nanostores/preact';
import classNames from 'classnames';
import type { ComponentChildren } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';

import { $isMenuOpen, $isPopupOpen } from '~store/index';

type Props = {
  id?: string;
  isTransparent?: boolean;
  isAlignRight?: boolean;
  isAlignLeft?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isActivatable?: boolean;
  isInPopup?: boolean;
  isTablable?: boolean;
  classes?: string;
  ariaHidden?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseOut?: () => void;
  children: ComponentChildren;
};

export const DEFAULT_BUTTON_CLASSES =
  'group m-1 px-8 py-2 rounded-full transform-gpu transition-[background,color,opacity] duration-base ease-linear';

export default function Button({
  id,
  isTransparent,
  isAlignRight,
  isAlignLeft,
  isSelected,
  isDisabled,
  isActivatable,
  isInPopup,
  isTablable = true,
  classes,
  children,
  ariaHidden = false,
  onClick,
  onMouseEnter,
  onMouseOut
}: Props) {
  const isMenuOpen = useStore($isMenuOpen);
  const isPopupOpen = useStore($isPopupOpen);

  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    if (isActivatable) {
      setIsActive(true);
    }
    onClick();
  };

  useEffect(() => {
    const disableActive = () => {
      setIsActive(false);
    };
    if (isActive && isActivatable) {
      document.body.addEventListener('click', disableActive);
    }
    return () => {
      document.body.removeEventListener('click', disableActive);
    };
  }, [isActive, isActivatable]);

  const isFocus = useMemo(() => isSelected || isActive, [isSelected, isActive]);
  const localIsTablable = useMemo(
    () => !isDisabled && isTablable && (isInPopup || (!isMenuOpen && !isPopupOpen)),
    [isDisabled, isPopupOpen, isInPopup, isTablable, isMenuOpen]
  );

  return (
    <button
      id={id}
      aria-pressed={isActivatable ? undefined : isSelected}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseOut}
      tabIndex={localIsTablable ? undefined : -1}
      aria-hidden={!isTablable || ariaHidden}
      class={classNames(DEFAULT_BUTTON_CLASSES, classes, {
        // Default
        'hover:bg-blackTransparent bg-black text-white active:bg-white active:text-black': !isTransparent && !isFocus,
        // Transparent
        'hover:bg-whiteTransparent bg-transparent': isTransparent && !isFocus,
        // Once select
        'bg-white text-black': isFocus,
        // Disabled
        'pointer-events-none opacity-50': isDisabled
      })}
    >
      <div
        class={classNames('flex flex-row items-center', {
          'justify-end': isAlignRight,
          'justify-start': isAlignLeft,
          'justify-center': !isAlignRight && !isAlignLeft
        })}
      >
        {children}
      </div>
    </button>
  );
}
