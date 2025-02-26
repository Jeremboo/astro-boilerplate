import { useStore } from '@nanostores/preact';
import { useCallback } from 'preact/hooks';

import useI18n from '~spa/hooks/useI18n';
import { $error, hideErrorMessage } from '~store/error';

import Button from './Button';
import Popup from './Popup';

export default function PopupError() {
  const $i18n = useI18n();
  const { isErrorMessageVisible, errorMessage } = useStore($error);

  const handleBack = useCallback(() => {
    hideErrorMessage();
  }, []);

  return (
    <Popup classes="z-error" isVisible={isErrorMessageVisible}>
      <p>{errorMessage}</p>
      <Button isActivatable onClick={handleBack}>
        {$i18n?.cta?.back}
      </Button>
    </Popup>
  );
}
