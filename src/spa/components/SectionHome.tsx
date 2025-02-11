import { useStore } from '@nanostores/preact';
import classNames from 'classnames';
import { useState } from 'preact/hooks';

import useI18n from '~hooks/useI18n';
import useSection from '~hooks/useSection';
import { $isMenuOpen } from '~store/index';
import type { SectionProps } from '~types/index';

import Button from './Button';
import Popup from './Popup';

export default function SectionHome({ sectionName }: SectionProps) {
  const $i18n = useI18n();
  const isMenuOpen = useStore($isMenuOpen);

  const [isPopupVisible, setPopupVisible] = useState(false);

  /*
   * * *******************
   * * HANDLERS
   * * *******************
   */

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  /*
   * * *******************
   * * USE SECTION
   * * *******************
   */

  const animateIn = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });

  const animateOut = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

  const [sectionClassnames] = useSection({ sectionName, animateIn, animateOut });

  /*
   * * *******************
   * * RENDER
   * * *******************
   */

  return (
    <section class={classNames(sectionClassnames)} aria-hidden={isMenuOpen}>
      <p class="w-full text-center normal-case">{$i18n?.home?.copy}</p>
      <Button classes="w-sm" isActivatable onClick={handleOpenPopup}>
        {$i18n?.home?.cta}
      </Button>
      <Popup isVisible={isPopupVisible}>
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
        <Button classes="w-sm mt-4" isActivatable isInPopup={true} onClick={handleClosePopup}>
          {$i18n?.cta?.close}
        </Button>
      </Popup>
    </section>
  );
}
