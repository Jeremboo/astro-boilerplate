import type { OGLRenderingContext } from 'ogl';
import { Camera, Orbit, Renderer, Transform } from 'ogl';

import raf from '~utils/raf';
import Cube from '~webgl/components/cube';

class Webgl {
  renderer: Renderer;
  gl: OGLRenderingContext;

  camera: Camera;
  controls: Orbit;

  scene: Transform;
  cube: Cube;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer({ dpr: 2, canvas });
    this.gl = this.renderer.gl;
    this.gl.clearColor(1, 1, 1, 1);

    this.camera = new Camera(this.gl, { fov: 35 });
    this.camera.position.set(0, 1, 7);
    this.camera.lookAt([0, 0, 0]);

    this.controls = new Orbit(this.camera, { element: canvas });

    this.scene = new Transform();
    this.cube = new Cube(this.gl);
    this.cube.setParent(this.scene);

    // Add into the loop
    raf.add(this.update);
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.perspective({ aspect: width / height });
  }

  update = (delta: number) => {
    this.controls.update();
    this.cube.update();
    this.renderer.render({ scene: this.scene, camera: this.camera });
  };

  dispose() {
    // TODO 2023-11-17 jeremboo:
  }
}

export default Webgl;
