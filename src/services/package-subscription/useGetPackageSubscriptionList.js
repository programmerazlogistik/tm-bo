"use client";

import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = true;

/**
 * Mock response for package subscription list
 */
const mockPackageSubscriptionListResponse = {
  Message: {
    Code: 200,
    Text: "Data paket subscription berhasil diambil",
  },
  Data: {
    packages: [
      {
        id: "pkg-001",
        packageName: "Basic",
        description: "Paket basic untuk kebutuhan standar",
        startDate: "2025-07-01T00:00:00Z",
        period: 7,
        price: 3000000,
        coinEarned: 500,
        position: 2,
        isPopular: false,
        status: true,
        purchaseLimitEnabled: true,
        purchaseQuotaPerUser: 5,
        isUnlimitedCoin: false,
        subUserObtained: 2,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-12-01T10:00:00Z",
      },
      {
        id: "pkg-002",
        packageName: "Business Pro",
        description: "Paket untuk bisnis profesional",
        startDate: "2025-08-20T00:00:00Z",
        period: 90,
        price: 300000000,
        coinEarned: 1500,
        position: 1,
        isPopular: true,
        status: true,
        purchaseLimitEnabled: false,
        purchaseQuotaPerUser: null,
        isUnlimitedCoin: false,
        subUserObtained: 10,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-12-01T10:00:00Z",
      },
      {
        id: "pkg-003",
        packageName: "Enterprise",
        description: "Paket enterprise dengan fitur lengkap",
        startDate: "2025-12-31T00:00:00Z",
        period: 30,
        price: 300000000000,
        coinEarned: 0,
        position: 3,
        isPopular: true,
        status: true,
        purchaseLimitEnabled: true,
        purchaseQuotaPerUser: 3,
        isUnlimitedCoin: true,
        subUserObtained: 50,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-12-01T10:00:00Z",
      },
      {
        id: "pkg-004",
        packageName: "Enterprise Pro",
        description: "Paket enterprise premium",
        startDate: "2025-12-31T00:00:00Z",
        period: 30,
        price: 300000000000,
        coinEarned: 10000,
        position: 4,
        isPopular: false,
        status: false,
        purchaseLimitEnabled: false,
        purchaseQuotaPerUser: null,
        isUnlimitedCoin: false,
        subUserObtained: 100,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-12-01T10:00:00Z",
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalData: 4,
      limit: 10,
      from: 1,
      to: 4,
    },
  },
  Type: "GET_PACKAGES_SUCCESS",
};

/**
 * @typedef {object} PackageSubscriptionItem
 * @property {string} id
 * @property {string} packageName
 * @property {string} description
 * @property {string} startDate
 * @property {number} period
 * @property {number} price
 * @property {number} coinEarned
 * @property {number} position
 * @property {boolean} isPopular
 * @property {boolean} status
 * @property {boolean} purchaseLimitEnabled
 * @property {number|null} purchaseQuotaPerUser
 * @property {boolean} isUnlimitedCoin
 * @property {number} subUserObtained
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {object} PaginationInfo
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {number} totalData
 * @property {number} limit
 * @property {number} from
 * @property {number} to
 */

/**
 * @typedef {object} PackageSubscriptionListResponse
 * @property {PackageSubscriptionItem[]} packages
 * @property {PaginationInfo} pagination
 */

/**
 * Fetches package subscription list from API.
 * @param {object} params - Query parameters
 * @param {number} [params.page] - Page number (min: 1)
 * @param {number} [params.limit] - Records per page (max: 50)
 * @param {string} [params.search] - Search term (min 3 characters)
 * @param {string} [params.sort_by] - Column to sort by
 * @param {'asc'|'desc'} [params.sort_order] - Sort order
 * @returns {Promise<PackageSubscriptionListResponse>}
 */
export const getPackageSubscriptionList = async (params = {}) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockPackageSubscriptionListResponse;
  } else {
    const response = await fetcherMuatparts("/v1/bo/subscription-tm/packages", {
      method: "GET",
      params,
    });
    return response;
  }
};

/**
 * Hook for fetching package subscription list with SWR.
 * @param {object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.limit=10] - Records per page
 * @param {string} [params.search] - Search term
 * @param {string} [params.sortBy] - Column to sort by (will be converted to sort_by)
 * @param {'asc'|'desc'} [params.sortOrder] - Sort order (will be converted to sort_order)
 * @param {object} [swrOptions] - Additional SWR options
 * @returns {{
 *   data: PackageSubscriptionListResponse | undefined,
 *   isLoading: boolean,
 *   isValidating: boolean,
 *   error: Error | undefined,
 *   mutate: Function
 * }}
 */
export const useGetPackageSubscriptionList = (params = {}, swrOptions = {}) => {
  // Convert camelCase to snake_case for API
  const apiParams = {
    ...params,
    sort_by: params.sortBy,
    sort_order: params.sortOrder,
  };

  // Remove camelCase versions
  delete apiParams.sortBy;
  delete apiParams.sortOrder;

  // Build query string for SWR key
  const queryString = new URLSearchParams(
    Object.entries(apiParams).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    }, {})
  ).toString();

  const key = queryString
    ? `/v1/bo/subscription-tm/packages?${queryString}`
    : "/v1/bo/subscription-tm/packages";

  const { data, error, isValidating, mutate } = useSWR(
    key,
    () => getPackageSubscriptionList(apiParams),
    {
      revalidateOnFocus: false,
      ...swrOptions,
    }
  );

  return {
    data: data?.Data, // Returns { packages: [...], pagination: {...} }
    isLoading: !error && !data,
    isValidating,
    error,
    mutate,
    message: data?.Message,
  };
};
