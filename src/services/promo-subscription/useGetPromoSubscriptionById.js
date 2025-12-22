import useSWR from "swr";

// Mock function to simulate API call
const fetchPromoSubscriptionById = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data based on API Contract structure
  const mockData = {
    "3fa85f64-5717-4562-b3fc-2c963f66afa6": {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      packageId: "1a85f64-5717-4562-b3fc-2c963f66afa1",
      packageName: "Business",
      packagePrice: 150000,
      packageCredit: 50,
      position: 1,
      status: "RUNNING",
      userTypes: ["NEW_USER"],
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      promoType: {
        discount: {
          discountAmount: 50000,
          discountPercentage: 33.33,
        },
      },
      normalPrice: 150000,
      finalPrice: 100000,
      normalCoinsEarned: 50,
      freeCoinsEarned: null,
      finalCoinsEarned: 50,
      allowCancel: false,
      allowEdit: true,
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
    },
    "3fa85f64-5717-4562-b3fc-2c963f66afa7": {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      packageId: "1a85f64-5717-4562-b3fc-2c963f66afa2",
      packageName: "Business Pro",
      packagePrice: 500000,
      packageCredit: 150,
      position: 2,
      status: "RUNNING",
      userTypes: ["NEW_USER", "EXISTING_USER"],
      startDate: "2024-02-01T00:00:00Z",
      endDate: "2025-02-01T00:00:00Z",
      promoType: {
        freeCoin: {
          bonusCoins: 100,
        },
      },
      normalPrice: 500000,
      finalPrice: 500000,
      normalCoinsEarned: 150,
      freeCoinsEarned: 100,
      finalCoinsEarned: 250,
      allowCancel: false,
      allowEdit: true,
      createdAt: "2024-02-01T10:00:00Z",
      updatedAt: "2024-02-01T10:00:00Z",
    },
    "3fa85f64-5717-4562-b3fc-2c963f66afa8": {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      packageId: "1a85f64-5717-4562-b3fc-2c963f66afa3",
      packageName: "Enterprise",
      packagePrice: 1000000,
      packageCredit: 200,
      position: 3,
      status: "UPCOMING",
      userTypes: ["NEW_USER"],
      startDate: "2025-06-01T00:00:00Z",
      endDate: "2025-12-31T23:59:59Z",
      promoType: {
        discount: {
          discountAmount: 150000,
          discountPercentage: 15.0,
        },
        freeCoin: {
          bonusCoins: 50,
        },
      },
      normalPrice: 1000000,
      finalPrice: 850000,
      normalCoinsEarned: 200,
      freeCoinsEarned: 50,
      finalCoinsEarned: 250,
      allowCancel: true,
      allowEdit: true,
      createdAt: "2024-03-01T10:00:00Z",
      updatedAt: "2024-03-01T10:00:00Z",
    },
    "3fa85f64-5717-4562-b3fc-2c963f66afa9": {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
      packageId: "1a85f64-5717-4562-b3fc-2c963f66afa4",
      packageName: "Enterprise Pro",
      packagePrice: 100000,
      packageCredit: 25,
      position: 4,
      status: "UPCOMING",
      userTypes: ["NEW_USER"],
      startDate: "2025-01-01T00:00:00Z",
      endDate: "2025-12-31T23:59:59Z",
      promoType: {
        discount: {
          discountAmount: 10000,
          discountPercentage: 10.0,
        },
      },
      normalPrice: 100000,
      finalPrice: 90000,
      normalCoinsEarned: 25,
      freeCoinsEarned: null,
      finalCoinsEarned: 25,
      allowCancel: true,
      allowEdit: true,
      createdAt: "2024-04-01T10:00:00Z",
      updatedAt: "2024-04-01T10:00:00Z",
    },
  };

  const promo = mockData[id];

  if (!promo) {
    throw new Error("Promo subscription not found");
  }

  return promo;
};

export const useGetPromoSubscriptionById = (id) => {
  const key = id ? `promo-subscription-${id}` : null;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetchPromoSubscriptionById(id),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, mutate };
};
