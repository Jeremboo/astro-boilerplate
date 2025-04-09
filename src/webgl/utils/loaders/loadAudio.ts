import { Audio, AudioLoader } from 'three';
import { load, type LoaderAudioArgs} from '.';

const audioLoader = new AudioLoader();

export default async function loadAudio(src: string, { audioListener } = {} as LoaderAudioArgs, onProgress?: () => void): Promise<Audio> {
  const audio = new Audio(audioListener);
  return await load<AudioBuffer>(audioLoader, src, onProgress).then((buffer) => {
    audio.setBuffer(buffer);
    audio.setVolume(1);
    return audio;
  });
}
