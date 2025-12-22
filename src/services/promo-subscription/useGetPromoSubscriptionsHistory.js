import useSWR from "swr";

// --- Mock Data for History (API Contract Compliant - ENDED Status Only) ---

const MOCK_HISTORY_DATA = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc1",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc1",
    packageName: "Basic",
    position: 1,
    status: "ENDED",
    startDate: "2023-01-01T00:00:00Z",
    endDate: "2023-06-30T23:59:59Z",
    userTypes: ["NEW_USER"],
    promoType: {
      discount: {
        discountAmount: 25000,
        discountPercentage: 25.0,
      },
    },
    normalPrice: 100000,
    finalPrice: 75000,
    normalCoinsEarned: 25,
    freeCoinsEarned: null,
    finalCoinsEarned: 25,
    createdAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc2",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc2",
    packageName: "Business",
    position: 2,
    status: "ENDED",
    startDate: "2023-02-01T00:00:00Z",
    endDate: "2023-07-31T23:59:59Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    promoType: {
      freeCoin: {
        bonusCoins: 15,
      },
    },
    normalPrice: 150000,
    finalPrice: 150000,
    normalCoinsEarned: 50,
    freeCoinsEarned: 15,
    finalCoinsEarned: 65,
    createdAt: "2023-02-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc3",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc3",
    packageName: "Business Pro",
    position: 3,
    status: "ENDED",
    startDate: "2023-03-01T00:00:00Z",
    endDate: "2023-08-31T23:59:59Z",
    userTypes: ["NEW_USER"],
    promoType: {
      discount: {
        discountAmount: 100000,
        discountPercentage: 20.0,
      },
      freeCoin: {
        bonusCoins: 30,
      },
    },
    normalPrice: 500000,
    finalPrice: 400000,
    normalCoinsEarned: 100,
    freeCoinsEarned: 30,
    finalCoinsEarned: 130,
    createdAt: "2023-03-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc4",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc4",
    packageName: "Enterprise",
    position: 4,
    status: "ENDED",
    startDate: "2023-04-01T00:00:00Z",
    endDate: "2023-09-30T23:59:59Z",
    userTypes: ["EXISTING_USER"],
    promoType: {
      discount: {
        discountAmount: 150000,
        discountPercentage: 15.0,
      },
    },
    normalPrice: 1000000,
    finalPrice: 850000,
    normalCoinsEarned: 200,
    freeCoinsEarned: null,
    finalCoinsEarned: 200,
    createdAt: "2023-04-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc5",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc5",
    packageName: "Enterprise Pro",
    position: 5,
    status: "ENDED",
    startDate: "2023-05-01T00:00:00Z",
    endDate: "2023-10-31T23:59:59Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    promoType: {
      freeCoin: {
        bonusCoins: 200,
      },
    },
    normalPrice: 1500000,
    finalPrice: 1500000,
    normalCoinsEarned: 500,
    freeCoinsEarned: 200,
    finalCoinsEarned: 700,
    createdAt: "2023-05-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc6",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc6",
    packageName: "Starter Pack",
    position: 6,
    status: "ENDED",
    startDate: "2023-06-01T00:00:00Z",
    endDate: "2023-11-30T23:59:59Z",
    userTypes: ["NEW_USER"],
    promoType: {
      discount: {
        discountAmount: 20000,
        discountPercentage: 20.0,
      },
    },
    normalPrice: 100000,
    finalPrice: 80000,
    normalCoinsEarned: 30,
    freeCoinsEarned: null,
    finalCoinsEarned: 30,
    createdAt: "2023-06-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc7",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc7",
    packageName: "Premium Package",
    position: 7,
    status: "ENDED",
    startDate: "2023-07-01T00:00:00Z",
    endDate: "2023-12-31T23:59:59Z",
    userTypes: ["EXISTING_USER"],
    promoType: {
      discount: {
        discountAmount: 30000,
        discountPercentage: 20.0,
      },
      freeCoin: {
        bonusCoins: 20,
      },
    },
    normalPrice: 150000,
    finalPrice: 120000,
    normalCoinsEarned: 50,
    freeCoinsEarned: 20,
    finalCoinsEarned: 70,
    createdAt: "2023-07-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc8",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc8",
    packageName: "Gold Subscription",
    position: 8,
    status: "ENDED",
    startDate: "2023-08-01T00:00:00Z",
    endDate: "2024-01-31T23:59:59Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    promoType: {
      freeCoin: {
        bonusCoins: 50,
      },
    },
    normalPrice: 500000,
    finalPrice: 500000,
    normalCoinsEarned: 100,
    freeCoinsEarned: 50,
    finalCoinsEarned: 150,
    createdAt: "2023-08-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc9",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc9",
    packageName: "Silver Plan",
    position: 9,
    status: "ENDED",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2024-02-29T23:59:59Z",
    userTypes: ["NEW_USER"],
    promoType: {
      discount: {
        discountAmount: 200000,
        discountPercentage: 20.0,
      },
    },
    normalPrice: 1000000,
    finalPrice: 800000,
    normalCoinsEarned: 150,
    freeCoinsEarned: null,
    finalCoinsEarned: 150,
    createdAt: "2023-09-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afca",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afca",
    packageName: "Platinum Package",
    position: 10,
    status: "ENDED",
    startDate: "2023-10-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    userTypes: ["EXISTING_USER"],
    promoType: {
      discount: {
        discountAmount: 300000,
        discountPercentage: 20.0,
      },
      freeCoin: {
        bonusCoins: 100,
      },
    },
    normalPrice: 1500000,
    finalPrice: 1200000,
    normalCoinsEarned: 300,
    freeCoinsEarned: 100,
    finalCoinsEarned: 400,
    createdAt: "2023-10-01T10:00:00Z",
  },
];

// --- Fetcher ---

const fetcher = async (params) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...MOCK_HISTORY_DATA];

  // 1. Filter by general search term
  if (params.filters?.search) {
    const searchTerm = params.filters.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.id.toLowerCase().includes(searchTerm) ||
        item.packageName.toLowerCase().includes(searchTerm) ||
        (item.userTypes &&
          item.userTypes.some((u) => u.toLowerCase().includes(searchTerm)))
    );
  }

  // 2. Filter by Paket
  if (params.filters?.paket && params.filters.paket.length > 0) {
    filtered = filtered.filter((item) =>
      params.filters.paket.includes(item.packageName)
    );
  }

  // 3. Filter by User Types (NEW_USER, EXISTING_USER)
  if (params.filters?.user && params.filters.user.length > 0) {
    filtered = filtered.filter((item) =>
      item.userTypes.some((u) => params.filters.user.includes(u))
    );
  }

  // 4. Filter by Promo Type (DISCOUNT, FREE_COIN)
  if (params.filters?.promoType && params.filters.promoType.length > 0) {
    filtered = filtered.filter((item) => {
      const hasDiscount = item.promoType.discount !== undefined;
      const hasFreeCoin = item.promoType.freeCoin !== undefined;

      return params.filters.promoType.some((type) => {
        if (type === "DISCOUNT") return hasDiscount;
        if (type === "FREE_COIN") return hasFreeCoin;
        return false;
      });
    });
  }

  // 5. Filter by Date Range
  if (params.filters?.startDate && params.filters?.endDate) {
    const start =
      params.filters.startDate instanceof Date
        ? params.filters.startDate.getTime()
        : new Date(params.filters.startDate).getTime();
    const end =
      params.filters.endDate instanceof Date
        ? params.filters.endDate.getTime()
        : new Date(params.filters.endDate).getTime();

    filtered = filtered.filter((item) => {
      const itemStart = new Date(item.startDate).getTime();
      const itemEnd = new Date(item.endDate).getTime();
      return itemStart <= end && itemEnd >= start;
    });
  }

  // Sorting
  if (params.sorting && params.sorting.length > 0) {
    const sortConfig = params.sorting[0];
    const { id: sortField, desc: isDescending } = sortConfig;

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "startDate" || sortField === "endDate") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return isDescending ? bValue - aValue : aValue - bValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue, "id-ID");
        return isDescending ? -comparison : comparison;
      }

      if (Array.isArray(aValue) && Array.isArray(bValue)) {
        const aStr = aValue.join(", ");
        const bStr = bValue.join(", ");
        const comparison = aStr.localeCompare(bStr, "id-ID");
        return isDescending ? -comparison : comparison;
      }

      if (aValue < bValue) return isDescending ? 1 : -1;
      if (aValue > bValue) return isDescending ? -1 : 1;
      return 0;
    });
  }

  // Pagination
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / params.limit);
  const start = (params.page - 1) * params.limit;
  const paginatedItems = filtered.slice(start, start + params.limit);

  return {
    items: paginatedItems,
    pagination: {
      currentPage: params.page,
      totalPages,
      totalItems,
      itemsPerPage: params.limit,
    },
  };
};

// --- Hook ---

export const useGetPromoSubscriptionsHistory = (params) => {
  const key = `promo-subscriptions-history-${JSON.stringify(params)}`;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetcher(params),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return { data, error, loading: isLoading, mutate };
};
