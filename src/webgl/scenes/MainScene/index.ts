import type { WebGLRenderer } from 'three';
import { AmbientLight, AnimationAction, AnimationMixer, DirectionalLight } from 'three';

import { AssetType, Scenes } from '~types/enum';
import assetManager from '~webgl/managers/assetManager';

import assets from './assets';
import BaseScene from '../BaseScene';

export default class MainScene extends BaseScene {
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;

  private readonly cameraAnimationMixer: AnimationMixer;
  private cameraClipAction: AnimationAction | null = null;

  constructor(renderer: WebGLRenderer) {
    super(renderer, {
      id: Scenes.Main,
      assets
    });

    this.cameraAnimationMixer = new AnimationMixer(this.camera.camera);

    this.ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);
    this.directionalLight = new DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(3, 3, -3);
    this.scene.add(this.directionalLight);
  }

  async onAfterAssetLoad() {
      // Import the main scene from the  assets
      const mainRoomAsset = (await assetManager.get<AssetType.gltf>('mainRoom'))?.data;
      if (mainRoomAsset) {
        this.scene.add(...mainRoomAsset.scene.children.filter((child) => {
          return child.type !== 'PerspectiveCamera';
        }));

        // Bind the camera and its animation from the GLF file
        this.camera.camera.copy(mainRoomAsset.cameras[0]);
        this.camera.camera.fov = 65;
        this.cameraClipAction = this.cameraAnimationMixer.clipAction(mainRoomAsset.animations[0]);
        this.cameraClipAction.play();

        // TODO 2025-04-10 jeremboo: fix that
        this.resize(window.innerWidth, window.innerHeight);

      } else {
        throw new Error(`onAfterAssetLoad(), the asset in ${this.id}, mainRoom doesn't exist`);
      }
  }

  update(delta: number) {
    this.cameraAnimationMixer.update(delta);
    this.camera.update(delta);
  }
}