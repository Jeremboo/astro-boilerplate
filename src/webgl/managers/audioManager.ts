import { AudioListener } from 'three';

import AudioContextListener from '~utils/listeners/audioContext';

class AudioManager extends AudioContextListener {
  listener: AudioListener;

  isEnabled = false;

  // audioTween?: gsap.core.Tween;

  volume = 0;

  constructor() {
    const listener = new AudioListener();
    super(listener.context);
    this.listener = listener;
    this.listener.setMasterVolume(0);
  }

  setMainVolume(volume: number) {
    this.listener.setMasterVolume(volume);
  }

  toggleAudio(isEnabled: boolean) {
    if (!this.isRunning) return;
    if (this.isEnabled === isEnabled) return;
    // this.audioTween?.kill();
    // this.audioTween = gsap.to(this, {
    //   volume: isEnabled ? 1 : 0,
    //   duration: 2,
    //   onUpdate: () => {
    //     this.setMainVolume(this.volume);
    //   }
    // });
    this.isEnabled = isEnabled;
  }
}

export default new AudioManager();
