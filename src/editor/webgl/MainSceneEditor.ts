import type { ContainerApi, FolderApi } from '@tweakpane/core';
import { Color } from 'three';

import type MainScene from '~webgl/scenes/MainScene';

import CameraMouseControlEditor from './CameraMouseControlEditor';
import OrbitalSpotlightEditor from './OrbitalSpotlightEditor';
import SceneEditor from './SceneEditor';

export default class MainSceneEditor extends SceneEditor<MainScene> {
  cameraMouseControlEditor?: CameraMouseControlEditor;
  orbitalSpotLightEditors: OrbitalSpotlightEditor[] = [];

  lightFolder!: FolderApi;

  props = {
    ambientColor: '#ffffff'
  };

  frameDebugElement = document.createElement('div');

  constructor(mainScene: MainScene, paneWrapper: ContainerApi) {
    super(mainScene, paneWrapper, { autoBind: false });

    this.addBindings();

    // Ambient color
    this.lightFolder.addBinding(this.target.ambientLight, 'intensity', {
      title: 'int',
      min: 0,
      max: 1,
      step: 0.01
    });
    this.lightFolder.addBinding(this.props, 'ambientColor', { view: 'color', title: 'col' }).on('change', () => {
      this.target.ambientLight.color = new Color(this.props.ambientColor);
    });
  }

  addBindings() {
    super.addBindings();

    // this.folder.addBinding(this.target.interactiveMeshes.props, 'maxDistance', {
    //   min: 0,
    //   max: 30,
    //   label: 'maxClickDist'
    // });

    // Camera
    const cameraFolder = this.folder.addFolder({ title: 'Camera', expanded: false });
    cameraFolder.addBinding(this.target.camera.camera, 'fov', { min: 0, max: 80 }).on('change', () => {
      this.target.camera.camera.updateProjectionMatrix();
    });
    this.cameraMouseControlEditor = new CameraMouseControlEditor(this.target.camera.mouseControl, cameraFolder);

    // Lights
    this.lightFolder = this.folder.addFolder({ title: 'Lights', expanded: false });
  }

  toggleDebugView(isDebug: boolean) {

  }

  toggleHelpers(areVisible: boolean): void {
    this.frameDebugElement.style.opacity = areVisible ? '1' : '0';
    super.toggleHelpers(areVisible);
  }
}
