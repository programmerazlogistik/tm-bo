import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

/**
 * Format date to DD/MM/YYYY HH:mm
 * @param {string} dateString
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", {
      locale: idLocale,
    });
  } catch (error) {
    return "-";
  }
};

/**
 * Format activity type
 * @param {string} activity - "CREATE" | "UPDATE"
 * @returns {string}
 */
export const formatActivity = (activity) => {
  if (activity === "CREATE") return "Create";
  if (activity === "UPDATE") return "Update";
  return activity;
};

/**
 * Format promo type
 * @param {string} type - "DOMESTIC" | "INTERNATIONAL" | "BOTH"
 * @returns {string}
 */
export const formatPromoType = (type) => {
  if (type === "DOMESTIC") return "Muatparts Domestik";
  if (type === "INTERNATIONAL") return "Muatparts Internasional";
  if (type === "BOTH") return "Muatparts Domestik, Muatparts Internasional";
  return type;
};
