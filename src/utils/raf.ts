// https://github.com/Experience-Monks/nextjs-boilerplate/blob/main/src/services/raf.ts
// https://gist.github.com/Jeremboo/c1393f0a2bda7b1c26a2
type RAFListener = ((delta?: number) => void) | ((delta: number) => void);

class RAF {
  listeners: RAFListener[] = [];
  frameId = 0;
  elapsed = 0;
  count = 0;

  onFrame = () => {
    const now = Date.now();
    const delta = now - this.elapsed;
    this.elapsed = now;
    let i = this.count;
    while (--i >= 0) {
      this.listeners[i](delta);
    }
    this.listeners.forEach((listener) => listener(delta));
    this.frameId = requestAnimationFrame(this.onFrame);
  };

  add = (listener: RAFListener) => {
    if (this.listeners.includes(listener)) return;
    this.listeners.push(listener);
    this.count++;

    if (this.count > 0) {
      this.elapsed = Date.now();
      this.frameId = requestAnimationFrame(this.onFrame);
    }
  };

  remove = (listener: RAFListener) => {
    const idx = this.listeners.indexOf(listener);
    if (idx < 0) return;
    this.listeners.splice(idx, 1);
    this.count--;

    if (this.count <= 0) {
      cancelAnimationFrame(this.frameId);
      this.frameId = 0;
    }
  };
}

export default new RAF();
