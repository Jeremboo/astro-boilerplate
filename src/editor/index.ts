import type Webgl from '~webgl/index';

import { pane, tabActions, tabProps } from './pane';
import urlParamsManager from './utils/urlParamsManager';
import WebglEditor from './webgl/WebglEditor';

class Editor {
  isVisible = urlParamsManager.get('editor', false);

  webgl?: WebglEditor;

  constructor() {
    tabActions.addButton({ title: 'Dispose Debugs' }).on('click', this.dispose);

    this.toggle(this.isVisible);

    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'e') {
        this.toggle();
      }
    });
  }

  addWebgl(webglApp: Webgl) {
    if (this.webgl) {
      console.log('ERROR: WebglEditor already bound');
      return;
    }

    this.webgl = new WebglEditor(webglApp, tabProps);
    this.webgl.toggle(this.isVisible);
  }

  handleResize = () => {};

  toggle(isVisible = !this.isVisible) {
    this.isVisible = isVisible;
    pane.hidden = !this.isVisible;
    this.webgl?.toggle(this.isVisible);
  }

  dispose = () => {
    pane.dispose();
    this.webgl?.dispose();
  };
}

export default new Editor();
