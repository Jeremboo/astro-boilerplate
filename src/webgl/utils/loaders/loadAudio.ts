import { Audio } from 'three';

import audioManager from '~webgl/managers/audioManager';

import type { LoaderAudioArgs } from '.';
import loadAudioBuffer from './loadAudioBuffer';

export default async function loadAudioPositional(src: string, props: LoaderAudioArgs): Promise<Audio> {
  const audio = new Audio(audioManager.listener);
  return loadAudioBuffer(src, audio, props);
}
