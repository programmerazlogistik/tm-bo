"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";
import { Checkbox, Input } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { toast } from "@muatmuat/ui/Toaster";

import { useGetActiveLanguage } from "@/services/cms-homepage/common/useGetActiveLanguage";
import { useGetActiveUserTypes } from "@/services/cms-homepage/common/useGetActiveUserTypes";
import { useUpdateSectionPromo } from "@/services/cms-homepage/section-promo/useUpdateSectionPromo";

import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import Toggle from "@/components/Toggle/Toggle";

import { sweetAlert } from "@/lib/sweetAlert";

import MultiSelectUser from "../Add/components/MultiSelectUser";
import ConfirmationModal from "../List/components/ConfirmationModal";
import BackButton from "./components/BackButton";

const WarningModal = ({ isOpen, setOpen, message }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      setIsOpen={setOpen}
      title={{
        text: "Warning",
      }}
      description={{
        className: "w-[337px]",
        text: message,
      }}
      withCancel={false}
      withConfirm={false}
    />
  );
};

const ConfirmSaveModal = ({ isOpen, setOpen, onConfirm, isLoading }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      setIsOpen={setOpen}
      title={{
        text: "Pemberitahuan",
      }}
      description={{
        className: "w-[337px]",
        text: "Apakah anda yakin akan menyimpan data?",
      }}
      cancel={{
        className: "min-w-[112px] md:px-3",
        text: "Batal",
      }}
      confirm={{
        className: "min-w-[112px] px-3",
        text: isLoading ? "Menyimpan..." : "Simpan",
        onClick: onConfirm,
        disabled: isLoading,
      }}
    />
  );
};

const ConfirmBackModal = ({ isOpen, setOpen, onConfirm, onCancel }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      setIsOpen={setOpen}
      title={{
        text: "Warning",
      }}
      description={{
        className: "w-[337px]",
        text: "Anda belum menyimpan data!",
      }}
      cancel={{
        className: "min-w-[112px] md:px-3",
        text: "Lanjutkan",
        variant: "muatparts-primary-secondary",
        onClick: onCancel,
      }}
      confirm={{
        className: "min-w-[112px] px-3",
        text: "Simpan",
        onClick: onConfirm,
      }}
    />
  );
};

const EditSectionPromo = ({ promoId, data, isLoading: isLoadingData }) => {
  const router = useRouter();
  const { updatePromoSection } = useUpdateSectionPromo();

  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    type: [],
    userType: [],
    translations: [], // Dynamic translations array
    urlRedirect: "",
    isActive: false,
  });

  const [initialData, setInitialData] = useState(null);
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

  // Populate form data when API data is loaded
  useEffect(() => {
    if (data && activeLanguages.length > 0) {
      const typeArray = [];
      if (data.type === "DOMESTIC") {
        typeArray.push("Muatparts Domestik");
      } else if (data.type === "INTERNATIONAL") {
        typeArray.push("Muatparts Internasional");
      } else if (data.type === "BOTH") {
        typeArray.push("Muatparts Domestik", "Muatparts Internasional");
      }

      // Get user type codes from first translation
      const userTypeCodes = data.translations?.[0]?.userTypeCodes || [];

      // Map all translations to object keyed by language url
      const translationsObj = {};
      activeLanguages.forEach((language) => {
        const existingTranslation = data.translations?.find(
          (t) => t.languageCode === language.url
        );
        translationsObj[language.url] = {
          languageId: language.id,
          languageCode: language.url,
          wording: existingTranslation?.wording || "",
          buttonName: existingTranslation?.buttonName || "",
        };
      });

      const populatedData = {
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        type: typeArray,
        userType: userTypeCodes,
        translations: translationsObj,
        urlRedirect: data.url || "",
        isActive: data.status || false,
      };

      setFormData(populatedData);
      setInitialData(populatedData);
    }
  }, [data, activeLanguages]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const hasChanges = () => {
    if (!initialData) return false;

    return (
      JSON.stringify(formData.startDate) !==
        JSON.stringify(initialData.startDate) ||
      JSON.stringify(formData.endDate) !==
        JSON.stringify(initialData.endDate) ||
      JSON.stringify(formData.type) !== JSON.stringify(initialData.type) ||
      JSON.stringify(formData.userType) !==
        JSON.stringify(initialData.userType) ||
      JSON.stringify(formData.translations) !==
        JSON.stringify(initialData.translations) ||
      formData.urlRedirect !== initialData.urlRedirect ||
      formData.isActive !== initialData.isActive
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
      // Map type
      let type = "DOMESTIC";
      if (
        formData.type.includes("Muatparts Domestik") &&
        formData.type.includes("Muatparts Internasional")
      ) {
        type = "BOTH";
      } else if (formData.type.includes("Muatparts Internasional")) {
        type = "INTERNATIONAL";
      }

      // Get user type IDs from codes
      const userTypeIds = formData.userType
        .map((code) => {
          const userType = userTypesData?.Data?.find((ut) => ut.code === code);
          return userType?.id;
        })
        .filter(Boolean);

      // Map translations from object to array
      const translations = Object.values(formData.translations).map(
        (translation) => ({
          languageId: translation.languageId,
          userTypeId: userTypeIds,
          wording: translation.wording,
          buttonName: translation.buttonName,
        })
      );

      const payload = {
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        type,
        url: formData.urlRedirect,
        status: formData.isActive,
        translations,
        createdBy: "uuid-user", // TODO: Get from auth context
      };

      await updatePromoSection(promoId, payload);

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
        error?.response?.data?.Message?.Text || "Gagal mengubah promo subscribe"
      );
      setBackModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    // Check empty fields
    if (
      !formData.startDate ||
      !formData.endDate ||
      formData.type.length === 0 ||
      formData.userType.length === 0 ||
      !formData.urlRedirect
    ) {
      setWarningModalState({
        isOpen: true,
        message: "Terdapat field yang kosong",
      });
      return false;
    }

    // Check all active languages have translations
    for (const language of activeLanguages) {
      const translation = formData.translations[language.url];
      if (!translation?.wording || !translation?.buttonName) {
        setWarningModalState({
          isOpen: true,
          message: `Terdapat field yang kosong untuk bahasa ${language.name}`,
        });
        return false;
      }

      // Check wording length
      if (translation.wording.length > 5000) {
        setWarningModalState({
          isOpen: true,
          message: `Maksimal Wording(${language.url}) 5000 Karakter`,
        });
        return false;
      }
    }

    // Check date range
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        setWarningModalState({
          isOpen: true,
          message: "Tanggal mulai tidak boleh lebih besar dari tanggal akhir",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmSave = async () => {
    setIsLoading(true);

    try {
      // Map type
      let type = "DOMESTIC";
      if (
        formData.type.includes("Muatparts Domestik") &&
        formData.type.includes("Muatparts Internasional")
      ) {
        type = "BOTH";
      } else if (formData.type.includes("Muatparts Internasional")) {
        type = "INTERNATIONAL";
      }

      // Get user type IDs from codes
      const userTypeIds = formData.userType
        .map((code) => {
          const userType = userTypesData?.Data?.find((ut) => ut.code === code);
          return userType?.id;
        })
        .filter(Boolean);

      // Map translations from object to array
      const translations = Object.values(formData.translations).map(
        (translation) => ({
          languageId: translation.languageId,
          userTypeId: userTypeIds,
          wording: translation.wording,
          buttonName: translation.buttonName,
        })
      );

      const payload = {
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        type,
        url: formData.urlRedirect,
        status: formData.isActive,
        translations,
        createdBy: "uuid-user", // TODO: Get from auth context
      };

      await updatePromoSection(promoId, payload);

      setConfirmModalOpen(false);

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
        error?.response?.data?.Message?.Text || "Gagal mengubah promo subscribe"
      );
      setConfirmModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div>
        <BackButton title="Ubah Promo Subscribe" />
        <div className="mt-[10px] flex h-64 items-center justify-center rounded-lg bg-white">
          <LoadingStatic />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <BackButton title="Ubah Promo Subscribe" />
        <div className="mt-[10px] rounded-lg bg-white p-6">
          <p className="text-center text-sm text-neutral-500">
            Data tidak ditemukan
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BackButton title="Ubah Promo Subscribe" onClick={handleBack} />

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
            <Checkbox
              label="Muatparts Domestik"
              checked={formData.type.includes("Muatparts Domestik")}
              onCheckedChange={(checked) => {
                if (checked) {
                  handleInputChange("type", [
                    ...formData.type,
                    "Muatparts Domestik",
                  ]);
                } else {
                  handleInputChange(
                    "type",
                    formData.type.filter((t) => t !== "Muatparts Domestik")
                  );
                }
              }}
            />
            <Checkbox
              label="Muatparts Internasional"
              checked={formData.type.includes("Muatparts Internasional")}
              onCheckedChange={(checked) => {
                if (checked) {
                  handleInputChange("type", [
                    ...formData.type,
                    "Muatparts Internasional",
                  ]);
                } else {
                  handleInputChange(
                    "type",
                    formData.type.filter((t) => t !== "Muatparts Internasional")
                  );
                }
              }}
            />
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
              options={
                userTypesData?.Data?.filter((item) => item.isActive).map(
                  (item) => ({ label: item.description, value: item.code })
                ) || []
              }
            />
          </div>
        </div>

        {/* Dynamic Wording fields for each language */}
        {activeLanguages.map((language) => (
          <div
            key={`wording-${language.url}`}
            className="mb-6 flex items-start gap-6"
          >
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Wording({language.url})*
            </label>
            <div className="flex-1">
              <RichTextEditor
                value={formData.translations[language.url]?.wording || ""}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    translations: {
                      ...prev.translations,
                      [language.url]: {
                        ...prev.translations[language.url],
                        languageId: language.id,
                        languageCode: language.url,
                        wording: value,
                      },
                    },
                  }));
                }}
                placeholder="Masukkan Wording"
                maxLength={5000}
                showCounter={true}
                className="w-full"
              />
            </div>
          </div>
        ))}

        {/* Dynamic Button Name fields for each language */}
        {activeLanguages.map((language) => (
          <div
            key={`button-${language.url}`}
            className="mb-6 flex items-start gap-6"
          >
            <label className="w-[200px] pt-2 text-sm font-semibold text-[#868686]">
              Nama Tombol({language.url})*
            </label>
            <div className="flex-1">
              <Input
                value={formData.translations[language.url]?.buttonName || ""}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    translations: {
                      ...prev.translations,
                      [language.url]: {
                        ...prev.translations[language.url],
                        languageId: language.id,
                        languageCode: language.url,
                        buttonName: e.target.value,
                      },
                    },
                  }));
                }}
                placeholder="Masukkan Nama Tombol"
                className="w-full"
                appearance={{
                  inputClassName: "text-sm",
                }}
              />
            </div>
          </div>
        ))}

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

export default EditSectionPromo;
