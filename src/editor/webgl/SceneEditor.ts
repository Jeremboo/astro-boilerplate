import type { ContainerApi } from '@tweakpane/core';
import { CameraHelper, Group } from 'three';

import type BaseScene from '~webgl/scenes/BaseScene';

import BaseEditor from './BaseEditor';

export default class SceneEditor<T extends BaseScene> extends BaseEditor<T> {
  helpers = new Group();

  cameraHelper: CameraHelper;

  areHelpersVisible = false;

  constructor(scene: T, wrapper: ContainerApi, { autoBind = true } = {}) {
    super(scene, wrapper, { title: scene.id, expanded: true });

    this.cameraHelper = new CameraHelper(this.target.camera.camera);
    this.helpers.add(this.cameraHelper);

    if (autoBind) {
      this.addBindings();
    }
  }

  addBindings() {}

  toggleDebugView(isDebug: boolean) {}

  toggleHelpers(areVisible: boolean) {
    this.areHelpersVisible = areVisible;
    if (areVisible) {
      this.target.scene.add(this.helpers);
    } else {
      this.target.scene.remove(this.helpers);
    }
  }

  update(delta: number) {
    if (this.areHelpersVisible) {
      this.cameraHelper.update();
    }
    this.targetUpdate(delta);
  }
}
