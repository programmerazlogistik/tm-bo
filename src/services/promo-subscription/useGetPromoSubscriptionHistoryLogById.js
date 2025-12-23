import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

// --- Mock Data for History Log Detail ---
const useMock = false;
const endpoint = (id, historyId) =>
  `/v1/bo/subscription-tm/promos/${id}/history/${historyId}`;

const MOCK_HISTORY_LOG_DETAIL_DATA = {
  "3fa85f64-5717-4562-b3fc-2c963f66afb1": {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb1",
    promoId: "001",
    activity: "Update",
    actorType: "Admin",
    username: "admin",
    email: "admin@example.com",
    statusBefore: "UPCOMING",
    statusAfter: "UPCOMING",
    snapshotBefore: {
      packageName: "Paket Premium",
      status: "UPCOMING",
      userTypes: ["NEW_USER"],
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      promoTypes: ["DISCOUNT"],
      discount: {
        normalPrice: 1000000,
        discountAmount: 100000,
        discountPercentage: 10.0,
        finalPrice: 900000,
      },
      coin: {
        normalCoins: 100,
        bonusCoins: 0,
        totalCoins: 100,
      },
    },
    snapshotAfter: {
      packageName: "Paket Premium",
      status: "UPCOMING",
      userTypes: ["NEW_USER"],
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      promoTypes: ["DISCOUNT"],
      discount: {
        normalPrice: 1000000,
        discountAmount: 150000,
        discountPercentage: 15.0,
        finalPrice: 850000,
      },
      coin: {
        normalCoins: 100,
        bonusCoins: 0,
        totalCoins: 100,
      },
    },
    changedFields: [
      {
        field: "discountAmount",
        oldValue: 100000,
        newValue: 150000,
      },
      {
        field: "discountPercentage",
        oldValue: 10.0,
        newValue: 15.0,
      },
    ],
    createdAt: "2024-01-15T10:30:00Z",
  },
};

// --- Fetcher ---
const fetcher = async ({ id, historyId }) => {
  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data =
      MOCK_HISTORY_LOG_DETAIL_DATA["3fa85f64-5717-4562-b3fc-2c963f66afb1"];
    if (!data) throw new Error("History log not found");
    return data;
  } else {
    // Real API call
    const response = await fetcherMuatparts.get(endpoint(id, historyId));
    return response.data?.Data;
  }
};

// --- Hook ---
export const useGetPromoSubscriptionHistoryLogById = ({ id, historyId }) => {
  const key =
    id && historyId
      ? `promo-subscription-history-log-${id}-${historyId}`
      : null;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetcher({ id, historyId }),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, mutate };
};
