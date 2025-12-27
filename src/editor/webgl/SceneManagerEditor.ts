import type { ContainerApi } from '@tweakpane/core';
import urlParamsManager from 'editor/utils/urlParamsManager';
import type { WebGLRenderer } from 'three';
import { MeshBasicMaterial, PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { Scenes } from '~types/enum';
import type SceneManager from '~webgl/managers/sceneManager';
import type BaseScene from '~webgl/scenes/BaseScene';
import type MainScene from '~webgl/scenes/MainScene';

import BaseEditor from './BaseEditor';
import MainSceneEditor from './MainSceneEditor';
import SceneEditor from './SceneEditor';

export const SCENE_MAP = {
  [Scenes.Main]: MainSceneEditor
};

export type ScenesEditor = { [key in Scenes]?: SceneEditor<BaseScene> | MainSceneEditor };

export default class SceneManagerEditor extends BaseEditor<SceneManager> {
  renderer: WebGLRenderer;
  scenes: ScenesEditor;

  debugCamera: PerspectiveCamera;
  orbitControls: OrbitControls;

  webglElement: HTMLCanvasElement;
  cachedWebglElementStyleZIndex?: string;

  wireFrameMaterial = new MeshBasicMaterial({ color: 0x000000, wireframe: true });

  targetResize: (width: number, height: number) => void;

  props = {
    debugView: false,
    helpers: false,
    wireframe: false
  };

  lastCameraSaveTime = Date.now();

  cachedLockedOnceDebugView = false;

  constructor(sceneManager: SceneManager, paneWrapper: ContainerApi) {
    super(sceneManager, paneWrapper, { title: 'Scenes', expanded: true });

    this.renderer = this.target.editorGetRenderer();
    this.targetResize = this.cacheTargetFunction('resize');

    this.debugCamera = new PerspectiveCamera(65, 1, 0.1, 100);
    this.debugCamera.position.set(0, 3, 5);
    this.webglElement = document.getElementsByClassName('z-webgl')[0] as HTMLCanvasElement;
    this.cachedWebglElementStyleZIndex = this.webglElement.style.zIndex;
    if (!(this.webglElement instanceof HTMLElement)) {
      throw new Error("L'élément '.z-webgl' n'est pas un HTMLElement.");
    }
    this.orbitControls = new OrbitControls(this.debugCamera, this.webglElement);
    this.orbitControls.enabled = false;
    this.getDebugCameraPosition();

    urlParamsManager.addSyncedBinding(this.folder, this.props, 'debugView', this.toggleDebugView);
    urlParamsManager.addSyncedBinding(this.folder, this.props, 'helpers', this.toggleHelpers);
    urlParamsManager.addSyncedBinding(this.folder, this.props, 'wireframe', this.toggleWireframe);

    this.scenes = Object.values(this.target.editorGetScenes()).reduce((acc, scene) => {
      acc[scene.id] = SCENE_MAP[scene.id]
        ? new SCENE_MAP[scene.id](scene as MainScene, this.folder)
        : new SceneEditor(scene, this.folder);
      return acc;
    }, {} as ScenesEditor);

    if (this.props.debugView) this.toggleDebugView();
    if (this.props.helpers) this.toggleHelpers();
    if (this.props.wireframe) this.toggleWireframe();
  }

  toggleDebugView = () => {
    this.orbitControls.enabled = this.props.debugView;
    const currentScene = this.target.currentScene && this.scenes[this.target.currentScene.id];
    if (currentScene) {
      currentScene.toggleDebugView(this.props.debugView);
    }
    this.debugCamera.updateProjectionMatrix();

    this.webglElement.style.zIndex = this.props.debugView ? '9999' : this.cachedWebglElementStyleZIndex ?? '';
  };

  toggleHelpers = () => {
    const sceneEditor = this.target.currentScene && this.scenes[this.target.currentScene.id];
    if (sceneEditor) {
      sceneEditor.toggleHelpers(this.props.helpers);
    }
  };

  toggleWireframe = () => {
    if (this.target.currentScene) {
      this.target.currentScene.scene.overrideMaterial = this.props.wireframe ? this.wireFrameMaterial : null;
    }
  };

  resize(width: number, height: number) {
    this.debugCamera.aspect = width / height;
    this.debugCamera.updateProjectionMatrix();
    this.targetResize(width, height);
  }

  getDebugCameraPosition() {
    const orbitParam = urlParamsManager.get('orbit', []);
    if (orbitParam) {
      try {
        const [px, py, pz, tx, ty, tz, zoom] = orbitParam.map(Number);
        if ([px, py, pz, tx, ty, tz, zoom].every((v) => typeof v === 'number')) {
          this.orbitControls.position0.set(px, py, pz);
          this.orbitControls.target0.set(tx, ty, tz);
          this.orbitControls.zoom0 = zoom;
          this.orbitControls.reset();
        }
      } catch (e) {
        console.warn('ERROR copying the orbit', e);
        urlParamsManager.remove('orbit');
      }
    }
  }

  saveCameraPosition() {
    this.orbitControls.saveState();
    urlParamsManager.set(
      'orbit',
      JSON.stringify([
        this.orbitControls.position0.x.toFixed(3),
        this.orbitControls.position0.y.toFixed(3),
        this.orbitControls.position0.z.toFixed(3),
        this.orbitControls.target0.x.toFixed(3),
        this.orbitControls.target0.y.toFixed(3),
        this.orbitControls.target0.z.toFixed(3),
        this.orbitControls.zoom0.toFixed(3)
      ])
    );
  }

  update(delta: number) {
    if (this.props.debugView && this.target.currentScene) {
      this.target.currentScene.update(delta);
      this.renderer.render(this.target.currentScene.scene, this.debugCamera);

      // Throttle the orbit saving
      if (!this.lastCameraSaveTime || Date.now() - this.lastCameraSaveTime > 250) {
        this.saveCameraPosition();
        this.lastCameraSaveTime = Date.now();
      }
    } else if (this.targetUpdate) {
      this.targetUpdate(delta);
    }
  }
}
