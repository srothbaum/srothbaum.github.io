<template>
  <NuxtPage />
</template>

<style>
/* Document background, so overscroll/rubber-band areas match the theme too.
   Set on <html> because the `dark` class lands there before first paint. */
html {
  background-color: #fff;
}

html.dark {
  background-color: #000;
}
</style>
