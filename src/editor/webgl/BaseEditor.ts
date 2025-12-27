import type { ContainerApi } from '@tweakpane/core';
import type { FolderParams } from 'tweakpane';

export type UpdateFct = (...args: any[]) => void;

export default class BaseEditor<T> {
  folder: ContainerApi;

  target: T;
  targetUpdate: UpdateFct;

  constructor(target: T, paneWrapper: ContainerApi, folderParams?: FolderParams) {
    this.folder = folderParams ? paneWrapper.addFolder(folderParams) : paneWrapper;

    this.target = target;
    // NOTE 2025-04-17 jeremboo: Only work if there is an update function
    this.targetUpdate = this.cacheTargetFunction('update');
  }

  cacheTargetFunction(fctName: string) {
    if (
      // @ts-ignore
      typeof this.target[fctName] !== 'function' &&
      // @ts-ignore
      typeof (this[fctName] as unknown) === 'function'
    ) {
      // console.error(`BaseEditor::cacheTargetFunction function name ${fctName} not found.`);
      return;
    }
    // @ts-ignore
    const ftc = this.target[fctName].bind(this.target);
    // @ts-ignore
    this.target[fctName] = this[fctName].bind(this);
    return ftc;
  }

  update(...args: any) {
    this.targetUpdate(args);
  }
}
