import { AUDIO_FILES_URL } from '~data/index';

import { forEachAsync } from '.';
import audio from './audio';

// TODO 2023-12-27 jeremboo: create data/sfx.ts ?
export enum BackgroundAudioType {
  Home,
  Ambient
}
const AUDIO_FILES: { [key in BackgroundAudioType]: string } = {
  [BackgroundAudioType.Home]: `${AUDIO_FILES_URL}background/ambient.mp3`,
  [BackgroundAudioType.Ambient]: `${AUDIO_FILES_URL}background/ambient.mp3`
};

class BackgroundAudio {
  sounds: { [key in BackgroundAudioType]?: { isPlaying: boolean; howl: Howl } } = {};

  getSound(type: BackgroundAudioType) {
    return this.sounds[type];
  }

  /*
   * * *******************
   * * INIT
   * * *******************
   */

  async init() {
    await forEachAsync(Object.keys(AUDIO_FILES), async (key) => {
      const keyAudioType = key as unknown as BackgroundAudioType;
      if (!this.sounds[keyAudioType]) {
        const howl = await audio.loadFile(AUDIO_FILES[keyAudioType], true);
        this.sounds[keyAudioType] = {
          isPlaying: false,
          howl
        };
      }
    });
  }

  /*
   * * *******************
   * * CONTROLS
   * * *******************
   */

  play(type: BackgroundAudioType, duration = 500) {
    const sound = this.getSound(type);
    if (!sound || sound.isPlaying) return;
    sound.isPlaying = true;
    sound.howl.play();
    sound.howl.fade(0, 1, duration);
  }

  stop(type: BackgroundAudioType, fadeDuration = 500) {
    const sound = this.getSound(type);
    if (!sound || !sound.isPlaying) return;
    sound.isPlaying = false;
    sound.howl.fade(1, 0, fadeDuration);
    setTimeout(() => {
      if (sound.howl.volume() === 0) {
        sound.howl.stop();
      }
    }, fadeDuration);
  }
}

export default new BackgroundAudio();
