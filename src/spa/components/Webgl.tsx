import { useStore } from '@nanostores/preact';
import classnames from 'classnames';
import { useEffect, useRef } from 'preact/hooks';

import { $isMotionActive } from '~store/index';
import { $windowSize } from '~store/windowSize';
import WebglApp from '~webgl/index';

export default function Webgl() {
  const windowSize = useStore($windowSize);
  const isMotionActive = useStore($isMotionActive);

  const initialWrapper = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WebglApp | null>(null);

  useEffect(() => {
    webglRef.current?.resize(windowSize.width, windowSize.height);
  }, [windowSize]);

  useEffect(() => {
    if (canvasRef.current && webglRef.current == null) {
      webglRef.current = new WebglApp(canvasRef.current);
      webglRef.current?.resize(windowSize.width, windowSize.height);
    }

    return () => {
      webglRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    // TODO 2024-01-11 jeremboo: Stop the webgl
  }, [isMotionActive]);

  return (
    <div
      ref={initialWrapper}
      class={classnames('absolute left-0 top-0 z-webgl size-full transition-opacity duration-long', {
        'opacity-100': isMotionActive,
        'opacity-0': !isMotionActive
      })}
    >
      <canvas ref={canvasRef} class="absolute left-0 top-0 size-full" />
    </div>
  );
}
