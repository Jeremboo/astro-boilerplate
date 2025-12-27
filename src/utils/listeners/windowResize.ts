import Listener from '.';

type ResizeHandler = (e: WindowEventHandlers) => void;

class WindowResizeListener extends Listener<ResizeHandler> {
  protected start() {
    window.addEventListener('orientationchange', this.trigger);
    window.addEventListener('resize', this.trigger);
  }

  protected stop() {
    window.removeEventListener('orientationchange', this.trigger);
    window.removeEventListener('resize', this.trigger);
  }
}

export default new WindowResizeListener();
