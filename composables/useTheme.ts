/**
 * Theme preference, shared across pages and persisted across reloads.
 *
 * The site is prerendered for static hosting, so every HTML file is built with no cookie
 * present and always says "light". The theme therefore cannot come from SSR. Instead:
 *
 *  1. An inline script in nuxt.config sets `<html class="dark">` before first paint.
 *  2. Tailwind `dark:` variants style the page from that class — no Vue involvement.
 *  3. This composable re-reads the real cookie on the client and keeps the class in sync,
 *     so the toggle and the shader colors follow the same source of truth.
 */
export const useTheme = () => {
  const pref = useCookie<boolean>('theme-dark', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  if (import.meta.client) {
    // The prerendered value is always false; correct it from the actual cookie.
    const stored = /(?:^|;\s*)theme-dark=true/.test(document.cookie)
    if (pref.value !== stored) pref.value = stored

    watch(
      pref,
      (dark) => document.documentElement.classList.toggle('dark', !!dark),
      { immediate: true },
    )
  }

  return pref
}
