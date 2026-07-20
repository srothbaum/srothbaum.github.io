<script setup lang="ts">
// Shared with index.vue; persisted so it survives reloads. See composables/useTheme.ts.
const isDarkMode = useTheme()

useHead({ title: 'Research - Seth Rothbaum' })

const research: {
  title: string
  venue: string
  year: string
  summary: string
  href?: string
}[] = [
  {
    title: 'Banach Space Perceptrons',
    venue: 'In progress',
    year: '2026',
    summary: 'Formal extension of perceptron theory to Banach space with reflexive and nonreflexive examples.',
  },
  {
    title: 'KRAB: Analytical Predictions for Fused and Unfused Kernels',
    venue: 'In progress',
    year: '2026',
    summary: 'Predicts kernel fusion for architectures and corrects general analytical primitives for modeling fused and unfused kernels.',
  },
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
        <!-- Both icons always render; CSS picks one. A v-if on the theme would differ from
             the prerendered markup and cause a hydration mismatch. -->
        <svg class="hidden dark:block" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <svg class="block dark:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      <div class="mb-12">
        <h1 class="mb-8 text-lg font-normal">
          <NuxtLink to="/" class="hover:underline">seth.cv</NuxtLink>
        </h1>
        <div class="mb-8">
          <h2 class="text-lg font-normal">RESEARCH</h2>
        </div>
      </div>

      <div class="mb-12 space-y-6">
        <div v-for="item in research" :key="item.title">
          <div class="flex flex-wrap items-baseline gap-x-4">
            <component
              :is="item.href ? 'a' : 'span'"
              :href="item.href"
              :class="item.href ? 'hover:underline' : ''"
            >{{ item.title }}</component>
            <span class="opacity-60">{{ item.venue }}</span>
            <span class="opacity-60">{{ item.year }}</span>
          </div>
          <p class="mt-1 leading-relaxed opacity-80">{{ item.summary }}</p>
        </div>
      </div>

      <div class="mt-auto flex space-x-4 pt-8 font-mono text-lg">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
      </div>
    </div>

    <!-- Background matches the shader's colorBack so there is no white flash before the canvas paints. -->
    <div class="relative h-[50vh] w-full bg-white md:h-auto md:min-h-screen md:w-1/2 dark:bg-black">
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
