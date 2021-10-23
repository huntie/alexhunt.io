/**
 * The mobile-up responsive breakpoint widths for the site in px.
 */
export const breakpoints = {
  sm: 480,
  md: 768,
};

/**
 * Entry point for postcss-custom-media.
 */
export const getCustomMediaConfig = () => ({
  customMedia: Object.entries(breakpoints).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ['--breakpoint-' + key]: `(min-width: ${value}px)`,
    }),
    {},
  ),
});
