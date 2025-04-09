import { DEBUG_MODE } from '~data/index.ts';

import raf from '~utils/raf';
import Renderer from './renderer.ts';
import SceneManager, { Scenes } from './managers/sceneManager.ts';
import initLoaders from './utils/loaders/initLoaders.ts';

export default class Webgl {
  private readonly renderer: Renderer;
  private readonly sceneManager: SceneManager

  private _isLoaded = false;
  private isStarted = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas);
    this.sceneManager = new SceneManager(this.renderer);

    // TODO 2024-01-07 jeremboo: Put this somewhere else
    // if (DEBUG_MODE) {
    //   import(`../editor/index.ts`).then(({ bindWebgl }) => {
    //     bindWebgl(this);
    //   });
    // }
  }

  async load() {
    if (this._isLoaded) {
      console.warn('Webgl::load already loaded');
      return;
    }
    await initLoaders(this.renderer);
    await this.setScene(Scenes.Main);
    this._isLoaded = true;
  }

  public async setScene(sceneId: Scenes) {
    await this.sceneManager.setScene(sceneId);
  }

  public resize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.sceneManager.resize(width, height);
  }

  public update = (delta: number) => {
    this.sceneManager.update(delta);
  };

  public isLoaded() {
    return this._isLoaded;
  }

  play() {
    if (!this._isLoaded) {
      console.warn('Webgl::start not loaded yet. Call load() first');
      return;
    }
    if (this.isStarted) return;
    this.isStarted = true;
    raf.add(this.update);
  }

  pause() {
    if (!this.isStarted) return;
    this.isStarted = false;
    raf.remove(this.update);
  }

  dispose() {
    if (this.isStarted) {
      this.pause();
    }
    // TODO 2023-11-17 jeremboo:
  }
}
