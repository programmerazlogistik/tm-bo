import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useDeletePackageSubscription } from "@/services/package-subscription/useDeletePackageSubscription";

import { sweetAlert } from "@/lib/sweetAlert";

/**
 * Custom hook for handling package subscription list actions
 * @param {Function} onRefresh - Callback to refresh data after actions
 */
export const usePackageSubscriptionActions = (onRefresh) => {
  const router = useRouter();
  const { deletePackageSubscription, isMutating: isDeleting } =
    useDeletePackageSubscription();

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    package: null,
  });

  const [errorModalState, setErrorModalState] = useState({
    isOpen: false,
    message: "",
  });

  // Navigation handlers
  const handleEdit = useCallback(
    (pkg) => {
      router.push(`/package-subscription/${pkg.id}/edit`);
    },
    [router]
  );

  const handleDetail = useCallback(
    (pkg) => {
      router.push(`/package-subscription/${pkg.id}/detail`);
    },
    [router]
  );

  const handleAdd = useCallback(() => {
    router.push("/package-subscription/add");
  }, [router]);

  // Modal handlers
  const openConfirmationModal = useCallback((type, pkg) => {
    setModalState({ isOpen: true, type, package: pkg });
  }, []);

  const closeConfirmationModal = useCallback(() => {
    setModalState({ isOpen: false, type: null, package: null });
  }, []);

  // Delete handler
  const handleDeletePackage = useCallback(async () => {
    if (modalState.package && modalState.type === "delete") {
      try {
        await deletePackageSubscription(modalState.package.id);
        closeConfirmationModal();

        setTimeout(() => {
          sweetAlert(
            <p className="text-[26.25px] font-bold leading-[31.5px] text-[#595959]">
              Data berhasil dihapus
            </p>,
            "OK",
            () => {
              if (onRefresh) onRefresh();
            }
          );
        }, 300);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.Data ||
          error?.response?.data?.Message?.Text ||
          "Gagal menghapus paket";

        closeConfirmationModal();

        setTimeout(() => {
          setErrorModalState({ isOpen: true, message: errorMessage });
        }, 300);
      }
    }
  }, [
    modalState,
    closeConfirmationModal,
    deletePackageSubscription,
    onRefresh,
  ]);

  return {
    // States
    modalState,
    errorModalState,
    isDeleting,
    // Handlers
    handleEdit,
    handleDetail,
    handleAdd,
    handleDeletePackage,
    openConfirmationModal,
    closeConfirmationModal,
    setErrorModalState,
  };
};
