import type { Mesh } from 'three';
import { SpotLight, Vector3 } from 'three';

export type OrbitalSpotlightProps = {
  distance: number;
  rotation: number;
  yPosition: number;
  offset: Vector3;
  intensity: number;
  angle: number;
  penumbra: number;
  decay: number;
  lightDistance: number;
  color: string;
  shadow: number;
};

export type OptionalOrbitalSpotlightProps = Partial<OrbitalSpotlightProps>;

export default class OrbitalSpotlight {
  public spotlight: SpotLight;
  public targetMesh: Mesh;

  props: OrbitalSpotlightProps = {
    distance: 1.135,
    rotation: 4.249,
    yPosition: 1.8,
    offset: new Vector3(0, 0.02, 0),

    intensity: 3,
    angle: 0.635,
    penumbra: 0,
    decay: 0,
    lightDistance: 5,
    color: '#ffffff',
    shadow: 0.3
  };

  constructor(targetMesh: Mesh, orbitProps: OptionalOrbitalSpotlightProps) {
    this.targetMesh = targetMesh;

    Object.assign(this.props, orbitProps);

    this.spotlight = new SpotLight(0xffffff, this.props.intensity);
    this.spotlight.angle = this.props.angle;
    this.spotlight.penumbra = this.props.penumbra;
    this.spotlight.decay = this.props.decay;
    this.spotlight.distance = this.props.lightDistance;
    this.spotlight.color.set(this.props.color);

    this.spotlight.castShadow = true;
    this.spotlight.shadow.bias = -0.0001;
    this.spotlight.shadow.normalBias = 0.02;
    this.spotlight.shadow.mapSize.width = 1024;
    this.spotlight.shadow.mapSize.height = 1024;
    this.spotlight.shadow.intensity = this.props.shadow;
    this.spotlight.shadow.camera.near = 0.01;
    // this.spotlight.shadow.camera.far = 50;
    this.spotlight.shadow.radius = 2;
    // this.spotlight.shadow.blurSamples = 25;

    this.updateSpotlightPosition();
    this.updateSpotlightProperties();
  }

  updateSpotlightPosition() {
    const x = this.targetMesh.position.x + this.props.distance * Math.cos(this.props.rotation);
    const z = this.targetMesh.position.z + this.props.distance * Math.sin(this.props.rotation);
    const y = this.targetMesh.position.y + this.props.yPosition;
    this.spotlight.position.set(x, y, z);

    const targetPosition = new Vector3().copy(this.targetMesh.position).add(this.props.offset);
    this.spotlight.target.position.copy(targetPosition);
  }

  updateSpotlightProperties() {
    this.spotlight.intensity = this.props.intensity;
    this.spotlight.angle = this.props.angle;
    this.spotlight.penumbra = this.props.penumbra;
    this.spotlight.decay = this.props.decay;
    this.spotlight.distance = this.props.lightDistance;
  }

  setDistance(distance: number) {
    this.props.distance = distance;
    this.updateSpotlightPosition();
  }

  setRotation(rotation: number) {
    this.props.rotation = rotation;
    this.updateSpotlightPosition();
  }

  setYPosition(yPosition: number) {
    this.props.yPosition = yPosition;
    this.updateSpotlightPosition();
  }

  setOffset(offset: Vector3) {
    this.props.offset.copy(offset);
    this.updateSpotlightPosition();
  }

  setIntensity(intensity: number) {
    this.props.intensity = intensity;
    this.updateSpotlightProperties();
  }

  setAngle(angle: number) {
    this.props.angle = angle;
    this.updateSpotlightProperties();
  }

  setPenumbra(penumbra: number) {
    this.props.penumbra = penumbra;
    this.updateSpotlightProperties();
  }

  setDecay(decay: number) {
    this.props.decay = decay;
    this.updateSpotlightProperties();
  }

  setLightDistance(lightDistance: number) {
    this.props.lightDistance = lightDistance;
    this.updateSpotlightProperties();
  }

  setColor(color: string) {
    this.props.color = color;
    this.spotlight.color.set(color);
  }
}
