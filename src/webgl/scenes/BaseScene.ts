import type { WebGLRenderer } from 'three';
import { Scene } from 'three';

import type { Scenes } from '~types/enum';
import type { AssetProps } from '~webgl/managers/assetManager';
import assetManager from '~webgl/managers/assetManager';
import preloadGpu from '~webgl/utils/preloadGPU';

import Camera from '../components/Camera';

interface BaseSceneProps {
  id: Scenes;
  assets?: AssetProps[];
}

export default class BaseScene {
  readonly id: Scenes;
  readonly assets: AssetProps[] = [];
  readonly renderer: WebGLRenderer;

  readonly camera: Camera;
  readonly scene = new Scene();

  protected isInit = false;

  constructor(renderer: WebGLRenderer, { id, assets }: BaseSceneProps) {
    this.id = id;
    this.assets = assets ?? [];
    this.renderer = renderer;

    this.camera = new Camera();
    this.scene.add(this.camera);
  }

  /**
   * * *******************
   * * LOADING CYCLE
   * * *******************
   */

  async init() {
    if (this.isInit) return;
    this.isInit = true;
    await this.load();
    await this.onAfterAssetLoad();
    preloadGpu(this.renderer, this.scene, this.camera.camera);
  }

  private async load() {
    return assetManager.load(...this.assets);
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
