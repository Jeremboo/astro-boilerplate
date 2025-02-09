// https://github.com/nanostores/nanostores#guide
import { map, type StoreValue } from 'nanostores';

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

export const setWebglProps = (key: WebglStoreKeys, newValue: any) => {
  $webgl.setKey(key, newValue);
};

export const resetWebgl = () => {
  $webgl.set(deepCopy(defaultSnapshot));
};

export const increaseRotation = (increment = 1) => {
  $webgl.setKey('rotation', $webgl.get().rotation + increment);
};

export const decreaseRotation = (increment = 1) => {
  $webgl.setKey('rotation', $webgl.get().rotation - increment);
};
