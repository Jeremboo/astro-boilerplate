import type BaseScene from "../scenes/BaseScene";
import type { WebGLRenderer } from "three";

export enum Scenes {
  Main = 'MainScene'
}

const SCENES: { [key in Scenes]: { props: {}}} = {
  [Scenes.Main]: { props: {} }
}

export default class SceneManager {
  private readonly renderer: WebGLRenderer
  private scenes: { [key in Scenes]?: BaseScene } = {}

  currentScene?: BaseScene;

  constructor(renderer: WebGLRenderer) {
    this.renderer = renderer;
  }

  async loadScene(sceneId: Scenes) {
    let scene = this.scenes[sceneId] ?? undefined;
    if (scene === undefined) {
      const { props } = SCENES[sceneId];
      // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      const cls = (await import(`../scenes/${sceneId}/index.ts`))?.default;
      if (cls === undefined) {
        throw new Error(`Scene ${sceneId} not found`);
      }
      scene = new cls(props);
    }
    await scene?.init(this.renderer);
    return scene;
  }

  async setScene(sceneId: Scenes) {
    const results = await Promise.all([
      this.currentScene?.animateOut(),
      this.loadScene(sceneId)
    ]);
    this.currentScene = results[1];
    this.currentScene?.animateIn();
  }

  resize(width: number, height: number) {
    this.currentScene?.resize(width, height);
  }

  update(delta: number) {
    if (!this.currentScene) return;
    this.currentScene.update(delta);
    this.renderer.render(this.currentScene.scene, this.currentScene.camera);
  }
}