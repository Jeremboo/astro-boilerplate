import { Clock } from 'three';

export default class TimeLog {
  id = '';
  enabled = false;
  clock = new Clock(true);

  constructor(id: string) {
    this.id = id;
  }

  start(message: string) {
    if (!this.enabled) return;
    this.clock.start();
    console.log(`${this.id}: ${message}`, 'starting...');
  }

  stop(message: string) {
    if (!this.enabled) return;
    this.clock.stop();
    console.log(`${this.id}: ${message}`, `finished in: ${this.clock.getElapsedTime()}`);
  }
}
