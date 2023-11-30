import { useStore } from '@nanostores/preact';
import { useCallback } from 'preact/hooks';

import type { Languages } from '~data/enum';
import { PageNames } from '~data/enum';
import { getI18nCopy } from '~data/i18n';
import { decreaseRotation, increaseRotation, rotation } from '~store/webgl';

type Props = { lang: Languages };

export default function Controls({ lang }: Props) {
  const $rotation = useStore(rotation);
  const { increase, decrease } = getI18nCopy(lang)[PageNames.Index];

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
            {decrease}
          </button>
        </li>
        <li>
          <button class="m-1 rounded bg-secondary px-3 py-1" onClick={handleIncrease}>
            {increase}
          </button>
        </li>
      </ul>
    </div>
  );
}
