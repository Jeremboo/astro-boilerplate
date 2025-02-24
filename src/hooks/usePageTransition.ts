import { useStore } from '@nanostores/preact';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'preact/hooks';

import { $pageCurrent, $pageCurrentLoaded, $pageNext } from '~store/pages';
import type { Pages } from '~types/enum';
import { PageAnimStatus } from '~types/enum';

export type AnimationProps = {
  animateIn: () => Promise<void>;
  animateOut: () => Promise<void>;
  cssAnimateIn?: string;
  cssAnimateOut?: string;
};

export type UsePageProps = PageProps<Pages, AnimationProps>;

export default function usePageTransition({
  pageId,
  animateIn,
  animateOut,
  cssAnimateIn = 'opacity-100',
  cssAnimateOut = 'opacity-50 transition-opacity duration-long'
}: UsePageProps) {
  const [animateStatus, setAnimateStatus] = useState(PageAnimStatus.None);
  const pageNext = useStore($pageNext);
  const pageCurrent = useStore($pageCurrent);
  const pageCurrentLoaded = useStore($pageCurrentLoaded);

  const handleAnimateIn = useCallback(async () => {
    setAnimateStatus(PageAnimStatus.In);
    await animateIn();
    setAnimateStatus(PageAnimStatus.InEnd);
  }, [animateIn]);

  const handleAnimateOut = useCallback(async () => {
    setAnimateStatus(PageAnimStatus.Out);
    await animateOut();
    setAnimateStatus(PageAnimStatus.OutEnd);
    $pageCurrentLoaded.set(false);
    $pageCurrent.set(pageNext);
  }, [animateOut, pageNext]);

  useEffect(() => {
    if (pageId !== pageNext && animateStatus !== PageAnimStatus.None) {
      handleAnimateOut();
    }
  }, [pageId, pageNext]);

  useEffect(() => {
    if (pageId === pageCurrent && pageCurrentLoaded) {
      handleAnimateIn();
    }
  }, [pageId, pageCurrent, pageCurrentLoaded]);

  return [
    classNames('flex size-full flex-col items-center justify-center', cssAnimateOut, {
      'pointer-events-none': animateStatus === PageAnimStatus.In || animateStatus === PageAnimStatus.Out,
      [`${cssAnimateIn}`]: animateStatus === PageAnimStatus.In || animateStatus === PageAnimStatus.InEnd
    }),
    animateStatus
  ];
}
