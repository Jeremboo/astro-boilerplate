import { defineAstroI18nConfig } from 'astro-i18n';

// https://github.com/alexandre-fernandez/astro-i18n
export default defineAstroI18nConfig({
  primaryLocale: 'en',
  secondaryLocales: ['fr'],
  showPrimaryLocale: false,
  translationDirectory: {},
  translations: {
    common: {
      en: {
        meta_title: 'Astro Boilerplate Home',
        meta_description: 'Astro Description',
        main_title: 'Welcome to',
        description: 'Boilerplate built with Astro using Preact, Tailwind CSS and more',
        this_is: 'This is the page',
        go_to: 'Go to',
        current_rotation: 'Current rotation',
        buttons: {
          increase: 'Increase',
          decrease: 'Decrease'
        }
      },
      fr: {
        meta_title: 'Basecode avec Astro',
        meta_description: 'Description de la home page',
        main_title: 'Bienvenue avec',
        description: "Boilerplate équipé d'Astro, Preact, Tailwind CSS et plus encore.",
        this_is: 'Voici la page',
        go_to: 'Aller à la page',
        current_rotation: 'Rotation actuelle',
        buttons: {
          increase: 'Augmenter',
          decrease: 'Réduire'
        }
      }
    },
    // TODO 2023-11-30 jeremboo: How to target the root page ?
    // index: {
    //   en: {
    //     meta_title: 'Astro Boilerplate Home',
    //     meta_description: 'Astro Description'
    //   },
    //   fr: {
    //     meta_title: 'Basecode avec Astro',
    //     meta_description: 'Description de la home page'
    //   }
    // },
    about: {
      en: {
        meta_title: 'Astro Boilerplate About',
        meta_description: 'About astro description'
      },
      fr: {
        meta_title: 'Astro A Props',
        meta_description: 'Description de la page about'
      }
    }
  },
  routes: {
    fr: {
      about: 'a-propos'
    }
  }
});
