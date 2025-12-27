import type { WebGLRenderer } from 'three';

import { Scenes } from '~types/enum';

import type BaseScene from '../scenes/BaseScene';

export type SceneList = { [key in Scenes]?: BaseScene };

const SCENES: { [key in Scenes]: { props: {} } } = {
  [Scenes.Main]: { props: {} }
};

export default class SceneManager {
  private readonly renderer: WebGLRenderer;
  private scenes: SceneList = {};

  currentScene?: BaseScene;

  constructor(renderer: WebGLRenderer) {
    this.renderer = renderer;
  }

  async loadScene(sceneId: Scenes) {
    let scene = this.scenes[sceneId] ?? undefined;
    if (scene === undefined) {
      const { props } = SCENES[sceneId];
      // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      const Cls = (await import(`../scenes/${sceneId}/index.ts`))?.default;
      if (Cls === undefined) {
        throw new Error(`Scene ${sceneId} not found`);
      }
      scene = new Cls(this.renderer, props);
    }
    await scene?.init();
    this.scenes[sceneId] = scene;
    return scene;
  }

  async setScene(sceneId: Scenes) {
    const [none, loadedScene] = await Promise.all([this.currentScene?.animateOut(), this.loadScene(sceneId)]);
    this.currentScene = loadedScene;
    this.currentScene?.animateIn();
  }

  resize(width: number, height: number) {
    this.currentScene?.resize(width, height);
  }

  update(delta: number) {
    if (!this.currentScene) return;
    this.currentScene.update(delta);
    this.renderer.render(this.currentScene.scene, this.currentScene.camera.camera);
  }

  /*
   * * *******************
   * * EDITOR
   * * *******************
   */

  editorGetRenderer() {
    return this.renderer;
  }

  editorGetScenes() {
    return this.scenes;
  }
}