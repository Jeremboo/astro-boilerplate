/* eslint-disable */
// @ts-nocheck
import { Pane } from 'tweakpane';
import { $webgl } from '~store/webgl';
import type Webgl from '../webgl';

// TODO 2024-01-09 jeremboo: Create a PR for this and add props in it
const pane = new Pane({ title: 'Debug Panel', expanded: false });
pane.containerElem_.style.zIndex = '9999';
pane.containerElem_.style.right = '15px';
pane.containerElem_.style.top = '50px';
pane.containerElem_.style.opacity = '0.1';
pane.containerElem_.style.transition = 'opacity 0.2s';
pane.containerElem_.addEventListener('mouseenter', () => {
  pane.containerElem_.style.opacity = '1';
});
pane.containerElem_.addEventListener('mouseleave', () => {
  pane.containerElem_.style.opacity = '0.1';
});

const Props = {
  showParticles: false
};

/*
 * * *******************
 * * 3D VISUALIZED
 * * *******************
 */

const mouseFolder = pane.addFolder({ title: 'Mouse controls', expanded: false });
const particlesFolder = pane.addFolder({ title: 'Particles', expanded: false });

const debugProps = {};
const gui = {};

const addBinding = (
  key: string,
  props = debugProps,
  options = {},
  callback?: (key: string, value: any) => void,
  folder = undefined
) => {
  gui[key] = (folder || pane).addBinding(props, key as never, { ...options }).on('change', (ev) => {
    if (callback) {
      callback(key, ev.value);
    } else {
      $webgl.setKey(key, ev.value);
    }
  });
};

$webgl.subscribe((props) => {
  Object.keys(props).forEach((key) => {
    const notExistsYet = debugProps[key] === undefined;
    debugProps[key] = props[key];
    if (notExistsYet) {
      switch (key) {
        case 'mouseControlAmpl': {
          addBinding('0', debugProps[key], { label: 'ampl-x', min: -20, max: -1 }, undefined, mouseFolder);
          addBinding('1', debugProps[key], { label: 'ampl-y', min: -20, max: -1 }, undefined, mouseFolder);
          break;
        }
        case 'mouseControlVel': {
          addBinding('0', debugProps[key], { label: 'vel-x', min: 0.01, max: 0.1 }, undefined, mouseFolder);
          addBinding('1', debugProps[key], { label: 'vel-y', min: 0.01, max: 0.1 }, undefined, mouseFolder);
          break;
        }
        default: {
          pane.addBinding(debugProps, key).on('change', (ev) => {
            $webgl.setKey(key, ev.value);
          });
          break;
        }
      }
    }
  });
  pane.refresh();
});

/*
 * * *******************
 * * Album & particles
 * * *******************
 */

export function bindWebgl(webglApp: Webgl) {
  // TODO 2025-02-07 jeremboo: For what is it for ?
}
