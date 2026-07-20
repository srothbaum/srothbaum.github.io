// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  // Emits a fully static site into .output/public, plus the .nojekyll and 404.html
  // that GitHub Pages needs. Repo is srothbaum.github.io (a user site), so it is
  // served from the domain root and needs no baseURL prefix.
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/research'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Seth Rothbaum',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Seth Rothbaum - ML Researcher' },
        { property: 'og:title', content: 'Seth Rothbaum' },
        { property: 'og:description', content: 'Seth Rothbaum - ML Researcher' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://srothbaum.github.io/' },
        // Absolute URL is required — scrapers do not resolve relative paths.
        { property: 'og:image', content: 'https://srothbaum.github.io/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'seth.cv' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://srothbaum.github.io/og.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/sr.svg' },
        { rel: 'canonical', href: 'https://srothbaum.github.io/' },
      ],
      // Applies the theme before first paint. Pages are prerendered with no cookie, so
      // without this the site would always paint light and only correct itself later.
      // Must stay in step with composables/useTheme.ts: an explicit cookie wins, and an
      // absent one falls back to the OS setting.
      script: [
        {
          innerHTML:
            "try{var m=document.cookie.match(/(?:^|;\\s*)theme-dark=(true|false)/);" +
            "var d=m?m[1]==='true':matchMedia('(prefers-color-scheme: dark)').matches;" +
            "if(d)document.documentElement.classList.add('dark')}catch(e){}",
          tagPosition: 'head',
        },
      ],
    },
  },
})
