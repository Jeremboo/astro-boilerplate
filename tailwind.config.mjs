// function figmaRescaler(size) {
//   return size * (1440 / 1728);
// }

// function pxToRem(px) {
//   return `${figmaRescaler(px) * 0.1}rem`;
// }

// // NOTE 2023-11-16 jeremboo: Use it to easily convert fontSize from Figma to your code
// function fontSize(fontSizePx, lineHeightPercent, letterSpacing, fontWeight = 400, withRescaler = true) {
//   const recalculatedFontSizePx = withRescaler ? figmaRescaler(fontSizePx) : fontSizePx;
//   return [
//     // NOTE 2023-12-01 jeremboo: This is not 16 because I reset font-size to 10px in html
//     `${recalculatedFontSizePx / 10}rem`,
//     {
//       lineHeight: (lineHeightPercent || 100) / 100,
//       letterSpacing: `${recalculatedFontSizePx * letterSpacing * 0.01}px`,
//       fontWeight
//     }
//   ];
// }

function createZIndexList(keys) {
  return keys.reduce((acc, key, idx) => {
    return Object.assign(acc, { [key]: idx + 1 });
  }, {});
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    // https://night-tailwindcss.vercel.app/docs/customizing-colors
    colors: {
      // Static colors
      transparent: 'transparent',
      white: '#ffffff',
      whiteTransparent: 'rgba(255, 255, 255, 0.4)',
      black: '#000000',
      blackTransparent: 'rgba(0, 0, 0, 0.4)',
      // Dynamic/Theme colors (who can be updated)
      primary: 'var(--primary-color)',
      secondary: 'var(--secondary-color)',
      background: `var(--background-color)`
    },
    fontSize: {},
    transitionDuration: {
      base: '200ms',
      long: '500ms'
    },
    fontFamily: {
      sans: ['Cabin', 'CenturyGothic', 'AppleGothic', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      code: [
        'Menlo',
        'Monaco',
        'Lucida Console',
        'Liberation Mono',
        'DejaVu Sans Mono',
        'Bitstream Vera Sans Mono',
        'Courier New',
        'monospace'
      ]
    },
    screens: {
      // Orientation
      landscape: { raw: '(orientation: landscape)' }
    },
    extend: {
      // eslint-disable-next-line prefer-object-spread
      zIndex: Object.assign(
        {
          webgl: -1
        },
        createZIndexList(['toggle', 'menu', 'nav', 'debug', 'popup', 'error', 'landscape'])
      ),
      transitionDelay: {
        0: '0ms'
      },
      minWidth: {},
      maxWidth: {},
      gridTemplateColumns: {}
    }
  },
  plugins: []
};
