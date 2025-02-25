import type { I18n } from '~assets/i18n/i18n';
import { ROUTES, type RouteKeys } from '~data/routing';
import { type Languages } from '~types/enum';

export async function getI18nCopy(lang: Languages) {
  const copy = await import(`../assets/i18n/${lang}.json`);
  return copy as I18n;
}

export function getI18nUrl(lang: Languages, routeKey: RouteKeys = 'home') {
  return ROUTES[routeKey].path;
}

// export function getLangFromUrl(url: URL) {
//   const [, lang] = url.pathname.split('/');
//   if (lang in Languages) return lang as keyof typeof Languages;
//   return defaultLang;
// }

export function replaceDynamicValues(copy: string, values: string[]) {
  const newCopy = copy && values.reduce((accumulator, value) => accumulator.replace('#', value), copy);
  return newCopy;
}

export function addReturn(copy: string) {
  return copy.replaceAll('|', '\n');
}
