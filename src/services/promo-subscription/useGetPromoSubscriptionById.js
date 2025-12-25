import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const useMock = false;
const endpoint = "/v1/bo/subscription-tm/promos";

const MOCK_DETAIL_DATA = {
  "3fa85f64-5717-4562-b3fc-2c963f66afa6": {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    promoId: "001",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa1",
    packageName: "Business",
    status: "RUNNING",
    userTypes: ["NEW_USER"],
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    promoTypes: ["DISCOUNT"],
    discount: {
      normalPrice: 150000,
      discountAmount: 50000,
      discountPercentage: 33.33,
      finalPrice: 100000,
    },
    isUnlimitedCoin: false,
    coin: {
      normalCoins: 50,
      bonusCoins: 0,
      totalCoins: 50,
    },
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  "3fa85f64-5717-4562-b3fc-2c963f66afa7": {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    promoId: "002",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa2",
    packageName: "Business Pro",
    status: "RUNNING",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2025-02-01T00:00:00Z",
    promoTypes: ["FREE_COIN"],
    discount: {
      normalPrice: 500000,
      discountAmount: 0,
      discountPercentage: 0,
      finalPrice: 500000,
    },
    isUnlimitedCoin: false,
    coin: {
      normalCoins: 150,
      bonusCoins: 100,
      totalCoins: 250,
    },
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z",
  },
  "3fa85f64-5717-4562-b3fc-2c963f66afa8": {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
    promoId: "003",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa3",
    packageName: "Enterprise",
    status: "UPCOMING",
    userTypes: ["NEW_USER"],
    startDate: "2025-06-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z",
    promoTypes: ["DISCOUNT", "FREE_COIN"],
    discount: {
      normalPrice: 1000000,
      discountAmount: 150000,
      discountPercentage: 15.0,
      finalPrice: 850000,
    },
    isUnlimitedCoin: false,
    coin: {
      normalCoins: 200,
      bonusCoins: 50,
      totalCoins: 250,
    },
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
  },
};

// --- Fetcher ---
const fetcher = async (id) => {
  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const promo = MOCK_DETAIL_DATA[id];
    if (!promo) throw new Error("Promo subscription not found");
    return promo;
  } else {
    // Real API call
    const response = await fetcherMuatparts.get(`${endpoint}/${id}`);
    return response.data?.Data;
  }
};

// --- Hook ---
export const useGetPromoSubscriptionById = (id) => {
  const key = id ? `promo-subscription-${id}` : null;

  const { data, error, isLoading, mutate } = useSWR(key, () => fetcher(id), {
    revalidateOnFocus: false,
  });

  return { data, error, isLoading, mutate };
};
