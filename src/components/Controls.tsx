import { useStore } from '@nanostores/preact';
import { useCallback } from 'preact/hooks';

import { decreaseRotation, increaseRotation, rotation } from '~store/webgl';

type Props = {};

export default function Controls({}: Props) {
  const $rotation = useStore(rotation);

  const handleIncrease = useCallback(() => {
    increaseRotation(0.01);
  }, []);
  const handleDecrease = useCallback(() => {
    decreaseRotation(0.01);
  }, []);

  return (
    <div class="absolute inset-x-5 bottom-5">
      <p class="w-full text-center font-bold">Current rotation : {$rotation}</p>
      <ul class="mt-2 flex justify-center">
        <li>
          <button class="m-1 rounded bg-secondary px-3 py-1" onClick={handleDecrease}>
            {'d'}
          </button>
        </li>
        <li>
          <button class="m-1 rounded bg-secondary px-3 py-1" onClick={handleIncrease}>
            {'i'}
          </button>
        </li>
      </ul>
    </div>
  );
}
