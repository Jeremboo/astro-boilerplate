import { useStore } from '@nanostores/preact';
import portraitImg from 'assets/svgs/portrait-mode.svg';
import classNames from 'classnames';
import { useMemo } from 'preact/hooks';
import { isMobile } from 'react-device-detect';

import useI18n from '~hooks/useI18n';
import { $windowSize } from '~store/windowSize';

const PROPS = {
  screenRatioMax: 1.7,
  minHeight: 500
};

const LandscapeLock = () => {
  const $i18n = useI18n();
  const { width, height } = useStore($windowSize);
  const isLandscape = useMemo(() => {
    const ratio = width / height;
    return isMobile && ratio > PROPS.screenRatioMax && height < PROPS.minHeight;
  }, [isMobile, width, height]);

  return (
    isLandscape && (
      <div
        class={classNames('fixed z-landscape hidden size-full items-center justify-center bg-defaultBg landscape:flex')}
      >
        <p class=" w-3/4 max-w-sm text-center">{$i18n.portraitMode}</p>
        <img class="absolute z-webgl h-3/4" src={portraitImg.src} alt={$i18n?.alt?.portraitImg} />
      </div>
    )
  );
};

export default LandscapeLock;
