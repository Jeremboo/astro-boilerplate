import { map } from 'nanostores';

type Props = {
  isErrorMessageVisible: boolean;
  errorMessage: string;
};

export const $error = map<Props>({
  isErrorMessageVisible: false,
  errorMessage: ''
});

/*
 * * *******************
 * * ACTIONS
 * * *******************
 */

export const showErrorMessage = (message: string) => {
  // batch updates
  $error.set({
    isErrorMessageVisible: true,
    errorMessage: message
  });
};

export const hideErrorMessage = () => {
  $error.setKey('isErrorMessageVisible', false);
};
