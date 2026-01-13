import { validateNameUnique } from "@/services/package-subscription/useValidateNameUnique";
import { validatePositionUnique } from "@/services/package-subscription/useValidatePositionUnique";

import { VALIDATION_MESSAGES } from "../constants";
import { parseCurrency, parseNumber } from "../helpers";

/**
 * Custom hook for form validation
 */
export const useFormValidation = (formData, showWarning, excludeId = null) => {
  /**
   * Validate required fields
   */
  // 26. 03 - TM - LB - 0013
  // 26. 03 - TM - LB - 0015
  const validateRequiredFields = () => {
    const requiredFields = [
      "namaPaket",
      "mulaiBerlaku",
      "deskripsiPaket",
      "periode",
      "subUserYangDiperoleh",
      "harga",
      "koin",
      "posisiPaketPembelian",
    ];

    const hasEmptyFields = requiredFields.some((field) => {
      const value = formData[field];
      if (typeof value === "string") {
        return !value.trim();
      }
      return !value && value !== 0;
    });

    if (hasEmptyFields) {
      showWarning(VALIDATION_MESSAGES.EMPTY_FIELDS);
      return false;
    }

    // Validate conditional required field
    if (formData.batasPembelianPaket && !formData.kuotaPembelianPerUser) {
      showWarning(VALIDATION_MESSAGES.EMPTY_FIELDS);
      return false;
    }

    return true;
  };

  /**
   * Validate numeric fields
   */
  const validateNumericFields = () => {
    const numericFields = [
      {
        field: "harga",
        parser: parseCurrency,
        message: VALIDATION_MESSAGES.INVALID_PRICE,
      },
      {
        field: "koin",
        parser: parseNumber,
        message: VALIDATION_MESSAGES.INVALID_COIN,
      },
      {
        field: "posisiPaketPembelian",
        parser: parseNumber,
        message: VALIDATION_MESSAGES.INVALID_POSITION,
      },
      {
        field: "subUserYangDiperoleh",
        parser: parseNumber,
        message: VALIDATION_MESSAGES.INVALID_SUB_USER,
      },
    ];

    for (const { field, parser, message } of numericFields) {
      if (formData[field] && isNaN(parser(formData[field]))) {
        showWarning(message);
        return false;
      }
    }

    // Validate quota if purchase limit is enabled
    if (
      formData.batasPembelianPaket &&
      formData.kuotaPembelianPerUser &&
      isNaN(parseNumber(formData.kuotaPembelianPerUser))
    ) {
      showWarning(VALIDATION_MESSAGES.INVALID_QUOTA);
      return false;
    }
    // 26. 03 - TM - LB - 0012

    if (
      formData.batasPembelianPaket &&
      formData.kuotaPembelianPerUser &&
      parseInt(parseNumber(formData.kuotaPembelianPerUser)) === 0
    ) {
      showWarning("Kuota harus lebih dari 0");
      return false;
    }

    // Validate price range
    const price = parseInt(parseCurrency(formData.harga));
    if (price <= 0 || price >= 10000000000) {
      showWarning(VALIDATION_MESSAGES.PRICE_RANGE);
      return false;
    }

    return true;
  };

  /**
   * Validate form fields
   */
  const validateFields = () => {
    return validateRequiredFields() && validateNumericFields();
  };

  /**
   * Validate uniqueness of name and position
   */
  const validateUniqueness = async () => {
    try {
      // Validate name uniqueness
      const nameResult = await validateNameUnique(
        formData.namaPaket,
        excludeId
      );
      if (!nameResult?.Data?.isAvailable) {
        showWarning(
          nameResult?.Data?.message ||
            "Nama paket yang anda masukkan sudah terdaftar"
        );
        return false;
      }

      // Validate position uniqueness
      const positionResult = await validatePositionUnique(
        formData.posisiPaketPembelian,
        excludeId
      );
      if (!positionResult?.Data?.isAvailable) {
        showWarning(
          positionResult?.Data?.message ||
            "Posisi yang anda masukkan sudah terdaftar"
        );
        return false;
      }

      return true;
    } catch (error) {
      showWarning("Gagal memvalidasi data", error);
      return false;
    }
  };

  return {
    validateFields,
    validateUniqueness,
  };
};
