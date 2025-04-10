import { AmbientLight, AnimationAction, AnimationMixer, DirectionalLight } from "three";

import assets from './assets';
import BaseScene from "../BaseScene";
import { Scenes } from '~webgl/managers/sceneManager';
import assetManager from "~webgl/managers/assetManager";
import type { GLTF } from "three/examples/jsm/Addons.js";

export default class MainScene extends BaseScene {
  private readonly cameraAnimationMixer: AnimationMixer;
  private cameraClipAction: AnimationAction | null = null;

  constructor() {
    super({
      id: Scenes.Main,
      assets
    });

    this.cameraAnimationMixer = new AnimationMixer(this.camera)

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(3, 3, -3);
    this.scene.add(directionalLight);
  }

  async onAfterAssetLoad() {
      // Import the main scene from the  assets
      const mainRoomAsset = assetManager.get(this.id, 'mainRoom')?.data as GLTF | undefined;
      if (mainRoomAsset) {
        this.scene.add(...mainRoomAsset.scene.children.filter((child) => {
          return child.type !== 'PerspectiveCamera';
        }));

        // Bind the camera and its animation from the GLF file
        this.camera.copy(mainRoomAsset.cameras[0]);
        this.cameraClipAction = this.cameraAnimationMixer.clipAction(mainRoomAsset.animations[0]);
        this.cameraClipAction.play();

        console.log('this.scene', this.scene);

        // TODO 2025-04-10 jeremboo: fix that
        this.resize(window.innerWidth, window.innerHeight);

      } else {
        throw new Error(`onAfterAssetLoad(), the asset in ${this.id}, mainRoom doesn't exist`);
      }
  }

  update(delta: number) {
    this.cameraAnimationMixer.update(delta);
  }
}