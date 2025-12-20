import { useState } from "react";

import { toast } from "@muatmuat/ui/Toaster";

import { useUpdatePackageSubscriptionStatus } from "@/services/package-subscription/useUpdatePackageSubscriptionStatus";

import Toggle from "@/components/Toggle/Toggle";

import ConfirmationModal from "./ConfirmationModal";

const SuccessToggleModal = ({ isOpen, setOpen, type }) => {
  const descriptionMap = {
    active: "Berhasil Mengaktifkan Paket",
    inactive: "Berhasil Menonaktifkan Paket",
  };
  return (
    <ConfirmationModal
      isOpen={isOpen}
      setIsOpen={setOpen}
      title={{
        text: "Pemberitahuan",
      }}
      description={{
        className: "w-[337px]",
        text: descriptionMap[type] || descriptionMap.active,
      }}
      withCancel={false}
      withConfirm={false}
    />
  );
};

const ToggleStatusModal = ({
  isOpen,
  setOpen,
  type,
  package: pkg,
  onSuccess,
}) => {
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const { updatePackageSubscriptionStatus, isMutating } =
    useUpdatePackageSubscriptionStatus();

  const descriptionMap = {
    active: "Apakah Anda yakin ingin mengaktifkan paket subscription ?",
    inactive: "Apakah Anda yakin ingin menonaktifkan paket subscription ?",
  };

  const handleConfirm = async () => {
    try {
      const newStatus = type === "active";
      await updatePackageSubscriptionStatus(pkg.id, {
        status: newStatus,
      });

      // Tutup modal konfirmasi dulu
      setOpen(false);

      // Tunggu modal konfirmasi benar-benar tertutup, baru buka success modal
      setTimeout(() => {
        setSuccessModalOpen(true);
      }, 300);
    } catch (error) {
      toast.error(
        error?.response?.data?.Message?.Text || "Gagal mengubah status paket"
      );
      setOpen(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    // Panggil onSuccess setelah user menutup success modal
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={setOpen}
        title={{
          text: "Pemberitahuan",
        }}
        description={{
          className: "w-[337px]",
          text: descriptionMap[type] || descriptionMap.active,
        }}
        cancel={{
          className: "min-w-[112px] md:px-3",
          text: "Batal",
        }}
        confirm={{
          className: "min-w-[112px] px-3",
          text: isMutating ? "Menyimpan..." : "Simpan",
          onClick: handleConfirm,
          disabled: isMutating,
        }}
      />
      <SuccessToggleModal
        isOpen={isSuccessModalOpen}
        setOpen={handleCloseSuccessModal}
        type={type}
      />
    </>
  );
};

const ToggleStatus = ({ package: pkg, onSuccess }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
  });

  const handleToggleClick = () => {
    const type = pkg.isActive ? "inactive" : "active";
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  return (
    <>
      <Toggle value={pkg.isActive} onClick={handleToggleClick} />
      <ToggleStatusModal
        isOpen={modalState.isOpen}
        setOpen={closeModal}
        type={modalState.type}
        package={pkg}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default ToggleStatus;
