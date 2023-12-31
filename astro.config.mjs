import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import compress from 'astro-compress';
import favicons from 'astro-favicons';
import glsl from 'vite-plugin-glsl';
import dotenv from 'dotenv';

dotenv.config();

// NOTE 2023-11-25 jeremboo: Custom Vite.js Plugin to for reloading when any file in the webgl folder is updated
function hotReloadWebgl() {
  return {
    name: 'hotReloadWebgl',
    enforce: 'pre',
    handleHotUpdate({ file, server }) {
      if (file.includes('webgl')) {
        server.ws.send({
          type: 'full-reload',
          path: '*'
        });
      }
    }
  };
}

// https://astro.build/config
// https://docs.astro.build/en/guides/configuring-astro/
const config = {
  server: {
    open: true,
    port: 3000
  },
  vite: {
    plugins: [glsl(), hotReloadWebgl()]
  },
  site: process.env.APP_SITE,
  trailingSlash: 'always',
  // Use to always append '/' at end of url
  // markdown: {
  //   shikiConfig: {
  //     // Choose from Shiki's built-in themes (or add your own)
  //     // https://github.com/shikijs/shiki/blob/main/docs/themes.md
  //     theme: 'monokai',
  //   },
  // },
  integrations: [preact(), tailwind(), sitemap(), robotsTxt(), compress()]
};

/*
 * * *******************
 * * DYNAMIC IMPORT REGARDING NODE_ENV
 * * *******************
 */

const isDevMode = process.env.NODE_ENV === 'development';

if (!isDevMode) {
  config.integrations.push(
    // TODO 2023-11-17 jeremboo: It also generate the files into public/ on build time... Find a way to remove them.
    // TODO 2023-11-29 jeremboo: If some files needs to be i18n. Can't be done here
    // https://github.com/ACP-CODE/astro-favicons/issues/6
    favicons({
      masterPicture: './public/favicon.svg',
      emitAssets: true,
      faviconsDarkMode: true,
      appName: process.env.PUBLIC_APP_NAME,
      appShortName: process.env.PUBLIC_APP_NAME,
      appDescription: process.env.PUBLIC_APP_DESCRIPTION,
      lang: 'en-US',
      background: '#fff',
      theme_color: '#fff'
    })
  );
}

/*
 * * *******************
 * * EXPORT
 * * *******************
 */

export default defineConfig(config);
