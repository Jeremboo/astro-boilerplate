import type { Texture } from 'three';
import { CanvasTexture, ImageBitmapLoader, LinearFilter, MathUtils, TextureLoader } from 'three';

import { load, type LoaderTextureArgs } from '.';

function validateTextureSize(width: number, height: number, texture: Texture) {
  if (!(MathUtils.isPowerOfTwo(width) && MathUtils.isPowerOfTwo(height))) {
    texture.generateMipmaps = false;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
  }
}

// TODO 2025-04-09 jeremboo: Replace that with imported browser detection
// https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/GLTFLoader.js#L2732
// Use an ImageBitmapLoader if imageBitmaps are supported. Moves much of the
// expensive work of uploading a texture to the GPU off the main thread.

let isSafari = false;
let safariVersion = -1;
let isFirefox = false;
let firefoxVersion = -1;
if (typeof navigator !== 'undefined') {
  const { userAgent } = navigator;

  isSafari = /^((?!chrome|android).)*safari/i.test(userAgent) === true;
  const safariMatch = userAgent.match(/Version\/(\d+)/);
  safariVersion = isSafari && safariMatch ? parseInt(safariMatch[1], 10) : -1;

  isFirefox = userAgent.indexOf('Firefox') > -1;
  firefoxVersion = isFirefox ? parseInt((userAgent.match(/Firefox\/([0-9]+)\./) ?? [])[1] ?? '-1') : -1;
}
const isBitmapSupported = !(
  typeof createImageBitmap === 'undefined' ||
  (isSafari && safariVersion < 17) ||
  (isFirefox && firefoxVersion < 98)
);

const textureLoader = isBitmapSupported ? new ImageBitmapLoader() : new TextureLoader();

export default async function loadTexture(src: string, args = {} as LoaderTextureArgs) {
  if (isBitmapSupported && textureLoader instanceof ImageBitmapLoader) {
    if (args?.imageOrientation) {
      textureLoader.setOptions({ imageOrientation: args.imageOrientation });
    }
    return load<ImageBitmap>(textureLoader, src).then((bitmap) => {
      const texture = new CanvasTexture(bitmap);
      validateTextureSize(texture.image.width, texture.image.height, texture);
      return texture;
    });
  }
  return load<Texture>(textureLoader, src);
}
