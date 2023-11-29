// https://github.com/nanostores/nanostores#guide
import { action, atom } from 'nanostores';

export const rotation = atom(0.01);

// onMount(rotation, () => {
//   // Mount mode
//   return () => {
//     // Disabled mode
//   };
// });

export const increaseRotation = action(rotation, 'increase', (store, add) => {
  store.set(store.get() + add);
  return store.get();
});

export const decreaseRotation = action(rotation, 'decrease', (store, add) => {
  store.set(store.get() - add);
  return store.get();
});
