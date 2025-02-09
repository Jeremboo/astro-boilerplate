import type { OGLRenderingContext } from 'ogl';
import { Camera, Renderer, Transform } from 'ogl';
import { isMobile } from 'react-device-detect';

import { CAMERA_POSITION_Z } from '~data/webgl';
import raf from '~utils/raf';
import Cube from '~webgl/components/cube';
import Stars from '~webgl/components/stars';

import CameraMouseControl from './utils/CameraMouseControl';

export default class Webgl {
  renderer: Renderer;
  gl: OGLRenderingContext;

  camera: Camera;
  mouseControl: CameraMouseControl;

  scene: Transform;
  cube: Cube;
  stars: Stars;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer({ dpr: 2, canvas, alpha: true });
    this.gl = this.renderer.gl;

    this.camera = new Camera(this.gl, { fov: 35 });
    this.camera.position.set(0, 0, CAMERA_POSITION_Z);
    this.camera.lookAt([0, 0, 0]);

    this.mouseControl = new CameraMouseControl(this.camera);

    this.scene = new Transform();
    this.cube = new Cube(this.gl);
    this.cube.setParent(this.scene);
    this.stars = new Stars(this.gl, {
      nbrOfStars: 100,
      scalarMin: CAMERA_POSITION_Z * 0.5,
      scalarMax: CAMERA_POSITION_Z - 1,
      opacityMax: 1,
      speed: 0.005,
      rotationSpeed: 0.0002
    });

    this.stars.setParent(this.scene);

    // Add into the loop
    raf.add(this.update);

    // TODO 2024-01-07 jeremboo: Put this somewhere else
    if (import.meta.env.DEV) {
      import(`../editor/index.ts`).then(({ bindWebgl }) => {
        bindWebgl(this);
      });
    }
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.perspective({ aspect: width / height });
  }

  update = (delta: number) => {
    if (!isMobile) {
      this.mouseControl.update();
    }
    this.stars.update();
    this.cube.update();
    this.renderer.render({ scene: this.scene, camera: this.camera });
  };

  dispose() {
    // TODO 2023-11-17 jeremboo:
  }
}
