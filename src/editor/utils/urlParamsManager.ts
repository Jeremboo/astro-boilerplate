import type { BindingParams, ContainerApi } from '@tweakpane/core';

class URLParamManager {
  params = new URLSearchParams(window.location.search);

  get<T>(key: string, defaultValue: T): T {
    if (!this.params.has(key)) return defaultValue;
    const val = this.params.get(key);
    switch (typeof defaultValue) {
      case 'boolean':
        return (val === 'true') as T;
      case 'number':
        return Number(val) as T;
      case 'string':
        return (val as T) ?? defaultValue;
      default:
        try {
          return (val ? JSON.parse(val) : defaultValue) as T;
        } catch (e) {
          return defaultValue;
        }
    }
  }

  set(key: string, value: any) {
    if (value === false) {
      this.params.delete(key);
    } else {
      this.params.set(key, value);
    }
    window.history.replaceState(null, '', `?${this.params.toString()}`);
  }

  remove(key: string) {
    this.params.delete(key);
    window.history.replaceState(null, '', `?${this.params.toString()}`);
  }

  // TODO 2025-09-10 jeremboo: Add this to a tweakpane plugin
  addSyncedBinding(pane: ContainerApi, props: any, propName: string, callback: any, paneOptions?: BindingParams) {
    props[propName] = this.get(propName, props[propName]);
    const p = pane.addBinding(props, propName, paneOptions).on('change', (...args) => {
      this.set(propName, props[propName]);
      if (callback) callback(...args);
    });

    if (p && p.element) {
      (p.element as HTMLElement).style.fontStyle = 'italic';
      const labelElement = p.element.getElementsByClassName('tp-lblv_l')[0] as HTMLElement;
      if (labelElement) {
        labelElement.style.color = '#beff38';
      }
    }

    return p;
  }
}

export default new URLParamManager();
