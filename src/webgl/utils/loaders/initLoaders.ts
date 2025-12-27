import type { WebGLRenderer } from 'three';

import { setDRACOLoader } from './loadGLTF';
// import { getKTX2Loader } from "./loadKTX2Texture";

export default async function initLoaders(renderer: WebGLRenderer) {
  await setDRACOLoader();
  // const ktx2Loader = await getKTX2Loader(renderer);
  // setKtx2Loader(ktx2Loader);
}
