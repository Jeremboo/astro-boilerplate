import { Box, Mesh, type OGLRenderingContext, Program } from 'ogl';

import { $webgl, type WebglStore } from '~store/webgl';
import subscribeKeys from '~utils/subscribe-keys';

import fragment from './frag.glsl';
import vertex from './vert.glsl';

class Cube extends Mesh {
  rotationSpeed = $webgl.get().rotation;

  constructor(gl: OGLRenderingContext) {
    super(gl, { geometry: new Box(gl), program: new Program(gl, { vertex, fragment }) });

    subscribeKeys($webgl, ['rotation'], this.handleRotationUpdate);
  }

  handleRotationUpdate = ({ rotation }: WebglStore) => {
    this.rotationSpeed = rotation;
  };

  update() {
    this.rotation.x += this.rotationSpeed;
    this.rotation.y += this.rotationSpeed;
  }
}

export default Cube;
