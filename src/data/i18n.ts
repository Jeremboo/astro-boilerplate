import { Languages, PageNames } from './enum';

export const defaultLang = Languages.en;

// TODO 2023-11-19 jeremboo: Put this into public/i18n.json
// TODO 2023-11-19 jeremboo: Find a default or dummy option
const i18n = {
  [Languages.en]: {
    name: 'En',
    // Meta
    locale: 'en',
    locale_region: 'en-ca',
    site_name: 'Astro boilerplate',
    // Content
    mainTitle: 'Welcome to',
    [PageNames.Index]: {
      title: 'Welcome to Astro',
      description: 'Boilerplate built with Astro using Preact, Tailwind CSS and more',
      thisis: 'This is the page',
      goTo: 'Go to',
      increase: 'Increase',
      decrease: 'Decrease'
    },
    [PageNames.About]: {
      title: 'About Astro',
      description: 'Boilerplate built with Astro using Preact, Tailwind CSS and more',
      thisis: 'This is the page',
      goTo: 'Go to'
    }
  },
  [Languages.fr]: {
    name: 'Fr',
    // Meta
    locale: 'fr',
    locale_region: 'fr-ca',
    site_name: 'Astro boilerplate',
    // Content
    mainTitle: 'Bienvenue à',
    [PageNames.Index]: {
      title: 'Bienvenue à Astro',
      description: `Boilerplate équipé d'Astro, Preact, Tailwind CSS et plus encore.`,
      thisis: 'Voici la page',
      goTo: 'Aller à la page',
      increase: 'Augmenter',
      decrease: 'Réduire'
    },
    [PageNames.About]: {
      title: `A Propos d'Asto Boilerplate`,
      description: `Boilerplate équipé d'Astro, Preact, Tailwind CSS et plus encore.`,
      thisis: 'Voici la page',
      goTo: 'Aller à la page'
    }
  }
};

export function getI18nCopy(lang: Languages) {
  return i18n[lang];
}

export function getI18nUrl(lang: Languages, path: string) {
  return lang === Languages.en ? path : `/${lang}${path}`;
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in Languages) return lang as keyof typeof Languages;
  return defaultLang;
}
