import { useStore } from '@nanostores/preact';
import classNames from 'classnames';
import { useEffect, useState } from 'preact/hooks';

import useI18n from '~hooks/useI18n';
import useSection from '~hooks/useSection';
import { showErrorMessage } from '~store/error';
import { $isMenuOpen } from '~store/index';
import { nextSection } from '~store/sections';
import type { SectionProps } from '~types/index';
import initProject from '~utils/init-project';

import SVGLoading from './SVGLoading';

type Props = SectionProps & {
  onLoaded?: () => void;
  additionalLoading?: (onProgress: (percent: number) => void) => void;
};

export default function SectionLoading({ sectionName, onLoaded }: Props) {
  const $i18n = useI18n();
  const isMenuOpen = useStore($isMenuOpen);

  const [loadingPercent, setLoadingPercent] = useState(0);

  /*
   * * *******************
   * * USE SECTION
   * * *******************
   */

  const animateIn = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

  const animateOut = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });

  const [sectionClassnames] = useSection({ sectionName, animateIn, animateOut });

  // NOTE 2023-12-11 jeremboo: Check if everything is ok to go to the next step
  useEffect(() => {
    if (loadingPercent >= 1) {
      if (onLoaded) {
        onLoaded();
      } else {
        nextSection();
      }
    }
  }, [loadingPercent]);

  /*
   * * *******************
   * * LOADING
   * * *******************
   */

  useEffect(() => {
    initProject((progress) => {
      setLoadingPercent(progress);
    }).catch((e) => {
      showErrorMessage($i18n?.error?.loading);
      console.error(e);
    });
  }, []);

  /*
   * * *******************
   * * RENDER
   * * *******************
   */

  return (
    <section class={classNames(sectionClassnames)} aria-hidden={isMenuOpen}>
      <SVGLoading
        classes="smVert:relative smVert:w-full smVert:top-0 absolute left-50% top-50% -translate-x-50%"
        percent={loadingPercent}
        isWhite
      />
    </section>
  );
}
