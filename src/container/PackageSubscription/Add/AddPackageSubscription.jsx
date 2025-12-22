"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Input, Select, TextArea } from "@muatmuat/ui/Form";
import { toast } from "@muatmuat/ui/Toaster";
import { InfoTooltip } from "@muatmuat/ui/Tooltip";

import { useCreatePackageSubscription } from "@/services/package-subscription/useCreatePackageSubscription";

import Toggle from "@/components/Toggle/Toggle";

import { sweetAlert } from "@/lib/sweetAlert";

import BackButton from "./components/BackButton";
import {
  ConfirmBackModal,
  ConfirmSaveModal,
  WarningModal,
} from "./components/Modals";
import {
  ERROR_MESSAGES,
  INITIAL_FORM_STATE,
  PERIODE_OPTIONS,
  SUCCESS_MESSAGES,
  VALIDATION_MESSAGES,
} from "./constants";
import {
  formatCurrency,
  formatNumber,
  mapFormDataToPayload,
  parseCurrency,
  parseNumber,
} from "./helpers";

const AddPackageSubscription = () => {
  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isBackModalOpen, setBackModalOpen] = useState(false);
  const [warningModalState, setWarningModalState] = useState({
    isOpen: false,
    message: "",
  });

  const { createPackageSubscription } = useCreatePackageSubscription();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const hasChanges = () => {
    return (
      formData.namaPaket.trim() ||
      formData.mulaiBerlaku ||
      formData.deskripsiPaket.trim() ||
      formData.periode ||
      formData.subUserYangDiperoleh ||
      formData.batasPembelianPaket ||
      formData.kuotaPembelianPerUser ||
      formData.harga ||
      formData.koin ||
      formData.posisiPaketPembelian ||
      formData.isPaketPopuler ||
      formData.isActive
    );
  };

  const handleBack = () => {
    if (hasChanges()) {
      setBackModalOpen(true);
    } else {
      router.push("/package-subscription");
    }
  };

  const handleCancelBack = () => {
    setBackModalOpen(false);
    router.push("/package-subscription");
  };

  const showWarning = (message) => {
    setWarningModalState({ isOpen: true, message });
  };

  const validateRequiredFields = () => {
    if (
      !formData.namaPaket.trim() ||
      !formData.mulaiBerlaku ||
      !formData.deskripsiPaket.trim() ||
      !formData.periode ||
      !formData.subUserYangDiperoleh ||
      !formData.harga ||
      !formData.koin ||
      !formData.posisiPaketPembelian
    ) {
      showWarning(VALIDATION_MESSAGES.EMPTY_FIELDS);
      return false;
    }

    // Validate if batasPembelianPaket is true, kuotaPembelianPerUser must be filled
    if (formData.batasPembelianPaket && !formData.kuotaPembelianPerUser) {
      showWarning(VALIDATION_MESSAGES.EMPTY_FIELDS);
      return false;
    }

    return true;
  };

  const validateFields = () => {
    // Validate numeric fields
    if (formData.harga && isNaN(parseCurrency(formData.harga))) {
      showWarning(VALIDATION_MESSAGES.INVALID_PRICE);
      return false;
    }

    if (formData.koin && isNaN(parseNumber(formData.koin))) {
      showWarning(VALIDATION_MESSAGES.INVALID_COIN);
      return false;
    }

    if (
      formData.posisiPaketPembelian &&
      isNaN(parseNumber(formData.posisiPaketPembelian))
    ) {
      showWarning(VALIDATION_MESSAGES.INVALID_POSITION);
      return false;
    }

    if (
      formData.subUserYangDiperoleh &&
      isNaN(parseNumber(formData.subUserYangDiperoleh))
    ) {
      showWarning(VALIDATION_MESSAGES.INVALID_SUB_USER);
      return false;
    }

    if (
      formData.kuotaPembelianPerUser &&
      isNaN(parseNumber(formData.kuotaPembelianPerUser))
    ) {
      showWarning(VALIDATION_MESSAGES.INVALID_QUOTA);
      return false;
    }

    return true;
  };

  const handleValidation = () => {
    return validateRequiredFields() && validateFields();
  };

  const saveData = async () => {
    setIsLoading(true);

    try {
      const payload = mapFormDataToPayload(formData);
      await createPackageSubscription(payload);

      sweetAlert(
        <p className="text-[26.25px] font-bold leading-[31.5px] text-[#595959]">
          {SUCCESS_MESSAGES.SAVE_SUCCESS}
        </p>,
        "OK",
        () => {
          router.push("/package-subscription");
        }
      );
    } catch (error) {
      const errorMessage =
        error?.response?.data?.Message?.Text || ERROR_MESSAGES.SAVE_ERROR;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmBackSave = async () => {
    if (!handleValidation()) {
      setBackModalOpen(false);
      return;
    }

    setBackModalOpen(false);
    await saveData();
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmSave = async () => {
    setConfirmModalOpen(false);
    await saveData();
  };

  // Handle currency input
  const handleCurrencyChange = (value) => {
    const numericValue = parseCurrency(value);
    handleInputChange("harga", numericValue);
  };

  // Handle number input
  const handleNumberChange = (field, value) => {
    const numericValue = parseNumber(value);
    handleInputChange(field, numericValue);
  };

  return (
    <div>
      <BackButton title="Tambah Paket Subscription" onClick={handleBack} />

      <div className="mt-[10px] rounded-lg bg-white px-6 py-6">
        {/* Nama Paket */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Nama Paket*
          </label>
          <div className="flex-1">
            <Input
              value={formData.namaPaket}
              onChange={(e) => handleInputChange("namaPaket", e.target.value)}
              placeholder="Masukkan Nama Paket"
              className="w-full"
              appearance={{
                inputClassName: "text-sm",
              }}
            />
          </div>
        </div>

        {/* Mulai Berlaku */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Mulai Berlaku*
          </label>
          <div className="flex-1">
            <div className="[&_span]:!text-xs [&_span]:!font-medium [&_span]:!text-[#7B7B7B]">
              <DateTimePickerWeb
                value={formData.mulaiBerlaku}
                onChange={(date) => handleInputChange("mulaiBerlaku", date)}
                placeholder="Pilih Tanggal & Jam"
                className="w-full"
                dateFormat="dd/MM/yyyy HH:mm"
              />
            </div>
          </div>
        </div>

        {/* Deskripsi Paket */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Deskripsi Paket*
          </label>
          <div className="flex-1">
            <TextArea
              value={formData.deskripsiPaket}
              onChange={(e) =>
                handleInputChange("deskripsiPaket", e.target.value)
              }
              placeholder="Masukkan Deskripsi Paket"
              className="w-full"
              rows={4}
              appearance={{
                textareaClassName: "text-sm",
              }}
            />
          </div>
        </div>

        {/* Periode */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Periode*
          </label>
          <div className="flex-1">
            <Select
              value={formData.periode}
              onChange={(value) => handleInputChange("periode", value)}
              placeholder="Pilih Periode"
              options={PERIODE_OPTIONS}
              className="w-full"
            />
          </div>
        </div>

        {/* Sub User yang Diperoleh */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Sub User yang Diperoleh*
          </label>
          <div className="flex-1">
            <Input
              value={
                formData.subUserYangDiperoleh
                  ? formatNumber(formData.subUserYangDiperoleh)
                  : ""
              }
              onChange={(e) =>
                handleNumberChange("subUserYangDiperoleh", e.target.value)
              }
              placeholder="Masukkan Jumlah Sub User yang diperoleh (0 Koin untuk membuat paket ini menjadi Unlimited)"
              className="w-full"
              appearance={{
                inputClassName: "text-sm",
              }}
            />
          </div>
        </div>

        {/* Batas Pembelian Paket */}
        <div className="mb-6 flex items-start gap-6">
          <label className="flex w-[200px] items-center gap-2 pt-2 text-sm font-semibold text-[#868686]">
            Batas Pembelian Paket
            <InfoTooltip side="right" className="max-w-[336px]">
              <p className="text-xs font-medium text-[#1B1B1B]">
                Membatasi jumlah pembelian paket oleh masing-masing pengguna.
              </p>
            </InfoTooltip>
          </label>
          <div className="flex flex-1 items-center gap-3">
            <Toggle
              value={formData.batasPembelianPaket}
              onClick={(value) =>
                handleInputChange("batasPembelianPaket", value)
              }
            />
          </div>
        </div>

        {/* Kuota Pembelian per User */}
        {formData.batasPembelianPaket && (
          <div className="mb-6 flex items-start gap-6">
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Kuota Pembelian per User
            </label>
            <div className="flex-1">
              <Input
                value={
                  formData.kuotaPembelianPerUser
                    ? formatNumber(formData.kuotaPembelianPerUser)
                    : ""
                }
                onChange={(e) =>
                  handleNumberChange("kuotaPembelianPerUser", e.target.value)
                }
                placeholder="Masukkan Jumlah Kuota Pembelian"
                className="w-full"
                appearance={{
                  inputClassName: "text-sm",
                }}
              />
            </div>
          </div>
        )}

        {/* Harga */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Harga (Rp.)*
          </label>
          <div className="flex-1">
            <Input
              value={formData.harga ? formatCurrency(formData.harga) : ""}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              placeholder="Masukkan Harga Paket"
              className="w-full"
              appearance={{
                inputClassName: "text-sm",
              }}
            />
          </div>
        </div>

        {/* Koin yang didapatkan */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Koin yang didapatkan*
          </label>
          <div className="flex-1">
            <Input
              value={formData.koin ? formatNumber(formData.koin) : ""}
              onChange={(e) => handleNumberChange("koin", e.target.value)}
              placeholder="Masukkan Jumlah Koin (0 Koin untuk membuat paket ini menjadi Unlimited)"
              className="w-full"
              appearance={{
                inputClassName: "text-sm",
              }}
            />
          </div>
        </div>

        {/* Posisi Paket Pembelian */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Posisi Paket Pembelian*
          </label>
          <div className="flex-1">
            <Input
              value={
                formData.posisiPaketPembelian
                  ? formatNumber(formData.posisiPaketPembelian)
                  : ""
              }
              onChange={(e) =>
                handleNumberChange("posisiPaketPembelian", e.target.value)
              }
              placeholder="Masukkan Urutan Tampil"
              className="w-full"
              appearance={{
                inputClassName: "text-sm",
              }}
            />
          </div>
        </div>

        {/* Jadikan sebagai Paket Populer */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Jadikan sebagai Paket Populer
          </label>
          <div className="flex-1">
            <Toggle
              value={formData.isPaketPopuler}
              onClick={(value) => handleInputChange("isPaketPopuler", value)}
            />
          </div>
        </div>

        {/* Status */}
        <div className="mb-8 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Status
          </label>
          <div className="flex-1">
            <Toggle
              value={formData.isActive}
              onClick={(value) => handleInputChange("isActive", value)}
              textActive="Aktif"
              textInactive="Tidak Aktif"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            variant="muatparts-primary"
            className="rounded-[20px] bg-[#176CF7] px-8 text-sm font-semibold text-white"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Simpan
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ConfirmSaveModal
        isOpen={isConfirmModalOpen}
        setOpen={setConfirmModalOpen}
        onConfirm={handleConfirmSave}
        isLoading={isLoading}
      />
      <ConfirmBackModal
        isOpen={isBackModalOpen}
        setOpen={setBackModalOpen}
        onConfirm={handleConfirmBackSave}
        onCancel={handleCancelBack}
      />
      <WarningModal
        isOpen={warningModalState.isOpen}
        setOpen={(isOpen) => setWarningModalState({ isOpen, message: "" })}
        message={warningModalState.message}
      />
    </div>
  );
};

export default AddPackageSubscription;
