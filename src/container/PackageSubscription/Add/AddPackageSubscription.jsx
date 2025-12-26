"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@muatmuat/ui/Button";

import { useGetPopularPackage } from "@/services/package-subscription/useGetPopularPackage";

import BackButton from "./components/BackButton";
import {
  BasicInfoSection,
  PricingSection,
  StatusSection,
  UserQuotaSection,
} from "./components/FormSections";
import {
  ConfirmBackModal,
  ConfirmSaveModal,
  WarningModal,
} from "./components/Modals";
import { useFormState } from "./hooks/useFormState";
import { useFormSubmission } from "./hooks/useFormSubmission";

const AddPackageSubscription = () => {
  const router = useRouter();
  const { data: popularData } = useGetPopularPackage();

  const { formData, handleInputChange, hasChanges } = useFormState();

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isBackModalOpen, setBackModalOpen] = useState(false);
  const [warningModalState, setWarningModalState] = useState({
    isOpen: false,
    message: "",
  });

  const showWarning = (message) => {
    setWarningModalState({ isOpen: true, message });
  };

  const { isLoading, submitForm, handleSubmit } = useFormSubmission(
    formData,
    showWarning
  );

  // Navigation handlers
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

  // Form submission handlers
  const handleFormSubmit = () => {
    if (handleSubmit()) {
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmSave = async () => {
    setConfirmModalOpen(false);
    await submitForm();
  };

  const handleConfirmBackSave = async () => {
    if (handleSubmit()) {
      setBackModalOpen(false);
      await submitForm();
    } else {
      setBackModalOpen(false);
    }
  };
  return (
    <div>
      <BackButton title="Tambah Paket Subscription" onClick={handleBack} />

      <div className="mt-[10px] rounded-lg bg-white px-6 py-6">
        <BasicInfoSection
          formData={formData}
          onInputChange={handleInputChange}
        />
        <UserQuotaSection
          formData={formData}
          onInputChange={handleInputChange}
        />
        <PricingSection formData={formData} onInputChange={handleInputChange} />
        <StatusSection
          formData={formData}
          onInputChange={handleInputChange}
          popularData={popularData}
        />

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            variant="muatparts-primary"
            className="rounded-[20px] bg-[#176CF7] px-8 text-sm font-semibold text-white"
            onClick={handleFormSubmit}
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
        description="Apakah anda yakin akan menyimpan data?"
      />
      <ConfirmBackModal
        isOpen={isBackModalOpen}
        setOpen={setBackModalOpen}
        onConfirm={handleConfirmBackSave}
        onCancel={handleCancelBack}
        description="Apakah kamu yakin ingin berpindah halaman? Data yang telah diisi tidak akan disimpan"
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
