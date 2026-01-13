/**
 * Format number to currency (IDR)
 * @param {number|string} value - The value to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  if (!value && value !== 0) return "";
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numValue);
};

/**
 * Parse currency string to number
 * @param {string} value - Currency string (e.g., "Rp 10.000")
 * @returns {number} Parsed number
 */
export const parseCurrency = (value) => {
  if (!value) return "";
  // Handle case where user might paste or type decimal with comma (Indonesian format)
  // We only want the integer part
  let cleanValue = String(value);
  if (cleanValue.includes(",")) {
    cleanValue = cleanValue.split(",")[0];
  }
  return cleanValue.replace(/[^\d]/g, "");
};

/**
 * Format number with thousand separator
 * @param {number|string} value - The value to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (!value && value !== 0) return "";
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return numValue.toLocaleString("id-ID");
};

/**
 * Parse formatted number to plain number
 * @param {string} value - Formatted number string (e.g., "10.000")
 * @returns {string} Plain number string
 */
export const parseNumber = (value) => {
  if (!value) return "";
  return value.replace(/[^\d]/g, "");
};

/**
 * Maps form data to API payload format
 * @param {Object} formData - The form data object
 * @returns {Object} The formatted payload for API
 */
export const mapFormDataToPayload = (formData) => {
  const coinValue = parseInt(parseNumber(formData.koin), 10) || 0;
  const isUnlimitedCoin = coinValue === 0;

  return {
    name: formData.namaPaket,
    description: formData.deskripsiPaket,
    startDate: formData.mulaiBerlaku,
    period: parseInt(formData.periode, 10),
    price: parseInt(parseCurrency(formData.harga), 10),
    position: parseInt(formData.posisiPaketPembelian, 10),
    isPopular: formData.isPaketPopuler,
    isActive: formData.isActive,
    purchaseLimitEnabled: formData.batasPembelianPaket,
    purchaseQoutaPerUser:
      formData.batasPembelianPaket && formData.kuotaPembelianPerUser
        ? parseInt(formData.kuotaPembelianPerUser, 10)
        : null,
    isUnlimitedCoin: isUnlimitedCoin,
    coinEarned: isUnlimitedCoin ? 0 : coinValue,
    subUserObtained: parseInt(formData.subUserYangDiperoleh, 10) || 0,
  };
};

/**
 * Format date to Indonesian format (dd/MM/yyyy HH:mm)
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
