import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useDeletePackageSubscription } from "@/services/package-subscription/useDeletePackageSubscription";

import { sweetAlert } from "@/lib/sweetAlert";

/**
 * Custom hook for handling detail page delete action
 */
export const usePackageDelete = (packageId) => {
  const router = useRouter();
  const { deletePackageSubscription, isMutating: isDeleting } =
    useDeletePackageSubscription();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [errorModalState, setErrorModalState] = useState({
    isOpen: false,
    message: "",
  });

  const handleDeletePackage = useCallback(async () => {
    try {
      await deletePackageSubscription(packageId);
      setDeleteModalOpen(false);

      setTimeout(() => {
        sweetAlert(
          <p className="text-[26.25px] font-bold leading-[31.5px] text-[#595959]">
            Data berhasil dihapus
          </p>,
          "OK",
          () => {
            router.push("/package-subscription");
          }
        );
      }, 300);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.Data ||
        error?.response?.data?.Message?.Text ||
        "Gagal menghapus paket";

      setDeleteModalOpen(false);

      setTimeout(() => {
        setErrorModalState({ isOpen: true, message: errorMessage });
      }, 300);
    }
  }, [packageId, deletePackageSubscription, router]);

  return {
    isDeleteModalOpen,
    setDeleteModalOpen,
    errorModalState,
    setErrorModalState,
    handleDeletePackage,
    isDeleting,
  };
};
