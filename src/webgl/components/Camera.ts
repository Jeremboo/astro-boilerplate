import { Object3D, PerspectiveCamera, Vector2, Vector3 } from 'three';

import CameraMouseControl from '~webgl/utils/CameraMouseControl';


// TODO 2025-04-08 jeremboo: Improve that please
const fov = 65;
const near = 0.1;
const far = 10;

/**
 * * *******************
 * * CAMERA CLASS
 * * *******************
 */
export default class Camera extends Object3D {
  public readonly camera: PerspectiveCamera;
  public readonly mouseControl: CameraMouseControl;

  props = {
    mouseMove: new Vector2(1, 1),
    velocity: new Vector2(0.1, 0.1)
  };

  constructor() {
    super();

    this.camera = new PerspectiveCamera(fov, 1, near, far);
    this.add(this.camera);
    // this.camera.add(audioManager.listener);

    this.mouseControl = new CameraMouseControl(this.camera, {
      amplitude: this.props.mouseMove,
      velocity: this.props.velocity
    });
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  update(delta: number) {
    // this.mouseControl.update();
  }

  // bindAssetCameraAnimation(assetCamera: PerspectiveCamera, animation: AnimationClip) {
  //   // const cachedAspect = this.aspect;
  //   // this.copy(assetCamera);
  //   this.name = assetCamera.name;
  //   // this.aspect = cachedAspect;

  //   // this.camera.far = 10000; // BUG ABOUT the camera scale is updated because of the animation mixer
  //   this.camera.updateProjectionMatrix();
  //   this.animationAction = this.animationMixer.clipAction(animation);
  //   this.animationAction.play();
  //   this.animationDuration = animation.duration;

  //   // HACK 2025-04-30 jeremboo: For the camera to be positioned on the path
  //   this.update(0);
  // }

  // https://stackoverflow.com/questions/27409074/converting-3d-position-to-2d-screen-position-r69
  getProjectedPosition(pos: Vector3) {
    return pos.clone().project(this.camera);
  }
}