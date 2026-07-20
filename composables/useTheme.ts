/**
 * Theme preference, shared across pages and persisted across reloads.
 *
 * A cookie rather than useState/localStorage: useCookie is readable during SSR, so the
 * server renders the correct theme instead of flashing light before hydration.
 */
export const useTheme = () =>
  useCookie<boolean>('theme-dark', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
