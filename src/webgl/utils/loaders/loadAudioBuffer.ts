import { type Audio, AudioLoader, type PositionalAudio } from 'three';

import { load, type LoaderAudioArgs } from '.';

const audioLoader = new AudioLoader();

// Can be checked too : https://github.com/petervdn/audiobuffer-loader/blob/master/src/lib/audiobuffer-loader.ts
export default async function loadAudioBuffer<T extends Audio | PositionalAudio>(
  src: string,
  audio: T,
  { loop = false }: LoaderAudioArgs = {}
): Promise<T> {
  return load<AudioBuffer>(audioLoader, src).then((buffer) => {
    audio.setBuffer(buffer);
    audio.setLoop(loop);
    return audio;
  });
}
