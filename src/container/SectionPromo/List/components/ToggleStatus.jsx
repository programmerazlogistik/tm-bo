import { useState } from "react";

import { toast } from "@muatmuat/ui/Toaster";

import { useUpdatePromoSectionStatus } from "@/services/cms-homepage/section-promo/useUpdatePromoSectionStatus";

import Toggle from "@/components/Toggle/Toggle";

import ConfirmationModal from "./ConfirmationModal";

const SuccessToggleModal = ({ isOpen, setOpen, type }) => {
  const descriptionMap = {
    active: "Berhasil Mengaktifkan Promo",
    inactive: "Berhasil Menonaktifkan Promo",
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

const ToggleStatusModal = ({ isOpen, setOpen, type, promo, onSuccess }) => {
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const { updatePromoSectionStatus, isMutating } =
    useUpdatePromoSectionStatus();

  const descriptionMap = {
    active: "Apakah Anda yakin ingin mengaktifkan promo subscribe ?",
    inactive: "Apakah Anda yakin ingin menonaktifkan promo subscribe ?",
  };

  const handleConfirm = async () => {
    try {
      const newStatus = type === "active";
      await updatePromoSectionStatus(promo.id, {
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
        error?.response?.data?.Message?.Text || "Gagal mengubah status promo"
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

const ToggleStatus = ({ promo, onSuccess }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
  });

  const handleToggleClick = () => {
    const type = promo.isActive ? "inactive" : "active";
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  return (
    <>
      <Toggle value={promo.isActive} onClick={handleToggleClick} />
      <ToggleStatusModal
        isOpen={modalState.isOpen}
        setOpen={closeModal}
        type={modalState.type}
        promo={promo}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default ToggleStatus;
