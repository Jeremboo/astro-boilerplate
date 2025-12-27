import Listener from '.';

type ResizeHandler = (delta: number) => void;

class InfiniteScrollListener extends Listener<ResizeHandler> {
  private lastTouch = 0;

  protected start() {
    window.addEventListener('wheel', this.handleWheel);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
  }

  protected stop() {
    window.removeEventListener('wheel', this.handleWheel);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  private handleWheel = (e: WheelEvent) => {
    this.trigger(e.deltaY * 0.00001);
  };

  private handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const currentY = e.touches[0]?.clientX ?? this.lastTouch;
    const deltaY = this.lastTouch - currentY;
    if (this.lastTouch !== 0) {
      this.trigger(deltaY * 0.0001);
    }
    this.lastTouch = currentY;
  };

  private handleTouchEnd = (e: TouchEvent) => {
    this.lastTouch = 0;
  };
}

export default new InfiniteScrollListener();
