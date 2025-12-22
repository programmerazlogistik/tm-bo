import useSWR from "swr";

// --- Mock Data (API Contract Compliant) ---

const MOCK_DATA = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa1",
    packageName: "Business",
    position: 1,
    status: "RUNNING",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    userTypes: ["NEW_USER"],
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
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa2",
    packageName: "Business Pro",
    position: 2,
    status: "RUNNING",
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2025-02-01T00:00:00Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
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
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa3",
    packageName: "Enterprise",
    position: 3,
    status: "UPCOMING",
    startDate: "2025-06-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z",
    userTypes: ["NEW_USER"],
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
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa4",
    packageName: "Enterprise Pro",
    position: 4,
    status: "UPCOMING",
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z",
    userTypes: ["NEW_USER"],
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
    createdAt: "2024-04-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb1",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa5",
    packageName: "Starter Pack",
    position: 5,
    status: "RUNNING",
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-12-30T23:59:59Z",
    userTypes: ["NEW_USER"],
    promoType: {
      freeCoin: {
        bonusCoins: 25,
      },
    },
    normalPrice: 250000,
    finalPrice: 250000,
    normalCoinsEarned: 100,
    freeCoinsEarned: 25,
    finalCoinsEarned: 125,
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb2",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa6",
    packageName: "Premium Package",
    position: 6,
    status: "RUNNING",
    startDate: "2024-04-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    userTypes: ["EXISTING_USER"],
    promoType: {
      discount: {
        discountAmount: 150000,
        discountPercentage: 20.0,
      },
      freeCoin: {
        bonusCoins: 75,
      },
    },
    normalPrice: 750000,
    finalPrice: 600000,
    normalCoinsEarned: 150,
    freeCoinsEarned: 75,
    finalCoinsEarned: 225,
    createdAt: "2024-04-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb3",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa7",
    packageName: "Basic Plan",
    position: 7,
    status: "UPCOMING",
    startDate: "2025-05-01T00:00:00Z",
    endDate: "2025-11-30T23:59:59Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    promoType: {
      discount: {
        discountAmount: 50000,
        discountPercentage: 25.0,
      },
    },
    normalPrice: 200000,
    finalPrice: 150000,
    normalCoinsEarned: 75,
    freeCoinsEarned: null,
    finalCoinsEarned: 75,
    createdAt: "2024-05-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb4",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa8",
    packageName: "Gold Subscription",
    position: 8,
    status: "RUNNING",
    startDate: "2024-07-01T00:00:00Z",
    endDate: "2025-01-31T23:59:59Z",
    userTypes: ["EXISTING_USER"],
    promoType: {
      freeCoin: {
        bonusCoins: 100,
      },
    },
    normalPrice: 1000000,
    finalPrice: 1000000,
    normalCoinsEarned: 500,
    freeCoinsEarned: 100,
    finalCoinsEarned: 600,
    createdAt: "2024-07-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb5",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afa9",
    packageName: "Silver Plan",
    position: 9,
    status: "UPCOMING",
    startDate: "2025-08-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z",
    userTypes: ["NEW_USER"],
    promoType: {
      discount: {
        discountAmount: 100000,
        discountPercentage: 20.0,
      },
      freeCoin: {
        bonusCoins: 50,
      },
    },
    normalPrice: 500000,
    finalPrice: 400000,
    normalCoinsEarned: 300,
    freeCoinsEarned: 50,
    finalCoinsEarned: 350,
    createdAt: "2024-08-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb6",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afb0",
    packageName: "Platinum Package",
    position: 10,
    status: "RUNNING",
    startDate: "2024-09-01T00:00:00Z",
    endDate: "2025-03-31T23:59:59Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    promoType: {
      discount: {
        discountAmount: 300000,
        discountPercentage: 20.0,
      },
    },
    normalPrice: 1500000,
    finalPrice: 1200000,
    normalCoinsEarned: 50,
    freeCoinsEarned: null,
    finalCoinsEarned: 50,
    createdAt: "2024-09-01T10:00:00Z",
  },
];

// --- Fetcher ---

const fetcher = async (params) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...MOCK_DATA];

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

  //2. Filter by Paket
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

  // 6. Filter by Status (UPCOMING, RUNNING, ENDED)
  if (params.filters?.status && params.filters.status.length > 0) {
    filtered = filtered.filter((item) => {
      return params.filters.status.includes(item.status);
    });
  }

  // Sorting
  if (params.sorting && params.sorting.length > 0) {
    const sortConfig = params.sorting[0]; // Take the first sorting criterion
    const { id: sortField, desc: isDescending } = sortConfig;

    filtered.sort((a, b) => {
      // Get the values to compare
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle special cases for date fields
      if (sortField === "startDate" || sortField === "endDate") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle numeric fields
      if (typeof aValue === "number" && typeof bValue === "number") {
        return isDescending ? bValue - aValue : aValue - bValue;
      }

      // Handle string fields
      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue, "id-ID");
        return isDescending ? -comparison : comparison;
      }

      // Handle arrays (user, promoType)
      if (Array.isArray(aValue) && Array.isArray(bValue)) {
        const aStr = aValue.join(", ");
        const bStr = bValue.join(", ");
        const comparison = aStr.localeCompare(bStr, "id-ID");
        return isDescending ? -comparison : comparison;
      }

      // Default comparison
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

export const useGetPromoSubscriptionsList = (params) => {
  const key = `promo-subscriptions-${JSON.stringify(params)}`;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetcher(params),
    {
      revalidateOnFocus: false,
      keepPreviousData: true, // UX improvement for pagination
    }
  );

  return { data, error, isLoading, mutate };
};
