import { VideoTexture } from 'three';

import type { LoaderVideoArgs } from '.';
import loadVideo from './loadVideo';

export default async function loadVideoTexture(src: string, props: LoaderVideoArgs = {}) {
  const video = await loadVideo(src, props);
  return new VideoTexture(video);
}
