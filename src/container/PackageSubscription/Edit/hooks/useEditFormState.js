import { useCallback, useEffect, useState } from "react";

import { INITIAL_FORM_STATE } from "../../Add/constants";

/**
 * Custom hook for managing edit form state with change detection
 */
export const useEditFormState = (packageData) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (packageData) {
      const loadedData = {
        namaPaket: packageData.packageName || "",
        mulaiBerlaku: packageData.startDate
          ? new Date(packageData.startDate)
          : null,
        deskripsiPaket: packageData.description || "",
        periode: String(packageData.period || ""),
        subUserYangDiperoleh: String(packageData.subUsersEarned || ""),
        batasPembelianPaket: packageData.isLimitedPurchase || false,
        kuotaPembelianPerUser: String(packageData.maxPurchasePerUser || ""),
        harga: String(packageData.price || "").split(".")[0],
        koin: packageData.isUnlimitedCoin
          ? "0"
          : String(packageData.coinEarned || ""),
        posisiPaketPembelian: String(packageData.position || ""),
        isPaketPopuler: packageData.isPopular || false,
        isActive: packageData.status || false,
      };
      setFormData(loadedData);
      setInitialData(loadedData);
    }
  }, [packageData]);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const hasChanges = useCallback(() => {
    if (!initialData) return false;
    return JSON.stringify(formData) !== JSON.stringify(initialData);
  }, [formData, initialData]);

  return {
    formData,
    handleInputChange,
    hasChanges,
  };
};
