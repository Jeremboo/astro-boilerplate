import { action, atom } from 'nanostores';

import type { I18n } from '~assets/i18n/i18n';
import { Languages } from '~types/enum';
import { getI18nCopy } from '~utils/i18n';

export const $currentLanguage = atom(Languages.en);

// NOTE 2023-12-05 jeremboo: No need to use deepMap here because we want the whole object being replaced
export const $i18n = atom<{ [key in Languages]?: I18n }>({});

export const setLanguage = action($currentLanguage, 'setLanguage', async (store, lang: Languages) => {
  const i18nClone = $i18n.get();
  if (!i18nClone[lang]) {
    $i18n.set({ ...i18nClone, [lang]: await getI18nCopy(lang) });
  }
  store.set(lang);
});
