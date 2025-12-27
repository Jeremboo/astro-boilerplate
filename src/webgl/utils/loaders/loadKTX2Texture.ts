import type { CompressedTexture, WebGLRenderer } from 'three';
import type { KTX2Loader } from 'three/examples/jsm/Addons.js';
import { load } from '.';

let ktx2Loader: KTX2Loader;

export async function getKTX2Loader(renderer?: WebGLRenderer) {
  if (ktx2Loader !== undefined) {
    return ktx2Loader;
  }

  if (renderer === undefined) {
    throw new Error('KTX2Loader: No renderer provided');
  }

  const { KTX2Loader } = await import('three/examples/jsm/loaders/KTX2Loader.js');
  ktx2Loader = new KTX2Loader();
  // ktx2Loader.setTranscoderPath('examples/jsm/libs/basis/'):
  // ktx2Loader.setTranscoderPath(`${settings.baseUrl}assets/lib/basis/`);
  ktx2Loader.setTranscoderPath(`/assets/lib/basis/`);
  ktx2Loader.detectSupport(renderer);

  return ktx2Loader;
}

export default async function loadKTX2Texture(src: string, props = {}) {
  if (ktx2Loader === undefined) {
    throw new Error('KTX2Loader not loaded. Please call getKTX2Loader(renderer) first.');
  }
  return load<CompressedTexture>(ktx2Loader, src);
}