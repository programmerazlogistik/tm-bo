"use client";

import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = true;

/**
 * Mock existing package names for validation
 */
const existingPackageNames = [
  "basic",
  "business pro",
  "enterprise",
  "enterprise pro",
];

/**
 * Validate package name uniqueness
 * @param {string} name - Name to validate
 * @param {string} [excludeId] - ID to exclude (for edit mode)
 * @returns {Promise<Object>} Validation result
 */
const validateNameUnique = async (name, excludeId = null) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const normalizedName = name.toLowerCase().trim();
    const isExisting = existingPackageNames.includes(normalizedName);

    // If excludeId is provided and name exists, we assume it's the same package being edited
    // In real API, backend will check if the existing name belongs to excludeId
    const isAvailable = !isExisting || (excludeId && isExisting);

    if (isAvailable) {
      return {
        Message: {
          Code: 200,
          Text: "Nama paket tersedia",
        },
        Data: {
          isAvailable: true,
          name: name,
        },
        Type: "VALIDATE_NAME_SUCCESS",
      };
    } else {
      return {
        Message: {
          Code: 200,
          Text: "Nama paket sudah terdaftar",
        },
        Data: {
          isAvailable: false,
          name: name,
          message: "Nama paket yang anda masukkan sudah terdaftar",
        },
        Type: "VALIDATE_NAME_NOT_AVAILABLE",
      };
    }
  } else {
    const params = { name };
    if (excludeId) {
      params.excludeId = excludeId;
    }

    return await fetcherMuatparts(
      "/v1/bo/subscription-tm/packages/validate-name",
      {
        method: "GET",
        params,
      }
    );
  }
};

/**
 * Hook for validating package name uniqueness with SWR
 * @param {string} name - Name to validate
 * @param {string} [excludeId] - ID to exclude (for edit mode)
 * @param {object} [options] - SWR options
 * @returns {{
 *   data: { isAvailable: boolean, name: string, message?: string } | undefined,
 *   isLoading: boolean,
 *   isValidating: boolean,
 *   error: Error | undefined,
 *   mutate: Function
 * }}
 */
export const useValidateNameUnique = (name, excludeId = null, options = {}) => {
  // Only validate if name has at least 3 characters
  const shouldFetch = name && name.trim().length >= 3;

  // Build query string for SWR key
  const queryParams = new URLSearchParams();
  if (name) queryParams.append("name", name.trim());
  if (excludeId) queryParams.append("excludeId", excludeId);

  const key = shouldFetch
    ? `/v1/bo/subscription-tm/packages/validate-name?${queryParams.toString()}`
    : null;

  const { data, error, isValidating, mutate } = useSWR(
    key,
    () => validateNameUnique(name.trim(), excludeId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 500, // Dedupe requests within 500ms
      ...options,
    }
  );

  return {
    data: data?.Data,
    message: data?.Message,
    isLoading: !error && !data && shouldFetch,
    isValidating,
    error,
    mutate,
  };
};
