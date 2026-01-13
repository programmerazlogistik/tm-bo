// Validation messages
export const VALIDATION_MESSAGES = {
  EMPTY_FIELDS: "Terdapat field yang kosong",
  INVALID_DATE: "Mulai Berlaku tidak valid",
  INVALID_PRICE: "Harga harus berupa angka yang valid",
  INVALID_COIN: "Koin harus berupa angka yang valid",
  INVALID_POSITION: "Posisi harus berupa angka yang valid",
  INVALID_SUB_USER: "Sub User yang Diperoleh harus berupa angka yang valid",
  INVALID_QUOTA: "Kuota Pembelian per User harus berupa angka yang valid",
  PRICE_RANGE: "Harga harus lebih dari 0 dan kurang dari 10.000.000.000",
};

// Periode options
export const PERIODE_OPTIONS = [
  { label: "1 Hari", value: "1" },
  { label: "7 Hari", value: "7" },
  { label: "30 Hari", value: "30" },
  { label: "90 Hari", value: "90" },
];

// Initial form state
export const INITIAL_FORM_STATE = {
  namaPaket: "",
  mulaiBerlaku: null,
  deskripsiPaket: "",
  periode: "",
  subUserYangDiperoleh: "",
  batasPembelianPaket: false,
  kuotaPembelianPerUser: "",
  harga: "",
  koin: "",
  posisiPaketPembelian: "",
  isPaketPopuler: false,
  isActive: false,
};

// Success messages
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: "Data berhasil disimpan",
};

// Error messages
export const ERROR_MESSAGES = {
  SAVE_ERROR: "Gagal menambahkan paket subscription",
};
