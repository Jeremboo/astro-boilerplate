import type { ContainerApi } from '@tweakpane/core';

import type CameraMouseControl from '~webgl/utils/CameraMouseControl';

import BaseEditor from './BaseEditor';

export default class CameraMouseControlEditor extends BaseEditor<CameraMouseControl> {
  constructor(target: CameraMouseControl, paneWrapper: ContainerApi) {
    super(target, paneWrapper);

    this.folder.addBinding(this.target.amplitude, 'x', { label: 'amplX', min: 0, max: 0.3, step: 0.05 });
    this.folder.addBinding(this.target.amplitude, 'y', { label: 'amplY', min: 0, max: 0.3, step: 0.005 });

    this.folder.addBinding(this.target.velocity, 'x', { label: 'velX', min: 0.01, max: 0.1, step: 0.002 });
    this.folder.addBinding(this.target.velocity, 'y', { label: 'velY', min: 0.01, max: 0.1, step: 0.002 });
  }
}
