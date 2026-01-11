import { useState } from "react";

import { useUpdatePackageSubscriptionStatus } from "@/services/package-subscription/useUpdatePackageSubscriptionStatus";

import Toggle from "@/components/Toggle/Toggle";

import ConfirmationModal from "./ConfirmationModal";

const SuccessToggleModal = ({ isOpen, setOpen, type, packageName }) => {
  const getDescription = () => {
    if (type === "active") {
      return `Paket <strong>${packageName}</strong> berhasil diaktifkan`;
    }
    return `Paket <strong>${packageName}</strong> berhasil dinonaktifkan`;
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
        text: getDescription(),
      }}
      withCancel={false}
      withConfirm={false}
    />
  );
};

const ErrorModal = ({ isOpen, setOpen, message }) => {
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

const ToggleStatusModal = ({
  isOpen,
  setOpen,
  type,
  package: pkg,
  onSuccess,
}) => {
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [successType, setSuccessType] = useState(null);
  const [errorModalState, setErrorModalState] = useState({
    isOpen: false,
    message: "",
  });
  const { updatePackageSubscriptionStatus, isMutating } =
    useUpdatePackageSubscriptionStatus();

  const handleConfirm = async () => {
    try {
      const newStatus = type === "active";
      await updatePackageSubscriptionStatus(pkg.id, newStatus);

      // Simpan type yang sebenarnya untuk ditampilkan di success modal
      setSuccessType(type);

      // Tutup modal konfirmasi dulu
      setOpen(false);

      // Tunggu modal konfirmasi benar-benar tertutup, baru buka success modal
      setTimeout(() => {
        setSuccessModalOpen(true);
      }, 300);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.Data ||
        error?.response?.data?.Message?.Text ||
        "Gagal mengubah status paket";

      // Tutup modal konfirmasi dulu
      setOpen(false);

      // Tunggu modal konfirmasi tertutup, baru buka error modal
      setTimeout(() => {
        setErrorModalState({ isOpen: true, message: errorMessage });
      }, 300);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    // Panggil onSuccess setelah user menutup success modal
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalState({ isOpen: false, message: "" });
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
          text: `Apakah Anda yakin ingin ${type === "active" ? "mengaktifkan" : "menonaktifkan"}<br/>Paket <strong>${pkg.namaPaket}</strong>?`,
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
        type={successType}
        packageName={pkg.namaPaket}
      />
      <ErrorModal
        isOpen={errorModalState.isOpen}
        setOpen={handleCloseErrorModal}
        message={errorModalState.message}
        
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
