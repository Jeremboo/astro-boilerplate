/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      transitionDuration: {
        base: '200ms',
        long: '500ms'
      },
      zIndex: {
        webgl: -1,
        ...Object.fromEntries(
          ['toggle', 'menu', 'nav', 'debug', 'popup', 'error', 'landscape'].map((key, idx) => [key, idx + 1])
        )
      },
      minWidth: {},
      maxWidth: {},
      gridTemplateColumns: {}
    }
  },
  plugins: []
};
