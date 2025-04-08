# Astro Starter Kit

## Tools and Documentations

Front-end tools :

- [Astro](https://docs.astro.build) : TODO
- [Preact]() via [Astro-preact](): Litter (4kb) and more performant version of React.
- [Tailwind CSS]() via [Astro-tailwind](): TODO
- [Nanostores](https://github.com/nanostores/nanostores) : tiny (1kb) state manager (compared to Redux or Zustand) and [recommended by Astro](https://docs.astro.build/en/core-concepts/sharing-state/)

Dev tools :

- [Astro-compress](https://github.com/astro-community/AstroCompress) : Unofficial but compress images/html/js/css...
- [Astro-favicons](https://github.com/ACP-CODE/astro-favicons#readme) : Unofficial but generate favicons using [favicons](https://github.com/itgalaxy/favicons)...
- [ESLint]() : TODO
- [Prettier]() : TODO
- [seng-generator]() : TODO

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── webgl-ogl
│       └── index.ts
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run host`            | Starts local dev server visible along your IP    |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run template`        | Generate components or pages                     |
| `npm run pretty`          | Parse all files to execute prettier on it        |

## Optional tools ??

- [Bowser](https://github.com/bowser-js/bowser) : A small, fast and rich-API browser/platform/engine detector for both browser and node. (+5kB) [See jam3 implementation](https://github.com/Experience-Monks/nextjs-boilerplate/blob/main/src/utils/detect.ts)
- [default-passive-events](https://www.npmjs.com/package/default-passive-events) :
- [js-cookie](https://github.com/js-cookie/js-cookie#readme) : A simple, lightweight JavaScript API for handling cookies
- [nanoid](https://www.npmjs.com/package/nanoid) : Generate unique ID (+130bytes)
- [Astro-imagetools](https://astro-imagetools-docs.vercel.spa/en/components/Img): I removed it because it wasn't well maintained.
- Use [Sharp](https://www.npmjs.com/package/sharp) if Astro-compress is not good : Node.js module to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions. If Astro-imagetools or Astro-compress isn't good. See: https://docs.astro.build/en/reference/image-service-reference/
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) instead of [Nanostores](https://github.com/nanostores/nanostores) for bigger state management system
- [WebVitals](https://www.npmjs.com/package/web-vitals)
- [nanostores/persists]() to install to save values in the local storage

## Inspiration

- https://github.com/ixartz/Astro-boilerplate/tree/main
- https://github.com/Experience-Monks/nextjs-boilerplate/tree/main
- https://github.com/lilnasy/react-router-astro

## Troubleshooting

## Best Practices

- Nanostore: It is better to not use atomicState if we have to update multiple states at the same time. If it's the case, they should be mapped together

## TODO

- Persistent data (nanostore persist)
- make sure all files are compressed on build time
- Clear package.json
- Animation transition between Static & SPA pages and Static pages (ViewTransition)
- wouter with localization : https://github.com/molefrog/wultra/blob/main/src/components/RouteWithLocale.tsx
- fix pas d'import cleaning c'est pas normal
- preload the font into the <head> to avoid flickering on page transition
- meta data per page
- menu in one component

- Animation for webgl
- Ogl particles : https://github.com/oframe/ogl/blob/master/examples/frustum-culling.html
- Ogl post processing : https://github.com/oframe/ogl/blob/master/examples/post-bloom.html


# DONE

- Animation transition for SPA pages
  - https://github.com/preactjs/preact/issues/92#issuecomment-236365058
  - https://stackoverflow.com/questions/64402930/how-can-i-create-a-page-transition-with-preact
- wouter animate out before moving out the SPA
- Fix aria-hidden error messages about focus (check aria-modal ?)