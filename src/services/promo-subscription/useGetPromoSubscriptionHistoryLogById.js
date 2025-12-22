import useSWR from "swr";

// Mock data for history log detail
const MOCK_HISTORY_LOG_DETAIL = {
  "LOG-001": {
    id: "LOG-001",
    lastUpdate: "2024-01-20T17:00:00Z",
    activity: "Create",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Berjalan",
    // Promo data snapshot at the time of this log
    packageName: "Business",
    userType: ["User Baru"],
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-01-31T23:59:59Z",
    promoType: ["Discount"],
    normalPrice: 150000,
    discountAmount: 50000,
    discountPercentage: 33,
    discountedPrice: 100000,
    normalCoin: 50,
    bonusCoin: 0,
    totalCoin: 50,
  },
  "LOG-002": {
    id: "LOG-002",
    lastUpdate: "2024-01-21T14:30:00Z",
    activity: "Update",
    by: "User",
    username: "Nandi",
    email: "nandi@gmail.com",
    status: "Berjalan",
    packageName: "Business Pro",
    userType: ["User Lama", "User Baru"],
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2025-02-01T00:00:00Z",
    promoType: ["Free Coin"],
    normalPrice: 500000,
    discountAmount: 0,
    discountPercentage: 0,
    discountedPrice: 500000,
    normalCoin: 100,
    bonusCoin: 50,
    totalCoin: 150,
  },
  "LOG-003": {
    id: "LOG-003",
    lastUpdate: "2024-01-22T09:15:00Z",
    activity: "Update",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Akan Datang",
    packageName: "Enterprise",
    userType: ["User Baru"],
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    promoType: ["Discount", "Free Coin"],
    normalPrice: 1000000,
    discountAmount: 150000,
    discountPercentage: 15,
    discountedPrice: 850000,
    normalCoin: 200,
    bonusCoin: 50,
    totalCoin: 250,
  },
  "LOG-004": {
    id: "LOG-004",
    lastUpdate: "2024-01-23T16:45:00Z",
    activity: "Create",
    by: "User",
    username: "Nandi",
    email: "nandi@gmail.com",
    status: "Berakhir",
    packageName: "Basic",
    userType: ["User Baru"],
    startDate: "2023-01-01T00:00:00Z",
    endDate: "2023-06-30T23:59:59Z",
    promoType: ["Discount"],
    normalPrice: 100000,
    discountAmount: 25000,
    discountPercentage: 25,
    discountedPrice: 75000,
    normalCoin: 25,
    bonusCoin: 0,
    totalCoin: 25,
  },
};

const fetcher = async (logId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const logDetail = MOCK_HISTORY_LOG_DETAIL[logId];

  if (!logDetail) {
    throw new Error("History log not found");
  }

  return logDetail;
};

export const useGetPromoSubscriptionHistoryLogById = (logId) => {
  const { data, error, isLoading, mutate } = useSWR(
    logId ? `promo-subscription-history-log-${logId}` : null,
    () => fetcher(logId),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, mutate };
};
