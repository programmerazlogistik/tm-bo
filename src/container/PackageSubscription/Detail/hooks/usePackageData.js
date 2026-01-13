import { useEffect, useState } from "react";

import { INITIAL_FORM_STATE } from "../../Add/constants";

/**
 * Transform API response to form data
 */
const transformPackageData = (packageData) => {
  if (!packageData) return INITIAL_FORM_STATE;

  return {
    namaPaket: packageData.packageName || "",
    mulaiBerlaku: packageData.startDate
      ? new Date(packageData.startDate)
      : null,
    deskripsiPaket: packageData.description || "",
    periode: String(packageData.period || ""),
    subUserYangDiperoleh: String(packageData.subUsersEarned || ""),
    batasPembelianPaket: packageData.isLimitedPurchase || false,
    kuotaPembelianPerUser: String(packageData.maxPurchasePerUser || ""),
    harga: String(packageData.price || ""),
    koin: packageData.isUnlimitedCoin
      ? "0"
      : String(packageData.coinEarned || ""),
    posisiPaketPembelian: String(packageData.position || ""),
    isPaketPopuler: packageData.isPopular || false,
    isActive: packageData.status || false,
  };
};

/**
 * Custom hook for loading and transforming package data
 */
export const usePackageData = (packageData) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    if (packageData) {
      setFormData(transformPackageData(packageData));
    }
  }, [packageData]);

  return { formData, setFormData };
};

/**
 * Custom hook for loading and transforming history data
 */
export const useHistoryData = (historyData) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    if (historyData?.snapshotAfter) {
      const snapshot = historyData.snapshotAfter;
      setFormData(transformPackageData(snapshot));
    }
  }, [historyData]);

  return { formData };
};
