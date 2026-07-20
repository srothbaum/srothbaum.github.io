<script setup lang="ts">
// Shared with research.vue; persisted so it survives reloads. See composables/useTheme.ts.
const isDarkMode = useTheme()

const experience: { org: string; role: string; years: string; spaced?: boolean }[] = [
  { org: 'DePrince, Race & Zollo, Inc.', role: 'Intern', years: ' Summer 2023 & 2024' },
  { org: 'Canyon Magnet Energy', role: 'Intern', years: '2024 → 2025' },
  { org: 'The Lexcelerator', role: 'Intern', years: 'Summer 2025' },
  { org: 'Evolution Inc.', role: 'Intern', years: 'Summer 2026' },
  { org: 'University of Pennsylvania', role: '', years: '2023 → 2027', spaced: true },
]

const links = [
  { label: 'GitHub', href: 'https://github.com/srothbaum' },
  { label: 'Email', href: 'mailto:sethroth@wharton.upenn.edu' },
  { label: 'Research', href: '/research' },
]
</script>

<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden md:flex-row">
    <div
      class="relative z-10 flex min-h-screen w-full flex-col bg-white p-8 font-mono text-black md:min-h-0 md:w-1/2 dark:bg-black dark:text-white"
    >
      <button
        class="absolute right-8 top-8 rounded-full p-2 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
        aria-label="Toggle theme"
        @click="isDarkMode = !isDarkMode"
      >
        <svg v-if="isDarkMode" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      <div class="mb-12">
        <h1 class="mb-8 text-lg font-normal">seth.cv</h1>
        <div class="mb-8">
          <h2 class="text-lg font-normal">SETH ROTHBAUM</h2>
          <h3 class="text-lg font-normal">ML RESEARCHER</h3>
        </div>
      </div>

      <div class="mb-12 grid grid-cols-[minmax(0,auto)_auto_auto] justify-start gap-x-6 gap-y-1">
        <div v-for="item in experience" :key="item.org + item.years" class="contents">
          <span :class="{ 'mt-3': item.spaced }">{{ item.org }}</span>
          <span :class="{ 'mt-3': item.spaced }">{{ item.role }}</span>
          <span :class="{ 'mt-3': item.spaced }">{{ item.years }}</span>
        </div>
      </div>

      <div class="mt-auto flex space-x-4 pt-8 font-mono text-lg">
        <span>Links</span>
        <NuxtLink v-for="link in links" :key="link.label" :to="link.href" class="hover:underline">{{ link.label }}</NuxtLink>
      </div>
    </div>

    <div class="relative h-[50vh] w-full md:h-auto md:min-h-screen md:w-1/2">
      <ClientOnly>
        <DitheringShader
          :color-back="isDarkMode ? 'hsl(0, 0%, 0%)' : 'hsl(0,0%,100%)'"
          :color-front="isDarkMode ? 'hsl(320, 100%, 70%)' : 'hsl(220, 100%, 70%)'"
          shape="simplex"
          type="4x4"
          :px-size="3"
          :offset-x="0"
          :offset-y="0"
          :scale="0.8"
          :rotation="0"
          :speed="0.1"
        />
        <!-- Matches DitheringShader's own root element, so hydration finds identical markup. -->
        <template #fallback>
          <div class="h-full w-full" />
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
