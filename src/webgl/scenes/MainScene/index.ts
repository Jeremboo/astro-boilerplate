import assets from './assets';
import BaseScene from "../BaseScene";
import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshPhysicalMaterial } from "three";
import { Scenes } from '~webgl/managers/sceneManager';


export default class MainScene extends BaseScene {
  private cube: Mesh;

  constructor() {
    super({
      id: Scenes.Main,
      assets
    });

    this.camera.position.set(3, 3, 3);
    this.camera.lookAt(0, 0, 0);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(3, 3, -3);
    this.scene.add(directionalLight);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshPhysicalMaterial({ color: 0xffffff });
    this.cube = new Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  async onAfterAssetLoad() {
      // Import the main scene from the  assets
      // const mainRoomAsset = assetManager.get(this.id, 'mainRoom')?.data;
      // if (mainRoomAsset) {
      //   this.scene.add(mainRoomAsset as Group);
      // } else {
      //   reject(`onAfterAssetLoad(), the asset in ${this.id}, mainRoom doesn't exist`);
      // }
  }

  update() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }
}