import { useStore } from '@nanostores/preact';
import classnames from 'classnames';
import { useEffect, useRef } from 'preact/hooks';

import { showErrorMessage } from '~store/error';
import { $isMotionActive } from '~store/index';
import { $loading, setMainLoadingDone } from '~store/loading';
import { $windowSize } from '~store/windowSize';
// import WebglApp from '~webgl-ogl/index';
import WebglApp from '~webgl/index';
import logLoading from '~webgl/utils/loaders/logLoading';

export default function Webgl() {
  const windowSize = useStore($windowSize);
  const isMotionActive = useStore($isMotionActive);
  const { isMainLoadingDone } = useStore($loading);


  const initialWrapper = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WebglApp | null>(null);

  useEffect(() => {
    webglRef.current?.resize(windowSize.width, windowSize.height);
  }, [windowSize]);

  useEffect(() => {
    if (canvasRef.current && webglRef.current == null) {
      webglRef.current = new WebglApp(canvasRef.current);
      logLoading();
      webglRef.current
        .load()
        .then(() => {
          setMainLoadingDone();
          webglRef.current?.resize(windowSize.width, windowSize.height);
          if (isMotionActive) {
            webglRef.current?.play();
          }
        })
        .catch((err) => {
          console.error(err);
          showErrorMessage(err.message);
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
        'opacity-100': isMotionActive && isMainLoadingDone,
        'opacity-0': !isMotionActive || !isMainLoadingDone
      })}
    >
      <canvas ref={canvasRef} class="absolute left-0 top-0 size-full" />
    </div>
  );
}
