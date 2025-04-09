import { useStore } from '@nanostores/preact';
import classnames from 'classnames';
import { useEffect, useRef } from 'preact/hooks';

import { $isMotionActive } from '~store/index';
import { $windowSize } from '~store/windowSize';
import raf from '~utils/raf';
// import WebglApp from '~webgl-ogl/index';
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
      webglRef.current.resize(windowSize.width, windowSize.height);
      webglRef.current.load().then(() => {
        if (isMotionActive) {
          webglRef.current?.play();
          raf.onFrame();
        }
      }).catch((err) => {
        console.error('Error loading WebGL app:', err);
      });
    }

    return () => {
      webglRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!webglRef.current || !webglRef.current?.isLoaded()) return;
    if (isMotionActive) {
      webglRef.current?.play();
    } else {
      webglRef.current?.pause();
    }
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
