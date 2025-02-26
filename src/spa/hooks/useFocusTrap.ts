import type { RefObject } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";
import FocusTrap from "~utils/focusTrap";

type Props = {
  wrapperRef: RefObject<HTMLElement>;
  isVisible: boolean;
}

export default ({ wrapperRef, isVisible }: Props) => {
    const focusTrap = useRef<FocusTrap>(null);
    useLayoutEffect(() => {
      if (wrapperRef.current && focusTrap.current === null) {
        focusTrap.current = new FocusTrap(wrapperRef.current);
      }
      if (isVisible) {
        focusTrap.current?.open();
      } else {
        focusTrap.current?.close();
      }
    }, [isVisible]);

  return null;
}