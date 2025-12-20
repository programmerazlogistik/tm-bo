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
    Text: "OK",
  },
  Data: [
    {
      id: "pkg-001",
      packageName: "Basic",
      position: 1,
      startDate: "2025-07-01T00:00:00.000Z",
      period: "7 Hari",
      price: 30000000,
      coin: 150,
      isPopular: false,
      status: true,
      createdBy: "admin",
    },
    {
      id: "pkg-002",
      packageName: "Business Pro",
      position: 2,
      startDate: "2025-08-20T00:00:00.000Z",
      period: "90 Hari",
      price: 300000000,
      coin: 1500,
      isPopular: false,
      status: true,
      createdBy: "admin",
    },
    {
      id: "pkg-003",
      packageName: "Enterprise",
      position: 3,
      startDate: "2025-12-31T00:00:00.000Z",
      period: "30 Hari",
      price: 300000000000,
      coin: null, // Unlimited
      isPopular: true,
      status: true,
      createdBy: "admin",
    },
    {
      id: "pkg-004",
      packageName: "Enterprise Pro",
      position: 4,
      startDate: "2025-12-31T00:00:00.000Z",
      period: "30 Hari",
      price: 300000000000,
      coin: 10000,
      isPopular: false,
      status: false,
      createdBy: "admin",
    },
  ],
  Pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 4,
    recordsPerPage: 10,
    hasNext: false,
    hasPrev: false,
  },
  Type: "PACKAGE_SUBSCRIPTION_LIST",
};

/**
 * @typedef {object} PackageSubscriptionItem
 * @property {string} id
 * @property {string} packageName
 * @property {number} position
 * @property {string} startDate
 * @property {string} period
 * @property {number} price
 * @property {number|null} coin - null means unlimited
 * @property {boolean} isPopular
 * @property {boolean} status
 * @property {string|null} createdBy
 */

/**
 * @typedef {object} PaginationInfo
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {number} totalRecords
 * @property {number} recordsPerPage
 * @property {boolean} hasNext
 * @property {boolean} hasPrev
 */

/**
 * @typedef {object} PackageSubscriptionListResponse
 * @property {PackageSubscriptionItem[]} Data
 * @property {PaginationInfo} Pagination
 */

/**
 * Fetches package subscription list from API.
 * @param {object} params - Query parameters
 * @param {number} [params.page] - Page number
 * @param {number} [params.limit] - Records per page
 * @param {string} [params.search] - Search term
 * @param {string} [params.sortBy] - Column to sort by
 * @param {'asc'|'desc'} [params.sortOrder] - Sort order
 * @returns {Promise<PackageSubscriptionListResponse>}
 */
export const getPackageSubscriptionList = async (params = {}) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockPackageSubscriptionListResponse;
  } else {
    const response = await fetcherMuatparts.get("/api/package-subscription", {
      params,
    });
    return response.data;
  }
};

/**
 * Hook for fetching package subscription list with SWR.
 * @param {object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.limit=10] - Records per page
 * @param {string} [params.search] - Search term
 * @param {string} [params.sortBy] - Column to sort by
 * @param {'asc'|'desc'} [params.sortOrder] - Sort order
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
  // Build query string for SWR key
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    }, {})
  ).toString();

  const key = queryString
    ? `/api/package-subscription?${queryString}`
    : "/api/package-subscription";

  const { data, error, isValidating, mutate } = useSWR(
    key,
    () => getPackageSubscriptionList(params),
    {
      revalidateOnFocus: false,
      ...swrOptions,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isValidating,
    error,
    mutate,
  };
};
