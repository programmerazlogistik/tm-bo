/**
 * Enum types for Promo Subscription
 * Based on API Contract - BO PROMO SUBSCRIPTION v2.0.0
 */

/**
 * Status promo subscription
 * Status dihitung secara real-time:
 * - UPCOMING: startDate > current_date
 * - RUNNING: startDate <= current_date AND endDate >= current_date
 * - ENDED: endDate < current_date
 */
export enum PromoStatus {
  UPCOMING = "UPCOMING",
  RUNNING = "RUNNING",
  ENDED = "ENDED",
}

/**
 * Tipe user target promo
 */
export enum UserType {
  NEW_USER = "NEW_USER",
  EXISTING_USER = "EXISTING_USER",
}

/**
 * Tipe promo yang tersedia
 */
export enum PromoType {
  DISCOUNT = "DISCOUNT",
  FREE_COIN = "FREE_COIN",
}

/**
 * Jenis aktivitas pada history log
 */
export enum ActivityType {
  CREATE = "Create",
  UPDATE = "Update",
  CANCEL = "Cancel",
}

/**
 * Tipe aktor yang melakukan perubahan
 */
export enum ActorType {
  ADMIN = "Admin",
  USER = "User",
  SYSTEM = "System",
}

/**
 * Sort order untuk query
 */
export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

/**
 * Field yang dapat digunakan untuk sorting pada list aktif
 */
export enum ActivePromoSortField {
  ID = "id",
  STATUS = "status",
  PACKAGE_NAME = "packageName",
  START_DATE = "startDate",
  END_DATE = "endDate",
  USER_TYPES = "userTypes",
  PROMO_TYPE = "promoType",
  FINAL_PRICE = "finalPrice",
  FINAL_COINS_EARNED = "finalCoinsEarned",
}

/**
 * Field yang dapat digunakan untuk sorting pada list history
 */
export enum HistoryPromoSortField {
  ID = "id",
  PACKAGE_NAME = "packageName",
  START_DATE = "startDate",
  END_DATE = "endDate",
  USER_TYPES = "userTypes",
  PROMO_TYPE = "promoType",
  FINAL_PRICE = "finalPrice",
  FINAL_COINS_EARNED = "finalCoinsEarned",
}

// Display labels untuk UI (Indonesian)
export const PromoStatusLabel: Record<PromoStatus, string> = {
  [PromoStatus.UPCOMING]: "Akan Datang",
  [PromoStatus.RUNNING]: "Berjalan",
  [PromoStatus.ENDED]: "Berakhir",
};

export const UserTypeLabel: Record<UserType, string> = {
  [UserType.NEW_USER]: "User Baru",
  [UserType.EXISTING_USER]: "User Lama",
};

export const PromoTypeLabel: Record<PromoType, string> = {
  [PromoType.DISCOUNT]: "Discount",
  [PromoType.FREE_COIN]: "Free Coin",
};

export const ActivityTypeLabel: Record<ActivityType, string> = {
  [ActivityType.CREATE]: "Create",
  [ActivityType.UPDATE]: "Update",
  [ActivityType.CANCEL]: "Cancel",
};
