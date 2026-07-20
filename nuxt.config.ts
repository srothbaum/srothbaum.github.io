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
        { name: 'description', content: 'Seth Rothbaum — ML researcher. Research, experience, and contact.' },
        { property: 'og:title', content: 'Seth Rothbaum' },
        { property: 'og:description', content: 'Seth Rothbaum — ML researcher. Research, experience, and contact.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://srothbaum.github.io/' },
        { name: 'twitter:card', content: 'summary' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/sr.svg' },
        { rel: 'canonical', href: 'https://srothbaum.github.io/' },
      ],
    },
  },
})
