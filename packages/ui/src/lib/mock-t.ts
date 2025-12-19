/**
 * Mock translation function for i18n
 * @param {string} key - Translation key
 * @param {Record<string, any>} params - Values to interpolate into template
 * @param {string} fallback - Fallback text if translation not found
 * @returns {string}
 */
export type TranslationFunction = (
  key: string,
  params?: Record<string, any>,
  fallback?: string
) => string;

export const tMockFn: TranslationFunction = (key, params, fallback) => {
  // Mock implementation that mimics the real t function behavior
  // For mock purposes, we don't have a translation object, so return fallback or key
  return fallback || key;
};
