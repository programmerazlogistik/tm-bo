"use client";

import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = true;

/**
 * Mock existing package positions for validation
 */
const existingPositions = [1, 2, 3, 4];

/**
 * Validate package position uniqueness
 * @param {number} position - Position to validate
 * @param {string} [excludeId] - ID to exclude (for edit mode)
 * @returns {Promise<Object>} Validation result
 */
const validatePositionUnique = async (position, excludeId = null) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const positionNum = parseInt(position, 10);
    const isExisting = existingPositions.includes(positionNum);

    // If excludeId is provided and position exists, we assume it's the same package being edited
    // In real API, backend will check if the existing position belongs to excludeId
    const isAvailable = !isExisting || (excludeId && isExisting);

    if (isAvailable) {
      return {
        Message: {
          Code: 200,
          Text: "Posisi tersedia",
        },
        Data: {
          isAvailable: true,
          position: positionNum,
        },
        Type: "VALIDATE_POSITION_SUCCESS",
      };
    } else {
      return {
        Message: {
          Code: 200,
          Text: "Posisi sudah digunakan",
        },
        Data: {
          isAvailable: false,
          position: positionNum,
          message: "Posisi yang anda masukkan sudah digunakan paket lain",
        },
        Type: "VALIDATE_POSITION_NOT_AVAILABLE",
      };
    }
  } else {
    const params = { position };
    if (excludeId) {
      params.excludeId = excludeId;
    }

    return await fetcherMuatparts(
      "/v1/bo/subscription-tm/packages/validate-position",
      {
        method: "GET",
        params,
      }
    );
  }
};

/**
 * Hook for validating package position uniqueness with SWR
 * @param {number|string} position - Position to validate
 * @param {string} [excludeId] - ID to exclude (for edit mode)
 * @param {object} [options] - SWR options
 * @returns {{
 *   data: { isAvailable: boolean, position: number, message?: string } | undefined,
 *   isLoading: boolean,
 *   isValidating: boolean,
 *   error: Error | undefined,
 *   mutate: Function
 * }}
 */
export const useValidatePositionUnique = (
  position,
  excludeId = null,
  options = {}
) => {
  // Only validate if position is a valid number >= 1
  const positionNum = parseInt(position, 10);
  const shouldFetch = !isNaN(positionNum) && positionNum >= 1;

  // Build query string for SWR key
  const queryParams = new URLSearchParams();
  if (shouldFetch) queryParams.append("position", String(positionNum));
  if (excludeId) queryParams.append("excludeId", excludeId);

  const key = shouldFetch
    ? `/v1/bo/subscription-tm/packages/validate-position?${queryParams.toString()}`
    : null;

  const { data, error, isValidating, mutate } = useSWR(
    key,
    () => validatePositionUnique(positionNum, excludeId),
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
