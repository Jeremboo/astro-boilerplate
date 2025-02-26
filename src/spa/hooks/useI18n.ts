import { useStore } from '@nanostores/preact';

import type { I18n } from '~assets/i18n/i18n';
import { $currentLanguage, $i18n } from '~store/i18n';

export default function useI18n() {
  const currentLanguage = useStore($currentLanguage);
  const i18n = useStore($i18n);
  return (i18n[currentLanguage] || {}) as I18n;
}
