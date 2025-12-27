import Service from '.';

// https://github.com/Experience-Monks/nextjs-boilerplate/blob/main/src/services/raf.service.ts
// https://gist.github.com/Jeremboo/c1393f0a2bda7b1c26a2
type RAFHandler = ((delta?: number) => void) | ((delta: number) => void);

class RAFListener extends Service<RAFHandler> {
  frameId = 0;
  elapsed = 0;

  // Start when one trigger is added
  protected start() {
    this.elapsed = Date.now();

    // INSERT_YOUR_CODE
    // Add general click event listener who triggers onFrame
    this.frameId = requestAnimationFrame(this.onFrame);
  }

  // Stop when the last trigger is removed
  protected stop() {
    cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }

  onFrame = () => {
    const now = Date.now();
    const delta = (now - this.elapsed) * 0.001;
    this.elapsed = now;

    this.trigger(delta);

    this.frameId = requestAnimationFrame(this.onFrame);
  };
}

export default new RAFListener();
