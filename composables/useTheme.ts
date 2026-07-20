/**
 * Theme preference, shared across pages and persisted across reloads.
 *
 * The site is prerendered for static hosting, so every HTML file is built with no cookie
 * present and always says "light". The theme therefore cannot come from SSR. Instead:
 *
 *  1. An inline script in nuxt.config sets `<html class="dark">` before first paint.
 *  2. Tailwind `dark:` variants style the page from that class — no Vue involvement.
 *  3. This composable resolves the same value on the client and keeps the class in sync,
 *     so the toggle and the shader colors follow one source of truth.
 *
 * An absent cookie means "no explicit choice yet", which is distinct from a cookie of
 * `false`. Only the former falls back to the OS setting — so toggling to light and
 * reloading stays light, even on a machine set to dark.
 */
export const useTheme = () => {
  const choice = useCookie<boolean | null>('theme-dark', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  const isDark = useState('theme-dark', () => false)
  const ready = useState('theme-ready', () => false)

  // Applied directly rather than through a watcher: a watcher created in component setup
  // is disposed when that component unmounts, which would stop the class updating after
  // navigating between pages.
  const apply = (dark: boolean) => document.documentElement.classList.toggle('dark', dark)

  if (import.meta.client && !ready.value) {
    ready.value = true
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    isDark.value = choice.value ?? media.matches
    apply(isDark.value)

    // Keep following the OS until the visitor makes an explicit choice.
    media.addEventListener('change', (e) => {
      if (choice.value === null) {
        isDark.value = e.matches
        apply(isDark.value)
      }
    })
  }

  return computed({
    get: () => isDark.value,
    set: (dark: boolean) => {
      isDark.value = dark
      choice.value = dark
      if (import.meta.client) apply(dark)
    },
  })
}
