// https://github.com/nanostores/nanostores#guide
import { action, map, type StoreValue } from 'nanostores';

import { deepCopy } from '~utils/index';

export type WebglStore = StoreValue<typeof $webgl>;
export type WebglStoreKeys = keyof WebglStore;

export const $webgl = map({
  mouseControlAmpl: [-5, -5],
  mouseControlVel: [0.02, 0.04],
  rotation: 0.01
});

// NOTE 2023-12-26 jeremboo: To make typescript happy, I need to pass to map(the real object). So I'm doing this copy after
const defaultSnapshot = deepCopy($webgl.get());

export const setWebglProps = action($webgl, 'setWebglProps', (store, key: WebglStoreKeys, newValue: any) => {
  store.setKey(key, newValue);
});

export const resetWebgl = action($webgl, 'ResetAll', (store) => {
  store.set(deepCopy(defaultSnapshot));
});

export const increaseRotation = action($webgl, 'increaseRotation', (store, add) => {
  store.setKey('rotation', store.get().rotation + add);
  return store.get().rotation;
});

export const decreaseRotation = action($webgl, 'decreaseRotation', (store, add) => {
  store.setKey('rotation', store.get().rotation - add);
  return store.get().rotation;
});
