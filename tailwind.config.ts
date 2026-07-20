import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  // Theme is driven by a `dark` class on <html>, set before first paint by the inline
  // script in nuxt.config. Static hosting prerenders with no cookie, so the theme cannot
  // come from SSR — it has to be applied by CSS, not by Vue re-rendering after hydration.
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
}
