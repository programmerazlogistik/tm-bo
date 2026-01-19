"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { LoadingStatic } from "@muatmuat/ui/Loading";

import { useGetPackageSubscriptionDetail } from "@/services/package-subscription/useGetPackageSubscriptionDetail";
import { useGetPopularPackage } from "@/services/package-subscription/useGetPopularPackage";

import BackButton from "../Add/components/BackButton";
import {
  BasicInfoSection,
  PricingSection,
  StatusSection,
  UserQuotaSection,
} from "../Add/components/FormSections";
import {
  ConfirmBackModal,
  ConfirmSaveModal,
  WarningModal,
} from "../Add/components/Modals";
import { useEditFormState } from "./hooks/useEditFormState";
import { useEditFormSubmission } from "./hooks/useEditFormSubmission";

const EditPackageSubscription = ({ id }) => {
  // 26. 03 - TM - LB - 0102
  const router = useRouter();
  const { data: packageData, isLoading: isFetching } =
    useGetPackageSubscriptionDetail(id);
  const { data: popularData } = useGetPopularPackage(id);

  const { formData, handleInputChange, hasChanges } =
    useEditFormState(packageData);

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isBackModalOpen, setBackModalOpen] = useState(false);
  const [warningModalState, setWarningModalState] = useState({
    isOpen: false,
    message: "",
  });

  const showWarning = (message) => {
    setWarningModalState({ isOpen: true, message });
  };

  const {
    isLoading,
    submitForm,
    handleSubmit,
    errorModalState,
    setErrorModalState,
  } = useEditFormSubmission(id, formData, showWarning);

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
  // 26. 03 - TM - LB - 0171
  const handleFormSubmit = async () => {
    if (handleSubmit()) {
      if (!hasChanges()) {
        await submitForm();
      } else {
        setConfirmModalOpen(true);
      }
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

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingStatic />
      </div>
    );
  }

  return (
    <div>
      <BackButton title="Ubah Paket Subscription" onClick={handleBack} />

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

      <ConfirmSaveModal
        isOpen={isConfirmModalOpen}
        setOpen={setConfirmModalOpen}
        onConfirm={handleConfirmSave}
        isLoading={isLoading}
        description="Apakah anda yakin akan menyimpan perubahan?"
      />
      <ConfirmBackModal
        isOpen={isBackModalOpen}
        setOpen={setBackModalOpen}
        onConfirm={handleConfirmBackSave}
        onCancel={handleCancelBack}
        description="Apakah kamu yakin ingin berpindah halaman? Data yang telah diubah tidak akan disimpan"
      />
      <WarningModal
        isOpen={warningModalState.isOpen}
        setOpen={(isOpen) => setWarningModalState({ isOpen, message: "" })}
        message={warningModalState.message}
      />
      <WarningModal
        isOpen={errorModalState.isOpen}
        setOpen={() => setErrorModalState({ isOpen: false, message: "" })}
        message={errorModalState.message}
      />
    </div>
  );
};

export default EditPackageSubscription;
