import type { Audio } from 'three';

import type { AssetType } from '~types/enum';
import assetManager from '~webgl/managers/assetManager';
import audioManager from '~webgl/managers/audioManager';

export default class AmbientAudioObj {
  name: string;
  private audio?: Audio;

  private progress = -1;

  constructor(name: string) {
    this.name = name;
  }

  async bindAssets() {
    this.audio = (await assetManager.get<AssetType.audio>(this.name))?.data;
    this.audio.loop = true;
  }

  handleProgress = (newProgress: number) => {
    if (!audioManager.isRunning) return false;
    if (!this.audio) return false;
    if (this.progress <= 0 && newProgress > 0) {
      this.audio.play();
    } else if (newProgress <= 0) {
      this.audio.pause();
    }
    this.audio.setVolume(newProgress);
    this.progress = newProgress;
    return true;
  };
}
