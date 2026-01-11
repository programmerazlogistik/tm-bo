import { IconComponent } from "@muatmuat/ui/IconComponent";

import { PERIODE_OPTIONS } from "../constants";
import {
  formatCurrency,
  formatNumber,
  parseCurrency,
  parseNumber,
} from "../helpers";
import { DateTimeField } from "./DateTimeField";
import { SelectField } from "./SelectField";
import { TextAreaField } from "./TextAreaField";
import { TextInputField } from "./TextInputField";
import { ToggleField } from "./ToggleField";

/**
 * Basic information section of the form
 */
export const BasicInfoSection = ({ formData, onInputChange }) => {
  // 26. 03 - TM - LB - 0009
  // 26. 03 - TM - LB - 0011
  return (
    <>
      <TextInputField
        label="Nama Paket"
        required
        value={formData.namaPaket}
        onChange={(value) => onInputChange("namaPaket", value)}
        placeholder="Masukkan Nama Paket"
        maxLength={30}
      />

      <DateTimeField
        label="Mulai Berlaku"
        required
        value={formData.mulaiBerlaku}
        onChange={(date) => onInputChange("mulaiBerlaku", date)}
        placeholder="Pilih Tanggal & Jam"
      />

      <TextAreaField
        label="Deskripsi Paket"
        required
        value={formData.deskripsiPaket}
        onChange={(value) => onInputChange("deskripsiPaket", value)}
        placeholder="Masukkan Deskripsi Paket"
        rows={4}
        maxLength={300}
      />

      <SelectField
        label="Periode"
        required
        value={formData.periode}
        onChange={(value) => onInputChange("periode", value)}
        placeholder="Pilih Periode"
        options={PERIODE_OPTIONS}
      />
    </>
  );
};

/**
 * User and quota configuration section
 */
export const UserQuotaSection = ({ formData, onInputChange }) => {
  // 26. 03 - TM - LB - 0012
  const handleNumberChange = (field, value) => {
    const numericValue = parseNumber(value);
    onInputChange(field, numericValue);
  };
  return (
    <>
      <TextInputField
        label="Sub User yang Diperoleh"
        required
        value={
          formData.subUserYangDiperoleh
            ? formatNumber(formData.subUserYangDiperoleh)
            : ""
        }
        onChange={(value) => handleNumberChange("subUserYangDiperoleh", value)}
        placeholder="Masukkan Jumlah Sub User yang diperoleh (0 Koin untuk membuat paket ini menjadi Unlimited)"
      />

      <ToggleField
        label="Batas Pembelian Paket"
        value={formData.batasPembelianPaket}
        onChange={(value) => onInputChange("batasPembelianPaket", value)}
        tooltip="Membatasi jumlah pembelian paket oleh masing-masing pengguna."
      />

      <TextInputField
        label="Kuota Pembelian per User"
        value={
          formData.kuotaPembelianPerUser
            ? formatNumber(formData.kuotaPembelianPerUser)
            : ""
        }
        onChange={(value) => handleNumberChange("kuotaPembelianPerUser", value)}
        placeholder="Masukkan Jumlah Kuota Pembelian"
        disabled={!formData.batasPembelianPaket}
        errorMessage={
          parseInt(formData.kuotaPembelianPerUser) === 0
            ? "Kuota harus lebih dari 0"
            : undefined
        }
      />
    </>
  );
};

/**
 * Pricing and coin configuration section
 */
export const PricingSection = ({ formData, onInputChange }) => {
  const handleCurrencyChange = (value) => {
    const numericValue = parseCurrency(value);
    onInputChange("harga", numericValue);
  };

  const handleNumberChange = (field, value) => {
    const numericValue = parseNumber(value);
    onInputChange(field, numericValue);
  };

  return (
    <>
      <TextInputField
        label="Harga (Rp.)"
        required
        value={formData.harga ? formatCurrency(formData.harga) : ""}
        onChange={handleCurrencyChange}
        placeholder="Masukkan Harga Paket"
      />

      <TextInputField
        label="Koin yang didapatkan"
        required
        value={formData.koin ? formatNumber(formData.koin) : ""}
        onChange={(value) => handleNumberChange("koin", value)}
        placeholder="Masukkan Jumlah Koin (0 Koin untuk membuat paket ini menjadi Unlimited)"
      />

      <TextInputField
        label="Posisi Paket Pembelian"
        required
        value={
          formData.posisiPaketPembelian
            ? formatNumber(formData.posisiPaketPembelian)
            : ""
        }
        onChange={(value) => handleNumberChange("posisiPaketPembelian", value)}
        placeholder="Masukkan Urutan Tampil"
      />
    </>
  );
};

/**
 * Status and popularity configuration section
 */
export const StatusSection = ({ formData, onInputChange, popularData }) => {
  return (
    <>
      <ToggleField
        label="Jadikan sebagai Paket Populer"
        value={formData.isPaketPopuler}
        onChange={(value) => onInputChange("isPaketPopuler", value)}
        disabled={popularData?.hasPopular}
        additionalInfo={
          popularData?.hasPopular && (
            <div className="flex w-[205px] items-center gap-2 rounded-md bg-[#176CF7] px-2 py-1">
              <IconComponent
                src="/icons/info-white.svg"
                className="text-primary-50"
              />
              <span className="text-sm font-semibold text-primary-50">
                Sudah ada paket populer
              </span>
            </div>
          )
        }
      />

      <ToggleField
        label="Status"
        value={formData.isActive}
        onChange={(value) => onInputChange("isActive", value)}
        textActive="Aktif"
        textInactive="Tidak Aktif"
      />
    </>
  );
};
