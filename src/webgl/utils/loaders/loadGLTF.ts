import type { GLTF, KTX2Loader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { load } from '.';

const gltfLoader = new GLTFLoader();

export async function setDRACOLoader() {
  const DRACOLoader = (await import('three/examples/jsm/loaders/DRACOLoader.js')).DRACOLoader;
  const dracoLoader = new DRACOLoader();
  // It is recommended to always pull your Draco JavaScript and WASM decoders
  // from this URL. Users will benefit from having the Draco decoder in cache
  // as more sites start using the static URL.
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  dracoLoader.preload(); // ???
  gltfLoader.setDRACOLoader(dracoLoader);
}

export async function setMeshoptDecoder() {
  const decoder = (await import('three/examples/jsm/libs/meshopt_decoder.module.js')).MeshoptDecoder;
  gltfLoader.setMeshoptDecoder(decoder);
}

export function setKtx2Loader(ktx2Loader: KTX2Loader) {
  gltfLoader.setKTX2Loader(ktx2Loader);
}

export default async function loadGLTF(src: string, props = {}, onProgress?: () => void) {
  return await load<GLTF>(gltfLoader, src, onProgress);
}
