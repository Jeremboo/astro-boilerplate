import { action, map } from 'nanostores';

type Props = {
  isErrorMessageVisible: boolean;
  errorMessage: string;
};

export const $error = map<Props>({
  isErrorMessageVisible: false,
  errorMessage: ''
});

export const showErrorMessage = action($error, 'showErrorMessage', (store, message) => {
  // batch updates
  store.set({
    isErrorMessageVisible: true,
    errorMessage: message
  });
});

export const hideErrorMessage = action($error, 'hideErrorMessage', (store) => {
  store.setKey('isErrorMessageVisible', false);
});
