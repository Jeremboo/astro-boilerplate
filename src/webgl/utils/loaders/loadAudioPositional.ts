import { PositionalAudio } from 'three';

import audioManager from '~webgl/managers/audioManager';

import type { LoaderAudioArgs } from '.';
import loadAudioBuffer from './loadAudioBuffer';

export default async function loadAudioPositional(src: string, props: LoaderAudioArgs): Promise<PositionalAudio> {
  const audio = new PositionalAudio(audioManager.listener);
  return loadAudioBuffer(src, audio, props);
}
