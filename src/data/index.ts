import { Languages, Pages } from '../types/enum';

export const AUDIO_FILES_URL = `${import.meta.env.BASE_URL}audio/`;

export const PAGES_URL: { [key in Languages]: { [keylang in Pages]: string } } = {
  [Languages.en]: {
    [Pages.home]: `${import.meta.env.BASE_URL}`,
    [Pages.share]: `${import.meta.env.BASE_URL}share`
  },
  [Languages.fr]: {
    [Pages.home]: `${import.meta.env.BASE_URL}fr`,
    [Pages.share]: `${import.meta.env.BASE_URL}fr/partager`
  }
};

export const API_URL = `${import.meta.env.BASE_URL}${import.meta.env.PUBLIC_API}`;
