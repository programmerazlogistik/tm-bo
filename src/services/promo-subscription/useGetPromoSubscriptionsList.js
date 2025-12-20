import useSWR from "swr";

// --- Mock Data ---

const MOCK_DATA = [
  {
    id: "SUB-001",
    packageName: "Business",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-01-31T23:59:59Z",
    status: "Berjalan",
    user: ["User Baru"],
    promoType: ["Discount"],
    originalPrice: 150000,
    promoPrice: 100000,
    freeCoin: 50,
  },
  {
    id: "SUB-002",
    packageName: "Business Pro",
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2025-02-01T00:00:00Z",
    status: "Berjalan",
    user: ["User Lama", "User Baru"],
    promoType: ["Free Coin"],
    originalPrice: 500000,
    promoPrice: undefined, // No promo price
    freeCoin: "unlimited",
    bonusCoin: 100,
  },
  {
    id: "SUB-003",
    packageName: "Enterprise",
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    user: ["User Baru"],
    status: "Akan Datang",
    promoType: ["Discount", "Free Coin"],
    originalPrice: 1000000,
    promoPrice: 850000,
    freeCoin: 200,
    bonusCoin: 50,
  },
  {
    id: "SUB-004",
    packageName: "Enterprise Pro",
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z", // Future date
    status: "Akan Datang",
    user: ["User Baru"],
    promoType: ["Discount"],
    originalPrice: 100000,
    promoPrice: 90000,
    freeCoin: 10,
  },
  // Additional mock data for pagination testing
  {
    id: "SUB-005",
    packageName: "Starter Pack",
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-09-30T23:59:59Z",
    status: "Berjalan",
    user: ["User Baru"],
    promoType: ["Free Coin"],
    originalPrice: 250000,
    promoPrice: undefined,
    freeCoin: 100,
    bonusCoin: 25,
  },
  {
    id: "SUB-006",
    packageName: "Premium Package",
    startDate: "2024-04-01T00:00:00Z",
    endDate: "2024-10-31T23:59:59Z",
    status: "Berjalan",
    user: ["User Lama"],
    promoType: ["Discount", "Free Coin"],
    originalPrice: 750000,
    promoPrice: 600000,
    freeCoin: 150,
    bonusCoin: 75,
  },
  {
    id: "SUB-007",
    packageName: "Basic Plan",
    startDate: "2024-05-01T00:00:00Z",
    endDate: "2024-11-30T23:59:59Z",
    status: "Akan Datang",
    user: ["User Baru", "User Lama"],
    promoType: ["Discount"],
    originalPrice: 200000,
    promoPrice: 150000,
    freeCoin: 25,
  },
  {
    id: "SUB-008",
    packageName: "Gold Subscription",
    startDate: "2024-07-01T00:00:00Z",
    endDate: "2025-01-31T23:59:59Z",
    status: "Berjalan",
    user: ["User Lama"],
    promoType: ["Free Coin"],
    originalPrice: 1000000,
    promoPrice: undefined,
    freeCoin: 500,
    bonusCoin: 100,
  },
  {
    id: "SUB-009",
    packageName: "Silver Plan",
    startDate: "2024-08-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    status: "Akan Datang",
    user: ["User Baru"],
    promoType: ["Discount", "Free Coin"],
    originalPrice: 500000,
    promoPrice: 400000,
    freeCoin: 300,
    bonusCoin: 50,
  },
  {
    id: "SUB-010",
    packageName: "Platinum Package",
    startDate: "2024-09-01T00:00:00Z",
    endDate: "2025-03-31T23:59:59Z",
    status: "Berjalan",
    user: ["User Lama", "User Baru"],
    promoType: ["Discount"],
    originalPrice: 1500000,
    promoPrice: 1200000,
    freeCoin: 20,
  },
  {
    id: "SUB-011",
    packageName: "Diamond Subscription",
    startDate: "2024-10-01T00:00:00Z",
    endDate: "2025-04-30T23:59:59Z",
    status: "Akan Datang",
    user: ["User Lama"],
    promoType: ["Free Coin"],
    originalPrice: 2000000,
    promoPrice: undefined,
    freeCoin: "unlimited",
    bonusCoin: 200,
  },
  {
    id: "SUB-012",
    packageName: "Ultimate Plan",
    startDate: "2024-11-01T00:00:00Z",
    endDate: "2025-05-31T23:59:59Z",
    status: "Berjalan",
    user: ["User Baru"],
    promoType: ["Discount", "Free Coin"],
    originalPrice: 2500000,
    promoPrice: 2000000,
    freeCoin: 1000,
    bonusCoin: 250,
  },
  // Additional mock data for comprehensive pagination testing
  {
    id: "SUB-013",
    packageName: "Economy Package",
    startDate: "2024-12-01T00:00:00Z",
    endDate: "2025-06-30T23:59:59Z",
    status: "Akan Datang",
    user: ["User Baru"],
    promoType: ["Discount"],
    originalPrice: 100000,
    promoPrice: 75000,
    freeCoin: 10,
  },
  {
    id: "SUB-014",
    packageName: "Professional Plan",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-07-15T23:59:59Z",
    status: "Berjalan",
    user: ["User Lama"],
    promoType: ["Free Coin"],
    originalPrice: 500000,
    promoPrice: undefined,
    freeCoin: 200,
    bonusCoin: 50,
  },
  {
    id: "SUB-015",
    packageName: "Corporate Solution",
    startDate: "2024-02-15T00:00:00Z",
    endDate: "2024-08-15T23:59:59Z",
    status: "Berjalan",
    user: ["User Baru", "User Lama"],
    promoType: ["Discount", "Free Coin"],
    originalPrice: 1500000,
    promoPrice: 1200000,
    freeCoin: 500,
    bonusCoin: 100,
  },
  {
    id: "SUB-016",
    packageName: "Starter Business",
    startDate: "2024-03-15T00:00:00Z",
    endDate: "2024-09-15T23:59:59Z",
    status: "Akan Datang",
    user: ["User Baru"],
    promoType: ["Free Coin"],
    originalPrice: 300000,
    promoPrice: undefined,
    freeCoin: 75,
    bonusCoin: 25,
  },
  {
    id: "SUB-017",
    packageName: "Advanced Package",
    startDate: "2024-04-15T00:00:00Z",
    endDate: "2024-10-15T23:59:59Z",
    status: "Berjalan",
    user: ["User Lama"],
    promoType: ["Discount"],
    originalPrice: 800000,
    promoPrice: 650000,
    freeCoin: 50,
  },
  {
    id: "SUB-018",
    packageName: "Enterprise Max",
    startDate: "2024-05-15T00:00:00Z",
    endDate: "2024-11-15T23:59:59Z",
    status: "Berjalan",
    user: ["User Baru", "User Lama"],
    promoType: ["Discount", "Free Coin"],
    originalPrice: 2000000,
    promoPrice: 1700000,
    freeCoin: 750,
    bonusCoin: 150,
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
        (item.user &&
          item.user.some((u) => u.toLowerCase().includes(searchTerm))) ||
        (item.promoType &&
          item.promoType.some((t) => t.toLowerCase().includes(searchTerm)))
    );
  }

  // 2. Filter by Paket
  if (params.filters?.paket && params.filters.paket.length > 0) {
    filtered = filtered.filter((item) =>
      params.filters.paket.includes(item.packageName)
    );
  }

  // 3. Filter by User
  if (params.filters?.user && params.filters.user.length > 0) {
    filtered = filtered.filter((item) =>
      item.user.some((u) => params.filters.user.includes(u))
    );
  }

  // 4. Filter by Promo Type
  if (params.filters?.promoType && params.filters.promoType.length > 0) {
    filtered = filtered.filter((item) =>
      item.promoType.some((t) => params.filters.promoType.includes(t))
    );
  }

  // 5. Filter by Date Range
  if (params.filters?.startDate && params.filters?.endDate) {
    // Handle both Date objects and date strings
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
      // Check for date range overlap
      return itemStart <= end && itemEnd >= start;
    });
  }

  // 6. Filter by Status (Direct match with mock data)
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
