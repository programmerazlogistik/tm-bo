"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Checkbox, Input } from "@muatmuat/ui/Form";
import { toast } from "@muatmuat/ui/Toaster";

import { useGetActiveLanguage } from "@/services/cms-homepage/common/useGetActiveLanguage";
import { useGetActiveUserTypes } from "@/services/cms-homepage/common/useGetActiveUserTypes";

import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import Toggle from "@/components/Toggle/Toggle";

import { sweetAlert } from "@/lib/sweetAlert";

import BackButton from "./components/BackButton";
import {
  ConfirmBackModal,
  ConfirmSaveModal,
  WarningModal,
} from "./components/Modals";
import MultiSelectUser from "./components/MultiSelectUser";
import {
  ERROR_MESSAGES,
  INITIAL_FORM_STATE,
  MAX_WORDING_LENGTH,
  PROMO_TYPES,
  SUCCESS_MESSAGES,
  VALIDATION_MESSAGES,
} from "./constants";
import { getUserTypeOptions, updateTranslation } from "./helpers";

const AddSectionPromo = () => {
  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isBackModalOpen, setBackModalOpen] = useState(false);
  const [warningModalState, setWarningModalState] = useState({
    isOpen: false,
    message: "",
  });

  const { data: userTypesData } = useGetActiveUserTypes();
  const { data: languagesData } = useGetActiveLanguage();

  const activeLanguages = useMemo(
    () => languagesData?.Data || [],
    [languagesData]
  );

  const userTypeOptions = useMemo(
    () => getUserTypeOptions(userTypesData),
    [userTypesData]
  );

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const hasTranslationChanges = () => {
    return Object.values(formData.translations).some(
      (translation) =>
        translation?.wording?.trim() || translation?.buttonName?.trim()
    );
  };

  const hasChanges = () => {
    return (
      formData.startDate ||
      formData.endDate ||
      formData.type.length > 0 ||
      formData.userType.length > 0 ||
      hasTranslationChanges() ||
      formData.urlRedirect.trim() ||
      formData.isActive
    );
  };

  const handleBack = () => {
    if (hasChanges()) {
      setBackModalOpen(true);
    } else {
      router.push("/cms-homepage/section-promo");
    }
  };

  const handleCancelBack = () => {
    setBackModalOpen(false);
    router.push("/cms-homepage/section-promo");
  };

  const handleConfirmBackSave = async () => {
    if (!handleValidation()) {
      setBackModalOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement API call
      // await createSectionPromo(payload);

      setBackModalOpen(false);

      sweetAlert(
        <p className="text-[26.25px] font-bold leading-[31.5px] text-[#595959]">
          Data berhasil disimpan
        </p>,
        "OK",
        () => {
          router.push("/cms-homepage/section-promo");
        }
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.Message?.Text ||
          "Gagal menambahkan promo subscribe"
      );
      setBackModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const showWarning = (message) => {
    setWarningModalState({ isOpen: true, message });
  };

  const saveData = async () => {
    setIsLoading(true);

    try {
      // TODO: Map formData to API payload and call API
      // const payload = mapFormDataToPayload(formData);
      // await createSectionPromo(payload);

      sweetAlert(
        <p className="text-[26.25px] font-bold leading-[31.5px] text-[#595959]">
          {SUCCESS_MESSAGES.SAVE_SUCCESS}
        </p>,
        "OK",
        () => {
          router.push("/cms-homepage/section-promo");
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

  const validateRequiredFields = () => {
    if (
      !formData.startDate ||
      !formData.endDate ||
      formData.type.length === 0 ||
      formData.userType.length === 0 ||
      !formData.urlRedirect.trim()
    ) {
      showWarning(VALIDATION_MESSAGES.EMPTY_FIELDS);
      return false;
    }
    return true;
  };

  const validateTranslations = () => {
    for (const language of activeLanguages) {
      const translation = formData.translations[language.url];

      if (!translation?.wording?.trim() || !translation?.buttonName?.trim()) {
        showWarning(VALIDATION_MESSAGES.EMPTY_LANGUAGE_FIELDS(language.name));
        return false;
      }

      if (translation.wording.length > MAX_WORDING_LENGTH) {
        showWarning(VALIDATION_MESSAGES.MAX_WORDING_LENGTH(language.url));
        return false;
      }
    }
    return true;
  };

  const validateDateRange = () => {
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        showWarning(VALIDATION_MESSAGES.INVALID_DATE_RANGE);
        return false;
      }
    }
    return true;
  };

  const handleValidation = () => {
    return (
      validateRequiredFields() && validateTranslations() && validateDateRange()
    );
    // TODO: Add duplicate user type validation after API integration
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

  return (
    <div>
      <BackButton title="Tambah Promo Subscribe" onClick={handleBack} />

      <div className="mt-[10px] rounded-lg bg-white px-6 py-6">
        {/* Masa Berlaku */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Masa Berlaku*
          </label>
          <div className="flex flex-1 items-center gap-4">
            <div className="[&_span]:!text-xs [&_span]:!font-medium [&_span]:!text-[#1B1B1B]">
              <DateTimePickerWeb
                value={formData.startDate}
                onChange={(date) => handleInputChange("startDate", date)}
                placeholder="Pilih Tanggal"
                className="w-[200px]"
                dateFormat="dd/MM/yyyy HH:mm"
              />
            </div>
            <span className="text-sm text-[#868686]">s/d</span>
            <div className="[&_span]:!text-xs [&_span]:!font-medium [&_span]:!text-[#1B1B1B]">
              <DateTimePickerWeb
                value={formData.endDate}
                onChange={(date) => handleInputChange("endDate", date)}
                placeholder="Pilih Tanggal"
                className="w-[200px]"
                dateFormat="dd/MM/yyyy HH:mm"
              />
            </div>
          </div>
        </div>

        {/* Tipe */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Tipe*
          </label>
          <div className="flex flex-1 gap-6">
            {Object.values(PROMO_TYPES).map((type) => (
              <Checkbox
                key={type}
                label={type}
                checked={formData.type.includes(type)}
                onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...formData.type, type]
                    : formData.type.filter((t) => t !== type);
                  handleInputChange("type", newTypes);
                }}
              />
            ))}
          </div>
        </div>

        {/* Tipe Pengguna */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Tipe Pengguna*
          </label>
          <div className="flex-1">
            <MultiSelectUser
              value={formData.userType}
              onChange={(value) => handleInputChange("userType", value)}
              placeholder="Pilih Tipe Pengguna"
              className="w-full"
              options={userTypeOptions}
            />
          </div>
        </div>

        {/* Dynamic Wording fields for each language */}
        {activeLanguages.map((language) => {
          const handleTranslationUpdate = (field, value) => {
            setFormData((prev) => ({
              ...prev,
              translations: updateTranslation(prev, language, field, value),
            }));
          };

          return (
            <div key={`wording-${language.url}`}>
              <div className="mb-6 flex items-start gap-6">
                <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
                  Wording({language.url})*
                </label>
                <div className="flex-1">
                  <RichTextEditor
                    value={formData.translations[language.url]?.wording || ""}
                    onChange={(value) =>
                      handleTranslationUpdate("wording", value)
                    }
                    placeholder="Masukkan Wording"
                    maxLength={MAX_WORDING_LENGTH}
                    showCounter
                    className="w-full"
                  />
                </div>
              </div>

              <div className="mb-6 flex items-start gap-6">
                <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
                  Nama Tombol({language.url})*
                </label>
                <div className="flex-1">
                  <Input
                    value={
                      formData.translations[language.url]?.buttonName || ""
                    }
                    onChange={(e) =>
                      handleTranslationUpdate("buttonName", e.target.value)
                    }
                    placeholder="Masukkan Nama Tombol"
                    className="w-full"
                    appearance={{
                      inputClassName: "text-sm",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Url Redirect */}
        <div className="mb-6 flex items-start gap-6">
          <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
            Url Redirect*
          </label>
          <div className="flex-1">
            <Input
              value={formData.urlRedirect}
              onChange={(e) => handleInputChange("urlRedirect", e.target.value)}
              placeholder="Masukkan Url Redirect"
              className="w-full"
              appearance={{
                inputClassName: "text-sm text-[#176CF7]",
              }}
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

export default AddSectionPromo;
