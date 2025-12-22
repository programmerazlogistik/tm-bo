"use client";

import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = true;

/**
 * Mock popular package data
 */
const mockPopularPackage = {
  id: "pkg-002",
  name: "Business Pro",
};

/**
 * Check if popular package exists in the system
 * @param {string} [excludeId] - ID to exclude (for edit mode)
 * @returns {Promise<Object>} Popular package check result
 */
const checkPopularPackage = async (excludeId = null) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // If excludeId matches the popular package, return no popular exists
    // This allows editing the current popular package
    const hasPopular = excludeId !== mockPopularPackage.id;

    if (hasPopular) {
      return {
        Message: {
          Code: 200,
          Text: "Paket populer ditemukan",
        },
        Data: {
          hasPopular: true,
          popularPackage: mockPopularPackage,
        },
        Type: "CHECK_POPULAR_EXISTS",
      };
    } else {
      return {
        Message: {
          Code: 200,
          Text: "Tidak ada paket populer",
        },
        Data: {
          hasPopular: false,
          popularPackage: null,
        },
        Type: "CHECK_POPULAR_NOT_EXISTS",
      };
    }
  } else {
    const params = {};
    if (excludeId) {
      params.excludeId = excludeId;
    }

    return await fetcherMuatparts(
      "/v1/bo/subscription-tm/packages/check-popular",
      {
        method: "GET",
        params,
      }
    );
  }
};

/**
 * Hook for checking if popular package exists with SWR
 * @param {string} [excludeId] - ID to exclude (for edit mode)
 * @param {object} [options] - SWR options
 * @returns {{
 *   data: { hasPopular: boolean, popularPackage: { id: string, name: string } | null } | undefined,
 *   isLoading: boolean,
 *   isValidating: boolean,
 *   error: Error | undefined,
 *   mutate: Function
 * }}
 */
export const useGetPopularPackage = (excludeId = null, options = {}) => {
  // Build query string for SWR key
  const queryParams = new URLSearchParams();
  if (excludeId) queryParams.append("excludeId", excludeId);

  const queryString = queryParams.toString();
  const key = queryString
    ? `/v1/bo/subscription-tm/packages/check-popular?${queryString}`
    : "/v1/bo/subscription-tm/packages/check-popular";

  const { data, error, isValidating, mutate } = useSWR(
    key,
    () => checkPopularPackage(excludeId),
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
