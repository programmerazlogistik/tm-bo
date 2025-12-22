/**
 * Maps form data to API payload format
 * @param {Object} formData - The form data object
 * @returns {Object} The formatted payload for API
 */
export const mapFormDataToPayload = (formData) => {
  // TODO: Implement actual mapping based on API requirements
  const { translations, ...restData } = formData;

  return {
    ...restData,
    translations: Object.values(translations),
  };
};

/**
 * Gets active user type options from API data
 * @param {Object} userTypesData - User types data from API
 * @returns {Array} Formatted options array
 */
export const getUserTypeOptions = (userTypesData) => {
  if (!userTypesData?.Data) return [];

  return userTypesData.Data.filter((item) => item.isActive).map((item) => ({
    label: item.description,
    value: item.code,
  }));
};

/**
 * Updates a translation field for a specific language
 * @param {Object} formData - Current form data
 * @param {Object} language - Language object
 * @param {string} field - Field name to update
 * @param {any} value - New value
 * @returns {Object} Updated translations object
 */
export const updateTranslation = (formData, language, field, value) => {
  return {
    ...formData.translations,
    [language.url]: {
      ...formData.translations[language.url],
      languageId: language.id,
      languageCode: language.url,
      [field]: value,
    },
  };
};
