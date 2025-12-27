export type Handler = (...args: any[]) => void;

export default class Listener<T extends Handler = () => void> {
  protected handlers: T[] = [];
  protected count = 0;

  protected start() {}
  protected stop() {}

  protected trigger = (...args: any[]) => {
    let i = this.count;
    while (--i >= 0) {
      this.handlers[i](...args);
    }
  };

  /*
   * * *******************
   * * PUBLIC
   * * *******************
   */

  public add(listener: T) {
    if (this.includes(listener)) return;
    this.handlers.push(listener);
    this.count++;

    if (this.count === 1) {
      this.start();
    }
  }

  public remove(listener: T) {
    const idx = this.handlers.indexOf(listener);
    if (idx < 0) return;
    this.handlers.splice(idx, 1);
    this.count--;

    if (!this.count) {
      this.stop();
    }
  }

  public includes(listener: T) {
    return this.handlers.includes(listener);
  }
}
