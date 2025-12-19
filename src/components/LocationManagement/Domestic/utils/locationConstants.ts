import { Coordinates } from "../types";

export const DEFAULT_COORDINATES: Coordinates = {
  latitude: -6.2088,
  longitude: 106.8456,
};

export const STORAGE_KEYS = {
  RECENT_SEARCHES: "locationField_recentSearches",
  LAST_COORDINATES: "locationField_lastCoordinates",
} as const;

export const ERROR_MESSAGES = {
  GEOLOCATION_NOT_SUPPORTED: "Geolocation tidak didukung oleh browser Anda",
  GEOLOCATION_PERMISSION_DENIED: "Izin lokasi ditolak",
  GEOLOCATION_UNAVAILABLE: "Lokasi tidak tersedia",
  GEOLOCATION_TIMEOUT: "Waktu permintaan lokasi habis",
  FETCH_LOCATION_FAILED: "Gagal mengambil data lokasi",
};

export const UI_LABELS = {
  CURRENT_LOCATION: "Lokasi Saat Ini",
  RECENT_SEARCHES: "Terakhir Dicari",
  SEARCH_SUGGESTIONS: "Saran",
  SELECT_POSTAL_CODE: "Pilih Kode Pos",
  SET_PIN_LOCATION: "Atur Pin Lokasi",
  LOADING: "Memuat...",
  NO_RESULTS: "Tidak ada hasil",
  SEARCH_PLACEHOLDER: "Cari lokasi...",
};
