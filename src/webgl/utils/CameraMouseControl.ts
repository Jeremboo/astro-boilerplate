import { type Camera, Euler, Quaternion, Vector2 } from 'three';

interface CameraMouseControlOptions {
  amplitude?: Vector2;
  velocity?: Vector2;
}

export default class CameraMouseControl {
  private camera: Camera;
  public amplitude: Vector2;
  public velocity: Vector2;
  private baseQuaternion: Quaternion;

  private targetRotation = new Vector2(0, 0);
  private currentRotation = new Vector2(0, 0);
  private offsetQuaternion = new Quaternion();
  private eulerHelper = new Euler(0, 0, 0, 'XYZ');

  constructor(camera: Camera, { amplitude = new Vector2(), velocity = new Vector2() }: CameraMouseControlOptions = {}) {
    this.camera = camera;
    this.amplitude = amplitude;
    this.velocity = velocity;

    this.baseQuaternion = this.camera.quaternion.clone();

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.update = this.update.bind(this);

    document.body.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove(event: MouseEvent) {
    const nx = event.clientX / window.innerWidth - 0.5;
    const ny = event.clientY / window.innerHeight - 0.5;
    this.targetRotation.y = -nx * this.amplitude.x;
    this.targetRotation.x = -ny * this.amplitude.y;
  }

  public update() {
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * this.velocity.y;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * this.velocity.x;

    this.eulerHelper.set(this.currentRotation.x, this.currentRotation.y, 0);
    this.offsetQuaternion.setFromEuler(this.eulerHelper);

    this.camera.quaternion.copy(this.baseQuaternion).multiply(this.offsetQuaternion);
  }
}
