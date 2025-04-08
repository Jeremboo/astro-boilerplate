import { type Camera, Vec2, Vec3 } from 'ogl';
import { isMobile, isTablet } from 'react-device-detect';

import { $webgl } from '~store/webgl';

import subscribeKeys from '../../utils/subscribe-keys';

/**
 * * CAMERA MOUSE CONTROL
 * Perspective effect on the scene with the mouse
 */
export default class CameraMouseControl {
  camera: Camera;

  mouseMove = [1, 1];
  velocity = [0.1, 0.1];

  lookAt = new Vec3();
  position = new Vec2();
  initialPosition = new Vec2();

  constructor(camera: Camera) {
    // Init camera
    this.camera = camera;
    this.position.set(this.camera.position.x, this.camera.position.y);
    this.initialPosition.set(this.camera.position.x, this.camera.position.y);

    if (!isMobile && !isTablet) {
      document.body.addEventListener('mousemove', this.handleMouseMove);
    }

    subscribeKeys($webgl, ['mouseControlAmpl', 'mouseControlVel'], this.handleWebglPropsChange);
  }

  handleWebglPropsChange = ({
    mouseControlAmpl,
    mouseControlVel
  }: {
    mouseControlAmpl: number[];
    mouseControlVel: number[];
  }) => {
    this.mouseMove = mouseControlAmpl ?? this.mouseMove;
    this.velocity = mouseControlVel ?? this.velocity;
  };

  handleMouseMove = (event: MouseEvent) => {
    this.position.x = this.initialPosition.x + (event.clientX / window.innerWidth - 0.5) * this.mouseMove[0];
    this.position.y = this.initialPosition.x - (event.clientY / window.innerHeight - 0.5) * this.mouseMove[1];
  };

  update() {
    this.camera.position.x += (this.position.x - this.camera.position.x) * this.velocity[0];
    this.camera.position.y += (this.position.y - this.camera.position.y) * this.velocity[1];
    this.camera.lookAt(this.lookAt);
  }
}
