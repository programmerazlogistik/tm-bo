// Promo types
export const PROMO_TYPES = {
  DOMESTIC: "Muatparts Domestik",
  INTERNATIONAL: "Muatparts Internasional",
};

// Validation messages
export const VALIDATION_MESSAGES = {
  EMPTY_FIELDS: "Terdapat field yang kosong",
  EMPTY_LANGUAGE_FIELDS: (languageName) =>
    `Terdapat field yang kosong untuk bahasa ${languageName}`,
  MAX_WORDING_LENGTH: (languageUrl) =>
    `Maksimal Wording(${languageUrl}) 5000 Karakter`,
  INVALID_DATE_RANGE:
    "Tanggal mulai tidak boleh lebih besar dari tanggal akhir",
};

// Field limits
export const MAX_WORDING_LENGTH = 5000;

// Initial form state
export const INITIAL_FORM_STATE = {
  startDate: null,
  endDate: null,
  type: [],
  userType: [],
  translations: {},
  urlRedirect: "",
  isActive: false,
};

// Success messages
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: "Data berhasil disimpan",
};

// Error messages
export const ERROR_MESSAGES = {
  SAVE_ERROR: "Gagal menambahkan promo subscribe",
};
