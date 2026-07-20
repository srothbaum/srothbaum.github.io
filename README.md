# srothbaum.github.io

Personal site — Nuxt 3 + Tailwind, with a WebGL dithering shader
([@paper-design/shaders](https://github.com/paper-design/shaders)).

Live at <https://srothbaum.github.io/>.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run generate   # static site → .output/public
npx serve .output/public   # preview the built site
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs
`npm run generate` and publishes `.output/public` to GitHub Pages.

## Layout

| Path | Purpose |
| --- | --- |
| `pages/index.vue` | Landing page — bio, experience, links |
| `pages/research.vue` | Research listing |
| `components/DitheringShader.vue` | Vue wrapper around the shader's `ShaderMount` |
| `composables/useTheme.ts` | Light/dark preference, stored in a cookie |
| `public/sr.svg` | Favicon |
