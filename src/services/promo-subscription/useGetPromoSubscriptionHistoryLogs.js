import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const useMock = false;
const endpoint = (id) => `/v1/bo/subscription-tm/promos/${id}/history`;

const MOCK_HISTORY_LOGS_DATA = {
  "3fa85f64-5717-4562-b3fc-2c963f66afa6": {
    promoId: "001",
    history: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afb1",
        promoId: "001",
        activity: "Update",
        actorType: "Admin",
        username: "admin_super",
        email: "admin@example.com",
        statusBefore: "UPCOMING",
        statusAfter: "UPCOMING",
        snapshotBefore: {},
        snapshotAfter: {},
        changedFields: [
          {
            field: "discountPercentage",
            oldValue: 10,
            newValue: 15,
          },
        ],
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afb2",
        promoId: "001",
        activity: "Create",
        actorType: "System",
        username: "system",
        email: "admin@example.com",
        statusBefore: null,
        statusAfter: "UPCOMING",
        snapshotBefore: {},
        snapshotAfter: {},
        changedFields: [],
        createdAt: "2024-01-14T09:00:00Z",
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalData: 2,
      limit: 5,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
};

// --- Fetcher ---
const fetcher = async ({ id, params }) => {
  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data = MOCK_HISTORY_LOGS_DATA["3fa85f64-5717-4562-b3fc-2c963f66afa6"];
    if (!data) return { history: [], pagination: {} };
    return data;
  } else {
    // Real API call
    const queryParams = {
      page: params?.page || 1,
      limit: Math.min(params?.limit || 5, 5),
    };
    const response = await fetcherMuatparts.get(endpoint(id), {
      params: queryParams,
    });
    return response.data?.Data;
  }
};

// --- Hook ---
export const useGetPromoSubscriptionHistoryLogs = (id, params) => {
  const key = id
    ? `promo-subscription-logs-${id}-${JSON.stringify(params)}`
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetcher({ id, params }),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data || { history: [], pagination: {} },
    error,
    loading: isLoading,
    mutate,
  };
};
