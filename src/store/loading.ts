import { map } from 'nanostores';

type Props = {
  isLoading: boolean;
  isMainLoadingDone: boolean;
  fileName: string;
  message: string;
};

export const $loading = map<Props>({
  isLoading: true,
  isMainLoadingDone: false,
  fileName: '',
  message: ''
});

/*
 * * *******************
 * * ACTIONS
 * * *******************
 */

export const toggleLoading = (isLoading: boolean) => {
  $loading.setKey('isLoading', isLoading);
};

export const setMainLoadingDone = () => {
  $loading.setKey('isMainLoadingDone', true);
};

export const setProgress = (fileName: string, message: string) => {
  const { isLoading, isMainLoadingDone } = $loading.get();
  $loading.set({
    isLoading,
    isMainLoadingDone,
    fileName,
    message
  });
};
