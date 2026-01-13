import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const USE_MOCK = false;

/**
 * Mock data for package subscription details
 */
const mockPackageDetails = {
  "pkg-001": {
    id: "pkg-001",
    packageName: "Basic",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    startDate: "2025-07-01T00:00:00Z",
    period: 7,
    price: 3000000,
    coinEarned: 500,
    position: 2,
    isPopular: false,
    status: true,
    isLimitedPurchase: true,
    maxPurchasePerUser: 5,
    isUnlimitedCoin: false,
    subUsersEarned: 2,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-12-01T10:00:00Z",
  },
  "pkg-002": {
    id: "pkg-002",
    packageName: "Business Pro",
    description:
      "Package for growing businesses with advanced features and support.",
    startDate: "2025-08-20T00:00:00Z",
    period: 90,
    price: 300000000,
    coinEarned: 1500,
    position: 1,
    isPopular: true,
    status: true,
    isLimitedPurchase: false,
    maxPurchasePerUser: null,
    isUnlimitedCoin: false,
    subUsersEarned: 10,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-12-01T10:00:00Z",
  },
  "pkg-003": {
    id: "pkg-003",
    packageName: "Enterprise",
    description: "Full-featured enterprise solution with unlimited resources.",
    startDate: "2025-12-31T00:00:00Z",
    period: 30,
    price: 300000000000,
    coinEarned: 0,
    position: 3,
    isPopular: true,
    status: true,
    isLimitedPurchase: true,
    maxPurchasePerUser: 3,
    isUnlimitedCoin: true,
    subUsersEarned: 50,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-12-01T10:00:00Z",
  },
  "pkg-004": {
    id: "pkg-004",
    packageName: "Enterprise Pro",
    description:
      "Premium enterprise package with priority support and custom features.",
    startDate: "2025-12-31T00:00:00Z",
    period: 30,
    price: 300000000000,
    coinEarned: 10000,
    position: 4,
    isPopular: false,
    status: false,
    isLimitedPurchase: false,
    maxPurchasePerUser: null,
    isUnlimitedCoin: false,
    subUsersEarned: 100,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-12-01T10:00:00Z",
  },
};

export const useGetPackageSubscriptionDetail = (id) => {
  const fetcher = async (url) => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const packageId = url.split("/").pop();
      const mockData = mockPackageDetails[packageId];

      if (!mockData) {
        throw new Error("Package not found");
      }

      return {
        Message: {
          Code: 200,
          Text: "Detail paket berhasil diambil",
        },
        Data: mockData,
        Type: "GET_PACKAGE_DETAIL_SUCCESS",
      };
    } else {
      const response = await fetcherMuatparts.get(url);
      return response.data;
    }
  };

  const { data, error, isLoading, mutate } = useSWR(
    id ? `/v1/bo/subscription-tm/packages/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data?.Data,
    message: data?.Message,
    error,
    isLoading,
    mutate,
  };
};
