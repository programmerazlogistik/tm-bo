import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Input, TextArea } from "@muatmuat/ui/Form";
import { InfoTooltip } from "@muatmuat/ui/Tooltip";

import Toggle from "@/components/Toggle/Toggle";

import { PERIODE_OPTIONS } from "../Add/constants";
import { formatCurrency, formatNumber } from "../Add/helpers";

/**
 * Reusable read-only form field components for Detail and History views
 */

const FormFieldDisplay = ({ label, children, tooltip }) => {
  return (
    <div className="mb-6 flex items-start gap-6">
      <label className="flex w-[200px] items-center gap-2 pt-2 text-sm font-semibold text-[#868686]">
        {label}
        {tooltip && (
          <InfoTooltip
            side="top"
            icon="/icons/info.svg"
            className="max-w-[336px]"
          >
            <p className="text-center text-xs font-medium text-[#1B1B1B]">
              {tooltip}
            </p>
          </InfoTooltip>
        )}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export const TextInputDisplay = ({ label, value, placeholder }) => {
  return (
    <FormFieldDisplay label={label}>
      <Input
        value={value || ""}
        placeholder={placeholder}
        className="w-full"
        appearance={{ inputClassName: "text-sm" }}
        disabled
      />
    </FormFieldDisplay>
  );
};

export const DateTimeDisplay = ({ label, value, placeholder }) => {
  return (
    <FormFieldDisplay label={label}>
      <div className="[&_span.text-neutral-400]:!text-[#7B7B7B] [&_span]:!text-xs [&_span]:!font-medium [&_span]:!text-black">
        <DateTimePickerWeb
          value={value}
          placeholder={placeholder}
          className="w-full"
          dateFormat="dd/MM/yyyy HH:mm"
          disabled
        />
      </div>
    </FormFieldDisplay>
  );
};

export const TextAreaDisplay = ({ label, value, placeholder, rows = 4 }) => {
  return (
    <FormFieldDisplay label={label}>
      <TextArea
        value={value || ""}
        placeholder={placeholder}
        className="w-full"
        rows={rows}
        appearance={{ textareaClassName: "text-sm" }}
        disabled
      />
    </FormFieldDisplay>
  );
};

export const SelectDisplay = ({ label, value }) => {
  const displayValue = value
    ? PERIODE_OPTIONS.find((opt) => opt.value === value)?.label || value
    : "";

  return (
    <FormFieldDisplay label={label}>
      <Input
        value={displayValue}
        placeholder="Pilih Periode"
        className="w-full"
        appearance={{ inputClassName: "text-sm" }}
        icon={{
          right: (
            <svg
              width="9"
              height="5"
              viewBox="0 0 9 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.160633 0.132759C0.350798 -0.0429105 0.64065 -0.0429465 0.830555 0.124946L0.867013 0.160754L4.31949 3.89513L4.37287 3.942C4.42796 3.9816 4.48853 3.99995 4.54605 3.99995C4.6228 3.99995 4.70534 3.96746 4.77261 3.89513L8.13264 0.260363L8.1691 0.224556C8.35905 0.056785 8.64892 0.0572786 8.83902 0.233019C9.04178 0.42048 9.05447 0.736637 8.86701 0.9394L5.50569 4.57482L5.50438 4.57612C5.25677 4.84231 4.91326 4.99995 4.54605 4.99995C4.17884 4.99995 3.83533 4.84231 3.58772 4.57612L3.58641 4.57482L0.132638 0.839139L0.100086 0.800077C-0.0523482 0.59756 -0.0294857 0.308531 0.160633 0.132759Z"
                fill="#555555"
              />
            </svg>
          ),
        }}
        disabled
      />
    </FormFieldDisplay>
  );
};

export const NumberDisplay = ({ label, value, placeholder }) => {
  return (
    <FormFieldDisplay label={label}>
      <Input
        value={value ? formatNumber(value) : ""}
        placeholder={placeholder}
        className="w-full"
        appearance={{ inputClassName: "text-sm" }}
        disabled
      />
    </FormFieldDisplay>
  );
};

export const CurrencyDisplay = ({ label, value, placeholder }) => {
  return (
    <FormFieldDisplay label={label}>
      <Input
        value={value ? formatCurrency(value) : ""}
        placeholder={placeholder}
        className="w-full"
        appearance={{ inputClassName: "text-sm" }}
        disabled
      />
    </FormFieldDisplay>
  );
};

export const ToggleDisplay = ({
  label,
  value,
  textActive,
  textInactive,
  tooltip,
}) => {
  return (
    <FormFieldDisplay label={label} tooltip={tooltip}>
      <Toggle
        value={value}
        textActive={textActive}
        textInactive={textInactive}
        disabled
      />
    </FormFieldDisplay>
  );
};

/**
 * Complete form display sections for Detail/History views
 */
export const PackageFormDisplay = ({ formData, showDeleteButton = false }) => {
  return (
    <>
      <TextInputDisplay
        label="Nama Paket*"
        value={formData.namaPaket}
        placeholder="Masukkan Nama Paket"
      />

      <DateTimeDisplay
        label="Mulai Berlaku*"
        value={formData.mulaiBerlaku}
        placeholder="Pilih Tanggal & Jam"
      />

      <TextAreaDisplay
        label="Deskripsi Paket*"
        value={formData.deskripsiPaket}
        placeholder="Masukkan Deskripsi Paket"
        rows={4}
      />

      <SelectDisplay label="Periode*" value={formData.periode} />

      <NumberDisplay
        label="Sub User yang Diperoleh*"
        value={formData.subUserYangDiperoleh}
        placeholder="Masukkan Jumlah Sub User yang diperoleh"
      />

      <ToggleDisplay
        label="Batas Pembelian Paket"
        value={formData.batasPembelianPaket}
        tooltip="Membatasi jumlah pembelian paket oleh masing-masing pengguna."
      />

      {formData.batasPembelianPaket && (
        <NumberDisplay
          label="Kuota Pembelian per User"
          value={formData.kuotaPembelianPerUser}
          placeholder="Masukkan Jumlah Kuota Pembelian"
        />
      )}

      <CurrencyDisplay
        label="Harga (Rp.)*"
        value={formData.harga}
        placeholder="Masukkan Harga Paket"
      />

      <NumberDisplay
        label="Koin yang didapatkan*"
        value={formData.koin}
        placeholder="Masukkan Jumlah Koin"
      />

      <NumberDisplay
        label="Posisi Paket Pembelian*"
        value={formData.posisiPaketPembelian}
        placeholder="Masukkan Urutan Tampil"
      />

      <ToggleDisplay
        label="Jadikan sebagai Paket Populer"
        value={formData.isPaketPopuler}
      />

      <ToggleDisplay
        label="Status"
        value={formData.isActive}
        textActive="Aktif"
        textInactive="Tidak Aktif"
      />
    </>
  );
};
