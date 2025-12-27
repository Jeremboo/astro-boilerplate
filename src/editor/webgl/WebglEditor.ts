import type { ContainerApi } from '@tweakpane/core';
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  Color,
  LinearSRGBColorSpace,
  LinearToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
  SRGBColorSpace
} from 'three';

import type Webgl from '~webgl/index';
import Stats, { RenderStatsPosition } from '~webgl/utils/stats';

import BaseEditor from './BaseEditor';
import type SceneEditor from './SceneManagerEditor';
import SceneManagerEditor from './SceneManagerEditor';
import { BACKGROUND_COLOR } from '~data/colors';

export default class WebglEditor extends BaseEditor<Webgl> {
  sceneEditor: SceneEditor;
  stats: Stats;

  frameDebugElement!: HTMLDivElement;

  props = {
    background: BACKGROUND_COLOR
  };

  constructor(webglApp: Webgl, paneWrapper: ContainerApi) {
    super(webglApp, paneWrapper, { title: 'WebGL', expanded: true });

    const colorManagementFolder = this.folder.addFolder({ title: 'ColorManagment', expanded: false });

    this.sceneEditor = new SceneManagerEditor(webglApp.editorGetSceneManager(), this.folder);

    colorManagementFolder.addBinding(this.props, 'background', { label: 'bg' }).on('change', this.handleBgColor);
    colorManagementFolder.addBinding(this.sceneEditor.renderer, 'outputColorSpace', {
      options: {
        LinearSRGBColorSpace,
        SRGBColorSpace
      },
      label: 'ColorSpace'
    });

    colorManagementFolder.addBinding(this.sceneEditor.renderer, 'toneMapping', {
      options: {
        NoToneMapping,
        LinearToneMapping,
        ReinhardToneMapping,
        CineonToneMapping,
        ACESFilmicToneMapping
      },
      label: 'Tone Mapping'
    });

    colorManagementFolder.addBinding(this.sceneEditor.renderer, 'toneMappingExposure', {
      min: 0,
      max: 2,
      step: 0.01,
      label: 'Exposure'
    });

    this.stats = new Stats({
      parent: document.body,
      position: {
        alignment: RenderStatsPosition.BottomLeft,
        x: 0,
        y: 0,
        unit: 'rem'
      }
    });
  }

  handleBgColor = () => {
    this.sceneEditor.renderer.setClearColor(new Color(this.props.background).getHex());
  };

  update(delta: number) {
    this.stats.update(this.sceneEditor.renderer);
    this.targetUpdate(delta);
  }

  dispose() {
    this.stats.dispose();
  }

  toggle(isVisible: boolean) {
    this.stats.toggle(isVisible);
  }
}
