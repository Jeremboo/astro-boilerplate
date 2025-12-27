import Listener, { type Handler } from '.';

export default class AudioContextListener extends Listener {
  props = {
    audioContextRunningDelay: 500
  };
  private audioContext: AudioContext;

  private safeIsRunning = false;
  get isRunning() {
    return this.audioContext.state === 'running' && this.safeIsRunning;
  }

  constructor(audioContext?: AudioContext) {
    super();
    this.audioContext = audioContext ?? new AudioContext();
    this.safeIsRunning = this.isRunning;

    document.addEventListener('click', this.resumeContext);
  }

  public add(listener: Handler) {
    if (this.isRunning) {
      listener();
    } else {
      super.add(listener);
    }
  }

  private resumeContext = async () => {
    await this.audioContext.resume();

    // NOTE 2025-09-18 jeremboo: Add a delay to be sure isRunning is really good (race condition in Chrome ?)
    setTimeout(() => {
      this.safeIsRunning = true;
      this.trigger();
    }, this.props.audioContextRunningDelay);
    document.removeEventListener('click', this.resumeContext);
  };
}
