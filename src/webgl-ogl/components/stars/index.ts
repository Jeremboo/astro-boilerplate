import { Box, InstancedMesh, type OGLRenderingContext, Program, Vec3 } from 'ogl';

import { randomFloat } from '~utils/index';

import fragment from './frag.glsl';
import vertex from './vert.glsl';

// https://github.com/oframe/ogl/blob/master/examples/instancing.html
// https://github.com/Jeremboo/scribble-lab/blob/master/modules/Stars.js
export default class Stars extends InstancedMesh {
  t = 0;
  speed: number;
  rotationSpeed: Vec3;

  isOrientationAnimationAllowed = false;

  constructor(
    gl: OGLRenderingContext,
    {
      nbrOfStars = 300,
      depthWrite = false,
      opacityMin = 0,
      opacityMax = 0.75,
      scalarMin = 2,
      scalarMax = 10,
      rotationSpeed = 0,
      speed = 0.01
    } = {}
  ) {
    const positionAttribute = new Float32Array(nbrOfStars * 3);
    // TODO 2023-12-20 jeremboo: In one attribute to be more performant
    const scaleAttribute = new Float32Array(nbrOfStars * 1);
    const rotationAttribute = new Float32Array(nbrOfStars * 1);
    const opacityAttribute = new Float32Array(nbrOfStars * 1);

    for (let i = 0; i < nbrOfStars; i++) {
      const scalar = randomFloat(scalarMin, scalarMax);
      positionAttribute.set(
        [
          Math.random() * Math.sign(Math.random() - 0.5) * scalar,
          Math.random() * Math.sign(Math.random() - 0.5) * scalar,
          Math.random() * Math.sign(Math.random() - 0.5) * scalar
        ],
        i * 3
      );
      scaleAttribute.set([randomFloat(0.03, 0.05)], i);
      rotationAttribute.set([Math.PI * Math.random() * 2], i);
      opacityAttribute.set([randomFloat(opacityMin, opacityMax)], i);
    }

    const geometry = new Box(gl, {
      attributes: {
        _offset: { instanced: 1, size: 3, data: positionAttribute },
        _scale: { instanced: 1, size: 1, data: scaleAttribute },
        _rotation: { instanced: 1, size: 1, data: rotationAttribute },
        _opacity: { instanced: 1, size: 1, data: opacityAttribute }
      }
    });

    super(gl, {
      geometry,
      program: new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          time: { value: 0 }
        },
        transparent: true
      })
    });

    this.speed = speed;
    this.rotationSpeed = new Vec3(
      randomFloat(-rotationSpeed, rotationSpeed),
      randomFloat(-rotationSpeed, rotationSpeed),
      randomFloat(-rotationSpeed, rotationSpeed)
    );

    // TODO 2023-12-21 jeremboo: Check how to test the depth
    this.program.depthWrite = depthWrite;
  }

  /*
   * * *******************
   * * UPDATE
   * * *******************
   */

  update = () => {
    this.t += this.speed;
    this.program.uniforms.time.value = this.t;
    this.rotation.x += this.rotationSpeed.x;
    this.rotation.y += this.rotationSpeed.y;
    this.rotation.z += this.rotationSpeed.z;
  };
}
