import type { ContainerApi } from '@tweakpane/core';
import { SpotLightHelper, Vector3 } from 'three';

import type OrbitalSpotlight from '~webgl/components/OrbitalSpotlight';

import BaseEditor from './BaseEditor';

export default class OrbitalSpotlightEditor extends BaseEditor<OrbitalSpotlight> {
  props = {
    offset: { x: 0, y: 0, z: 0 }
  };

  helper: SpotLightHelper;

  constructor(target: OrbitalSpotlight, paneWrapper: ContainerApi) {
    super(target, paneWrapper, { title: 'OrbitalLight', expanded: false });

    this.helper = new SpotLightHelper(this.target.spotlight);

    this.props.offset = this.target.props.offset.clone();
    this.addBindings();
  }

  addBindings() {
    this.folder.addButton({ title: 'Log props' }).on('click', () => {
      console.log('Props OrbitalSpotlight :', JSON.stringify(this.target.props, null, 2));
    });
    this.folder
      .addBinding(this.target.props, 'distance', { min: 0, max: 2, step: 0.001, label: 'distance' })
      .on('change', (ev) => {
        this.target.setDistance(ev.value);
        this.helper.update();
      });

    this.folder
      .addBinding(this.target.props, 'rotation', { min: 0, max: Math.PI * 2, step: 0.001, label: 'rotation' })
      .on('change', (ev) => {
        this.target.setRotation(ev.value);
        this.helper.update();
      });

    this.folder
      .addBinding(this.target.props, 'yPosition', { min: 0, max: 3, step: 0.001, label: 'y' })
      .on('change', (ev) => {
        this.target.setYPosition(ev.value);
        this.helper.update();
      });

    this.folder.addBinding(this.props, 'offset', { label: 'offset', step: 0.001 }).on('change', () => {
      this.target.setOffset(new Vector3(this.props.offset.x, this.props.offset.y, this.props.offset.z));
      this.helper.update();
    });

    this.folder.addBinding(this.target.props, 'intensity', { min: 0, max: 5, step: 0.01 }).on('change', (ev) => {
      this.target.setIntensity(ev.value);
      this.helper.update();
    });

    this.folder.addBinding(this.target.props, 'color', { view: 'color' }).on('change', (ev) => {
      this.target.setColor(ev.value);
      this.helper.update();
    });

    this.folder.addBinding(this.target.props, 'angle', { min: 0, max: Math.PI / 2, step: 0.001 }).on('change', (ev) => {
      this.target.setAngle(ev.value);
      this.helper.update();
    });

    // this.folder.addBinding(this.target.props, 'penumbra', { min: 0, max: 1, step: 0.01 }).on('change', (ev) => {
    //   this.target.setPenumbra(ev.value);
    //   this.helper.update();
    // });

    this.folder.addBinding(this.target.props, 'decay', { min: 0, max: 2, step: 0.01 }).on('change', (ev) => {
      this.target.setDecay(ev.value);
      this.helper.update();
    });

    this.folder.addBinding(this.target.props, 'lightDistance', { min: 0, max: 10, step: 0.01 }).on('change', (ev) => {
      this.target.setLightDistance(ev.value);
      this.helper.update();
    });

    this.folder
      .addBinding(this.target.spotlight.shadow, 'intensity', { min: 0, max: 1, step: 0.01, label: 'shadow' })
      .on('change', (ev) => {
        this.target.spotlight.shadow.intensity = ev.value;
        this.helper.update();
      });

    this.folder
      .addBinding(this.target.spotlight.shadow, 'radius', { min: 0, max: 10, step: 0.01, label: 'shadow radius' })
      .on('change', (ev) => {
        this.target.spotlight.shadow.radius = ev.value;
        this.helper.update();
      });
  }
}
