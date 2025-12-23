import PropTypes from "prop-types";

import ConfirmationModal from "../../List/components/ConfirmationModal";

export const WarningModal = ({ isOpen, setOpen, message }) => {
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

WarningModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export const ConfirmSaveModal = ({ isOpen, setOpen, onConfirm, isLoading }) => {
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

ConfirmSaveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export const ConfirmBackModal = ({ isOpen, setOpen, onConfirm, onCancel }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      setIsOpen={setOpen}
      title={{
        text: "Warning",
      }}
      description={{
        className: "w-[337px]",
        text: "Apakah kamu yakin ingin berpindah halaman? Data yang telah diisi tidak akan disimpan",
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

ConfirmBackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
