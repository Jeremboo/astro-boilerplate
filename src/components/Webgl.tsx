import { useStore } from '@nanostores/preact';
import { useEffect, useRef } from 'preact/hooks';

import { windowSize } from '~store/windowSize';
import WebglApp from '~webgl/index';

export default function Webgl() {
  const $windowSize = useStore(windowSize);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WebglApp | null>(null);

  useEffect(() => {
    if (canvasRef.current && webglRef.current == null) {
      webglRef.current = new WebglApp(canvasRef.current);
    }

    return () => {
      webglRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    webglRef.current?.resize($windowSize.width, $windowSize.height);
  }, [$windowSize]);

  return <canvas ref={canvasRef} class="absolute left-0 top-0 -z-10 h-full w-full" />;
}
