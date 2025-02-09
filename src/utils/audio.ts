import gsap from 'gsap';

import { $isSoundActive } from '~store/index';

import { inverseLerp } from '.';

// https://stackoverflow.com/questions/32460123/connect-analyzer-to-howler-sound
// https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createGain#examples
class Audio {
  howler!: HowlerGlobal;
  Howl!: typeof Howl;

  analyser!: AnalyserNode;
  data!: Uint8Array;

  // Create another gain node to be capable to mute the sound but still get audio data
  finalGainNode!: GainNode;

  mainVolume = 1;
  mainVolumeTween?: gsap.core.Tween;

  constructor() {
    $isSoundActive.listen(this.handleSoundMute);
  }

  init() {
    return new Promise((resolve, reject) => {
      if (this.howler) {
        resolve(null);
        return;
      }
      import('howler')
        .then((howlerPackage) => {
          this.howler = howlerPackage.Howler;
          this.Howl = howlerPackage.Howl;
          resolve(null);
        })
        .catch(reject);
    });
  }

  async initAnalyser() {
    if (!this.howler) throw new Error('Howler not loaded');

    // NOTE 2023-09-18 jeremboo: Trick to init the Howler.ctx
    // https://stackoverflow.com/questions/46690346/react-and-howlerjs-howler-ctx-is-null
    this.howler.mute(false);
    this.howler.volume(1);

    // Create an analyser node in the Howler WebAudio context
    this.analyser = this.howler.ctx.createAnalyser();
    // Connect the masterGain -> analyser (disconnecting masterGain -> destination)
    Howler.masterGain.connect(this.analyser);
    this.data = new Uint8Array(this.analyser.frequencyBinCount);

    // Connect the finalGainNode right after the masterGain
    this.finalGainNode = this.howler.ctx.createGain();
    Howler.masterGain.connect(this.finalGainNode);
    this.finalGainNode.connect(this.howler.ctx.destination);
    Howler.masterGain.disconnect(this.howler.ctx.destination);
  }

  /*
   * * *******************
   * * LOAD MP3 FILES
   * * *******************
   */

  async loadFile(path: string, loop = false) {
    return new Promise<Howl>((resolve, reject) => {
      if (!this.howler) {
        reject(new Error('Howler is not loaded'));
        return;
      }
      const sound = new this.Howl({
        src: path,
        loop,
        onload: () => {
          resolve(sound);
        },
        // volume: 0.5,
        onloaderror: () => {
          reject(new Error(`ERROR: The file ${path} is not found`));
        }
      });
    });
  }

  /*
   * * *******************
   * * HANDLERS
   * * *******************
   */

  applyMainVolume = () => {
    this.finalGainNode.gain.setValueAtTime(this.mainVolume, this.howler.ctx.currentTime);
  };

  handleSoundMute = (isSoundActive: boolean) => {
    if (!this.howler) return;
    const newVolume = isSoundActive ? 1 : 0;
    if (newVolume === this.mainVolume) return;
    this.mainVolumeTween?.kill();
    this.mainVolumeTween = gsap.to(this, {
      mainVolume: newVolume,
      duration: 0.4,
      ease: 'linear',
      onUpdate: this.applyMainVolume
    });
  };

  /*
   * * *******************
   * * COMPUTE AUDIO DATA
   * * *******************
   */

  getAudioData(idx: number) {
    return inverseLerp(80, 160, this.data[idx]);
  }

  computeAudioData() {
    if (!this.analyser) return;
    this.analyser.getByteTimeDomainData(this.data);
  }
}

export default new Audio();
