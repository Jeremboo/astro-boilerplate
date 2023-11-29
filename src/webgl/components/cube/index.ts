import { Box, Mesh, type OGLRenderingContext, Program } from 'ogl';

import { rotation } from '~store/webgl';

import fragment from './frag.glsl';
import vertex from './vert.glsl';

class Cube extends Mesh {
  rotationSpeed: number;

  constructor(gl: OGLRenderingContext) {
    super(gl, { geometry: new Box(gl), program: new Program(gl, { vertex, fragment }) });

    this.rotationSpeed = rotation.get();

    rotation.subscribe(this.handleRotationUpdate);
  }

  handleRotationUpdate = (_rotation: number) => {
    this.rotationSpeed = _rotation;
  };

  update() {
    this.rotation.x += this.rotationSpeed;
    this.rotation.y += this.rotationSpeed;
  }
}

export default Cube;
