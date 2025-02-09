import { useStore } from '@nanostores/preact';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'preact/hooks';

import { $sectionCurrent, $sectionNext } from '~store/sections';
import type { Sections } from '~types/enum';
import { SectionAnimStatus } from '~types/enum';
import type { SectionProps } from '~types/index';

export type AnimationProps = {
  animateIn: () => Promise<void>;
  animateOut: () => Promise<void>;
  cssAnimateIn?: string;
  cssAnimateOut?: string;
};

export type UseSectionProps = SectionProps<Sections, AnimationProps>;

// TODO 2025-02-07 jeremboo: useSectionRouter? useRouter?
// TODO 2025-02-08 jeremboo: Use react router instead ?
export default function useSection({
  sectionName,
  animateIn,
  animateOut,
  cssAnimateIn = 'opacity-100',
  cssAnimateOut = 'opacity-0 transition-opacity duration-long'
}: UseSectionProps) {
  const [animateStatus, setAnimateStatus] = useState(SectionAnimStatus.None);
  const sectionNext = useStore($sectionNext);

  const handleAnimateIn = useCallback(async () => {
    setAnimateStatus(SectionAnimStatus.In);
    await animateIn();
    setAnimateStatus(SectionAnimStatus.InEnd);
  }, [animateIn]);

  const handleAnimateOut = useCallback(async () => {
    setAnimateStatus(SectionAnimStatus.Out);
    await animateOut();
    setAnimateStatus(SectionAnimStatus.OutEnd);
    $sectionCurrent.set(sectionNext);
  }, [animateOut, sectionNext]);

  useEffect(() => {
    if (sectionName === sectionNext) {
      handleAnimateIn();
    } else {
      handleAnimateOut();
    }
  }, [sectionName, sectionNext]);

  return [
    classNames('flex size-full flex-col items-center justify-center', cssAnimateOut, {
      'pointer-events-none': animateStatus === SectionAnimStatus.In || animateStatus === SectionAnimStatus.Out,
      [`${cssAnimateIn}`]: animateStatus === SectionAnimStatus.In || animateStatus === SectionAnimStatus.InEnd
    }),
    animateStatus
  ];
}
