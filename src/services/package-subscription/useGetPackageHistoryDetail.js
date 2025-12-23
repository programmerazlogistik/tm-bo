"use client";

import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = false;

/**
 * Mock package history detail data
 */
const mockHistoryDetailData = {
  "hist-001": {
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
    },
    changedFields: [],
    createdAt: "2025-01-01T00:00:00Z",
  },
  "hist-002": {
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
    },
    snapshotAfter: {
      packageName: "Basic",
      description: "Paket basic untuk kebutuhan standar",
      startDate: "2025-07-01T00:00:00Z",
      period: 7,
      price: 3500000,
      coinEarned: 500,
      position: 2,
      isPopular: false,
      status: true,
      purchaseLimitEnabled: true,
      purchaseQuotaPerUser: 5,
      isUnlimitedCoin: false,
      subUserObtained: 2,
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
  "hist-003": {
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
    },
    changedFields: [],
    createdAt: "2025-01-01T00:00:00Z",
  },
};

/**
 * Get package history detail by history ID
 * @param {string} id - Package ID
 * @param {string} historyId - History ID
 * @returns {Promise<Object>} Package history detail result
 */
const getPackageHistoryDetail = async (id, historyId) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const historyDetail = mockHistoryDetailData[historyId];

    if (!historyDetail) {
      throw new Error("History not found");
    }

    return {
      Message: {
        Code: 200,
        Text: "Package history detail retrieved successfully",
      },
      Data: historyDetail,
      Type: "GET_PACKAGE_HISTORY_DETAIL_SUCCESS",
    };
  } else {
    const response = await fetcherMuatparts.get(
      `/v1/bo/subscription-tm/packages/${id}/history/${historyId}`
    );
    return response.data;
  }
};

/**
 * Hook for fetching package history detail with SWR
 * @param {string} id - Package ID
 * @param {string} historyId - History ID
 * @param {object} [swrOptions] - Additional SWR options
 * @returns {{
 *   data: { id: string, packageId: string, activity: string, actorType: string, username: string, email: string, statusBefore: boolean|null, statusAfter: boolean, snapshotBefore: Object, snapshotAfter: Object, changedFields: Array, createdAt: string } | undefined,
 *   isLoading: boolean,
 *   isValidating: boolean,
 *   error: Error | undefined,
 *   mutate: Function
 * }}
 */
export const useGetPackageHistoryDetail = (id, historyId, swrOptions = {}) => {
  const key =
    id && historyId
      ? `/v1/bo/subscription-tm/packages/${id}/history/${historyId}`
      : null;

  const { data, error, isValidating, mutate } = useSWR(
    key,
    () => getPackageHistoryDetail(id, historyId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
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
