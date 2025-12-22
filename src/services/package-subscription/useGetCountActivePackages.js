"use client";

import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = true;

/**
 * Count active packages in the system
 * @returns {Promise<Object>} Active package count result
 */
const countActivePackages = async () => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock: 4 active packages (from our mock data: pkg-001, pkg-002, pkg-003 are active)
    // pkg-004 is inactive
    const activeCount = 3;
    const minimumRequired = 3;
    const canDeactivate = activeCount > minimumRequired;
    const canDelete = activeCount > minimumRequired;

    return {
      Message: {
        Code: 200,
        Text: "Jumlah paket aktif berhasil dihitung",
      },
      Data: {
        activeCount,
        canDeactivate,
        canDelete,
        minimumRequired,
      },
      Type: "COUNT_ACTIVE_PACKAGES_SUCCESS",
    };
  } else {
    return await fetcherMuatparts(
      "/v1/bo/subscription-tm/packages/count-active",
      {
        method: "GET",
      }
    );
  }
};

/**
 * Hook for counting active packages with SWR
 * @param {object} [options] - SWR options
 * @returns {{
 *   data: { activeCount: number, canDeactivate: boolean, canDelete: boolean, minimumRequired: number } | undefined,
 *   isLoading: boolean,
 *   isValidating: boolean,
 *   error: Error | undefined,
 *   mutate: Function
 * }}
 */
export const useGetCountActivePackages = (options = {}) => {
  const { data, error, isValidating, mutate } = useSWR(
    "/v1/bo/subscription-tm/packages/count-active",
    countActivePackages,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...options,
    }
  );

  return {
    data: data?.Data,
    message: data?.Message,
    isLoading: !error && !data,
    isValidating,
    error,
    mutate,
  };
};
