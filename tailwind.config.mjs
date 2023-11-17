// NOTE 2023-11-16 jeremboo: Easily setup fontSize from Figma for instance
function fontSize(fontSizePx, lineHeightPx, letterSpacing, fontWeight) {
  return [
    `${fontSizePx / 16}rem`,
    {
      lineHeight: lineHeightPx && lineHeightPx / fontSizePx,
      letterSpacing,
      fontWeight
    }
  ];
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    // NOTE 2023-11-16 jeremboo: Check .src/styles/global.css
    // https://night-tailwindcss.vercel.app/docs/customizing-colors
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--white-color)',
      black: 'var(--black-color)',
      primary: 'var(--primary-color)',
      secondary: 'var(--secondary-color)',
      background: 'var(--background-color)'
    },
    fontSize: {
      h1: fontSize(56, 60),
      h2: fontSize(50, 60),
      h3: fontSize(24, 30),
      h4: fontSize(20, 26),
      base: fontSize(14, 21),
      small: fontSize(12, 18)
    },
    fontFamily: {
      sans: ['Century Gothic', 'CenturyGothic', 'AppleGothic', 'sans-serif'],
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
    extend: {}
  },
  plugins: []
};
