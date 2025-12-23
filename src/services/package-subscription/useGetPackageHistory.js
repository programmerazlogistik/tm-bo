"use client";

import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = false;

/**
 * Mock package history data
 */
const mockHistoryData = {
  "pkg-001": [
    {
      id: "hist-001",
      packageId: "pkg-001",
      activity: "Create",
      actorType: "Admin",
      username: "admin",
      email: "admin@tm.com",
      statusBefore: null,
      statusAfter: true,
      snapshotBefore: {},
      snapshotAfter: {
        packageName: "Basic",
        price: 3000000,
        period: 7,
      },
      changedFields: [],
      createdAt: "2025-01-01T00:00:00Z",
    },
    {
      id: "hist-002",
      packageId: "pkg-001",
      activity: "Update",
      actorType: "Admin",
      username: "admin",
      email: "admin@tm.com",
      statusBefore: true,
      statusAfter: true,
      snapshotBefore: {
        packageName: "Basic",
        price: 3000000,
        period: 7,
      },
      snapshotAfter: {
        packageName: "Basic",
        price: 3500000,
        period: 7,
      },
      changedFields: [
        {
          field: "price",
          oldValue: 3000000,
          newValue: 3500000,
        },
      ],
      createdAt: "2025-06-01T10:00:00Z",
    },
  ],
  "pkg-002": [
    {
      id: "hist-003",
      packageId: "pkg-002",
      activity: "Create",
      actorType: "Admin",
      username: "admin",
      email: "admin@tm.com",
      statusBefore: null,
      statusAfter: true,
      snapshotBefore: {},
      snapshotAfter: {
        packageName: "Business Pro",
        price: 300000000,
        period: 90,
      },
      changedFields: [],
      createdAt: "2025-01-01T00:00:00Z",
    },
  ],
};

/**
 * Get package history with pagination
 * @param {string} id - Package ID
 * @param {object} params - Query parameters
 * @param {number} [params.page] - Page number
 * @param {number} [params.limit] - Records per page
 * @returns {Promise<Object>} Package history result
 */
const getPackageHistory = async (id, params = {}) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const history = mockHistoryData[id] || [];
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedHistory = history.slice(startIndex, endIndex);

    return {
      Message: {
        Code: 200,
        Text: "Package history retrieved successfully",
      },
      Data: {
        packageId: id,
        packageName:
          id === "pkg-001"
            ? "Basic"
            : id === "pkg-002"
              ? "Business Pro"
              : "Unknown Package",
        history: paginatedHistory,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(history.length / limit),
          totalData: history.length,
          limit: limit,
        },
      },
      Type: "GET_PACKAGE_HISTORY_SUCCESS",
    };
  } else {
    const response = await fetcherMuatparts.get(
      `/v1/bo/subscription-tm/packages/${id}/history`,
      { params }
    );
    return response.data;
  }
};

/**
 * Hook for fetching package history with SWR
 * @param {string} id - Package ID
 * @param {object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.limit=10] - Records per page
 * @param {object} [swrOptions] - Additional SWR options
 * @returns {{
 *   data: { packageId: string, packageName: string, history: Array, pagination: Object } | undefined,
 *   isLoading: boolean,
 *   isValidating: boolean,
 *   error: Error | undefined,
 *   mutate: Function
 * }}
 */
export const useGetPackageHistory = (id, params = {}, swrOptions = {}) => {
  // Build query string for SWR key
  const queryParams = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    }, {})
  ).toString();

  const key = id
    ? queryParams
      ? `/v1/bo/subscription-tm/packages/${id}/history?${queryParams}`
      : `/v1/bo/subscription-tm/packages/${id}/history`
    : null;

  const { data, error, isValidating, mutate } = useSWR(
    key,
    () => getPackageHistory(id, params),
    {
      revalidateOnFocus: false,
      ...swrOptions,
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
