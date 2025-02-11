import { useStore } from '@nanostores/preact';
import SVGMotion from '~spa/components/SVGMotion';
import SVGSound from '~spa/components/SVGSound';
import SVGWeb from '~spa/components/SVGWeb';
import { navigate } from 'astro:transitions/client';
import classNames from 'classnames';
import { useMemo, useState } from 'preact/hooks';

import useI18n from '~hooks/useI18n';
import { $isMenuOpen, $isMotionActive, $isPopupOpen, $isSoundActive } from '~store/index';
import { Languages } from '~types/enum';
import type { LanguagesNames } from '~types/index';
import { getI18nUrl } from '~utils/i18n';

import Toggle from './Toggle';

export type ToggleMenuProps = {
  lang: string;
  languages: LanguagesNames;
  classes?: string;
  isTablableForced?: boolean;
};

export default function ToggleMenu({ lang, classes, isTablableForced = false }: ToggleMenuProps) {
  const $i18n = useI18n();

  const isMenuOpen = useStore($isMenuOpen);
  const isPopupOpen = useStore($isPopupOpen);
  const isMotionActive = useStore($isMotionActive);
  const isSoundActive = useStore($isSoundActive);

  const [currentLanguage, setCurrentLanguage] = useState(lang);

  const localIsTablable = useMemo(
    () => isTablableForced || (!isPopupOpen && !isMenuOpen),
    [isTablableForced, isPopupOpen, isMenuOpen]
  );

  const toggleMotion = () => {
    $isMotionActive.set(!isMotionActive);
  };

  const toggleSound = () => {
    $isSoundActive.set(!isSoundActive);
  };

  const toggleLanguage = () => {
    const nextLang = currentLanguage === Languages.en ? Languages.fr : Languages.en;
    setCurrentLanguage(nextLang);
    const url = getI18nUrl(nextLang);
    navigate(url);
  };

  return (
    <div aria-hidden={!localIsTablable} class={classNames('z-toggle flex items-center', classes)}>
      <div class="flex items-center">
        <Toggle
          label={$i18n?.a11y?.soundToggle}
          icon={<SVGSound isActive={isSoundActive} />}
          isEnabled={isSoundActive}
          isTablable={localIsTablable}
          handleToggleClick={toggleSound}
        />
        <Toggle
          label={$i18n?.a11y?.animationToggle}
          icon={<SVGMotion width={15} isActive={isMotionActive} isWhite />}
          isEnabled={isMotionActive}
          isTablable={localIsTablable}
          handleToggleClick={toggleMotion}
        />
        <Toggle
          label={$i18n?.a11y?.languageToggle}
          icon={<SVGWeb />}
          on={` ${Languages.en}`}
          off={`${Languages.fr}  `}
          isEnabled={currentLanguage === Languages.en}
          isTablable={localIsTablable}
          handleToggleClick={toggleLanguage}
        />
      </div>
    </div>
  );
}
