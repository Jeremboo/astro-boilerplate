import { useStore } from '@nanostores/preact';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useLocation, useRoute } from 'wouter-preact';

import { $currentRouteAnimated } from '~store/routing';

import { PageAnimStatus } from '~types/enum';

export type RouteTransitionProps = {
  url: string;
  animateIn: () => Promise<void>;
  animateOut: () => Promise<void>;
  cssAnimateIn?: string;
  cssAnimateOut?: string;
};

// TODO 2025-02-25 jeremboo: Can be improved to limit rerender
export default function useRouteTransition({
  url,
  animateIn,
  animateOut,
  cssAnimateIn = 'opacity-100 transition-opacity duration-long',
  cssAnimateOut = 'opacity-0 transition-opacity duration-long'
}: RouteTransitionProps) {
  const [match] = useRoute(url);
  const [location] = useLocation();
  const currentPath = useStore($currentRouteAnimated);
  const [animateStatus, setAnimateStatus] = useState(PageAnimStatus.OutEnd);

  const handleAnimateIn = useCallback(async () => {
    setAnimateStatus(PageAnimStatus.In);
    await animateIn();
    setAnimateStatus(PageAnimStatus.InEnd);
  }, [animateIn]);

  const handleAnimateOut = useCallback(async () => {
    setAnimateStatus(PageAnimStatus.Out);
    await animateOut();
    setAnimateStatus(PageAnimStatus.OutEnd);
  }, [animateOut]);

  useEffect(() => {
    if (match && currentPath === location) {
      handleAnimateIn();
    } else if (!match && animateStatus !== PageAnimStatus.OutEnd) {
      handleAnimateOut();
    }
  }, [match, currentPath]);

  useEffect(() => {
    if (animateStatus === PageAnimStatus.OutEnd && !match) {
      $currentRouteAnimated.set(location);
    }
  }, [animateStatus]);

  return [
    classNames({
      'pointer-events-none': animateStatus !== PageAnimStatus.InEnd,
      [`${cssAnimateIn}`]: animateStatus === PageAnimStatus.In || animateStatus === PageAnimStatus.InEnd,
      [`${cssAnimateOut}`]: animateStatus === PageAnimStatus.Out || animateStatus === PageAnimStatus.OutEnd
    }),
    match || animateStatus !== PageAnimStatus.OutEnd,
    animateStatus
  ];
}
