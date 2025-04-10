import { Scene, WebGLRenderer } from 'three';

import Camera from '../components/Camera';

import type { AssetProps } from '~webgl/managers/assetManager';
import type { Scenes } from '~webgl/managers/sceneManager';
import assetManager from '~webgl/managers/assetManager';
import preloadGpu from '~webgl/utils/preloadGPU';

interface BaseSceneProps {
  id: Scenes;
  assets?: AssetProps[];
}

export default class BaseScene {
  readonly id: Scenes;
  readonly assets: AssetProps[] = [];

  readonly camera: Camera;
  readonly scene = new Scene();

  protected isInit = false;

  constructor({ id, assets }: BaseSceneProps) {
    this.id = id;
    this.assets = assets ?? [];

    this.camera = new Camera();
  }

  /**
   * * *******************
   * * LOADING CYCLE
   * * *******************
   */

  async init(renderer: WebGLRenderer, onProgress?: () => void) {
    if (this.isInit) return;
    this.isInit = true;
    await this.load(onProgress);
    await this.onAfterAssetLoad();
    preloadGpu(renderer, this.scene, this.camera);
  }

  private async load(onProgress?: () => void) {
    if (assetManager.assets[this.id] !== undefined && !this.assets.length) {
      return;
    }
    return await assetManager.load(this.assets, this.id, onProgress);
  }

  async onAfterAssetLoad() {}

  resize(width: number, height: number) {
    this.camera.resize(width, height);
  }

  update(delta: number) {
    // TODO 2025-04-09 jeremboo:
  }

  dispose() {
    // TODO 2025-04-08 jeremboo:
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */

  async animateIn() {
    // return this.camera.moveTo(CameraPosition.FadeIn);
  }

  async animateOut() {
    // return this.camera.moveTo(CameraPosition.FadeOut, 0, true);
  }
}
