import { PerspectiveCamera, Vector3 } from 'three';


// TODO 2025-04-08 jeremboo: Improve that please
const fov = 65;
const near = 0.1;
const far = 100;

/**
 * * *******************
 * * CAMERA CLASS
 * * *******************
 */
export default class Camera extends PerspectiveCamera {

  constructor() {
    super(fov, 1, near, far);
  }

  resize(width: number, height: number) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }

  // /**
  //  * * *******************
  //  * * GUI
  //  * * *******************
  //  */
  // createGui(guiParent: GUI) {
  //   const gui = guiParent.addFolder('Camera');

  //   const PROPS = {
  //     zoomIn: () => {
  //       this.position.multiplyScalar(1.1);
  //     },
  //     zoomOut: () => {
  //       this.position.multiplyScalar(0.9);
  //     },
  //   };
  //   gui.add(PROPS, 'zoomOut');
  //   gui.add(PROPS, 'zoomIn');

  //   // Position
  //   const POS_RANGE = 450;
  //   gui
  //     .add(this.fixedPosition, 'x', -POS_RANGE, POS_RANGE)
  //     .listen()
  //     .step(0.001)
  //     .onChange(() => {
  //       this.lookAt(this.target);
  //     })
  //     .name('posX');
  //   gui
  //     .add(this.fixedPosition, 'y', -POS_RANGE, POS_RANGE)
  //     .listen()
  //     .step(0.001)
  //     .onChange(() => {
  //       this.lookAt(this.target);
  //     })
  //     .name('posY');
  //   gui
  //     .add(this.fixedPosition, 'z', -POS_RANGE, POS_RANGE)
  //     .listen()
  //     .step(0.001)
  //     .onChange(() => {
  //       this.lookAt(this.target);
  //     })
  //     .name('posZ');

  //   // TARGET
  //   const TARGET_RANGE = 25;
  //   gui
  //     .add(this.target, 'x', -TARGET_RANGE, TARGET_RANGE)
  //     .listen()
  //     .step(0.001)
  //     .onChange(() => {
  //       this.lookAt(this.target);
  //     })
  //     .name('targetX');
  //   gui
  //     .add(this.target, 'y', -TARGET_RANGE, TARGET_RANGE)
  //     .listen()
  //     .step(0.001)
  //     .onChange(() => {
  //       this.lookAt(this.target);
  //     })
  //     .name('targetY');
  //   gui
  //     .add(this.target, 'z', -TARGET_RANGE, TARGET_RANGE)
  //     .listen()
  //     .step(0.001)
  //     .onChange(() => {
  //       this.lookAt(this.target);
  //     })
  //     .name('targetZ');
  // }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */

  // Animate the values without updating the camera position. All it dones into update
  // moveTo(cameraPositionID: CameraPositionID, delay: number = 0, isFadeOut = false) {
  //   const ease = isFadeOut ? 'Power2.easeIn' : CUSTOM_EASING;
  //   return new Promise(resolve => {
  //     const camPos = this.getCameraPositionFromId(cameraPositionID);
  //     if (camPos) {
  //       const { position, target, duration = 1 } = camPos;
  //       TweenLite.to(this.target, duration, { ...target, ease, delay });
  //       TweenLite.to(this.fixedPosition, duration, {
  //         ...position,
  //         ease,
  //         delay,
  //         onComplete: resolve,
  //       });
  //     } else {
  //       resolve();
  //     }
  //   });
  // }

  // https://stackoverflow.com/questions/27409074/converting-3d-position-to-2d-screen-position-r69
  getProjectedPosition(pos: Vector3) {
    return pos.clone().project(this);
  }

}