import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

// --- Mock Data (API Contract Compliant) ---
const useMock = false;
const endpoint = "/v1/bo/subscription-tm/promos/active";
// 26. 03 - TM - LB - 0176
const MOCK_DATA = [
  {
    id: "34b3da79-cf07-4923-a6a6-5cfca6906daf",
    promoId: "001",
    packageId: "1e45854b-c0e6-4d92-b079-48ec60b46723",
    packageName: "coba sekali lagi di ubah",
    status: "RUNNING",
    statusLabel: "Berjalan",
    startDate: "2025-12-20T00:00:00.000Z",
    endDate: "2025-12-31T23:59:59.000Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    userTypesLabel: "User Baru, User Lama",
    promoTypes: ["DISCOUNT", "FREE_COIN"],
    promoTypesLabel: "Discount, Free Koin",
    pricing: {
      normalPrice: 1000000,
      discountAmount: 250000,
      discountPercentage: 25,
      finalPrice: 750000,
    },
    isUnlimitedCoin: false,
    coins: {
      normalCoins: 500,
      bonusCoins: 250,
      totalCoins: 750,
    },
    createdAt: "2025-12-21T02:37:50.332Z",
  },
  {
    id: "7fd0cdc3-16df-40e9-ba4e-64ef7cc4d261",
    promoId: "002",
    packageId: "620de6db-ff7a-4a4a-9744-7b080c1c23b0",
    packageName: "Ini nama paket yg berbeda",
    status: "RUNNING",
    statusLabel: "Berjalan",
    startDate: "2025-12-22T00:00:00.000Z",
    endDate: "2025-12-31T23:59:59.000Z",
    userTypes: ["NEW_USER"],
    userTypesLabel: "User Baru",
    promoTypes: ["DISCOUNT"],
    promoTypesLabel: "Discount",
    pricing: {
      normalPrice: 100000,
      discountAmount: 10000,
      discountPercentage: 10,
      finalPrice: 90000,
    },
    isUnlimitedCoin: true,
    coins: {
      normalCoins: 0,
      bonusCoins: 0,
      totalCoins: 0,
    },
    createdAt: "2025-12-21T02:50:21.334Z",
  },
  {
    id: "2528c054-dad7-4ef2-928f-fb2e02ac715b",
    promoId: "004",
    packageId: "1e45854b-c0e6-4d92-b079-48ec60b46723",
    packageName: "coba sekali lagi di ubah",
    status: "UPCOMING",
    statusLabel: "Akan Datang",
    startDate: "2026-03-01T00:00:00.000Z",
    endDate: "2026-03-20T00:00:00.000Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    userTypesLabel: "User Baru, User Lama",
    promoTypes: ["DISCOUNT", "FREE_COIN"],
    promoTypesLabel: "Discount, Free Koin",
    pricing: {
      normalPrice: 10,
      discountAmount: 0,
      discountPercentage: 20,
      finalPrice: 8,
    },
    isUnlimitedCoin: false,
    coins: {
      normalCoins: 500,
      bonusCoins: 50,
      totalCoins: 550,
    },
    createdAt: "2025-12-21T03:07:55.614Z",
  },
  {
    id: "46527fdb-cd0b-4601-a603-3a58d61020e7",
    promoId: "006",
    packageId: "1e45854b-c0e6-4d92-b079-48ec60b46723",
    packageName: "coba sekali lagi di ubah",
    status: "UPCOMING",
    statusLabel: "Akan Datang",
    startDate: "2026-09-01T00:00:00.000Z",
    endDate: "2026-09-20T00:00:00.000Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    userTypesLabel: "User Baru, User Lama",
    promoTypes: ["DISCOUNT", "FREE_COIN"],
    promoTypesLabel: "Discount, Free Koin",
    pricing: {
      normalPrice: 10,
      discountAmount: 0,
      discountPercentage: 20,
      finalPrice: 8,
    },
    isUnlimitedCoin: false,
    coins: {
      normalCoins: 500,
      bonusCoins: 50,
      totalCoins: 550,
    },
    createdAt: "2025-12-21T06:24:41.218Z",
  },
];

// --- Fetcher ---

const fetcher = async (params) => {
  // Helper maps for UI -> API values
  const mapStatus = {
    Berjalan: "RUNNING",
    "Akan Datang": "UPCOMING",
    Selesai: "ENDED",
  };

  const mapUserType = {
    "User Baru": "NEW_USER",
    "User Lama": "EXISTING_USER",
  };

  const mapPromoType = {
    Discount: "DISCOUNT",
    "Free Coin": "FREE_COIN",
  };

  if (useMock) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = [...MOCK_DATA];

    // Filter by general search term
    if (params.filters?.search && params.filters.search.length >= 3) {
      const searchTerm = params.filters.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.packageName.toLowerCase().includes(searchTerm) ||
          item.statusLabel.toLowerCase().includes(searchTerm) ||
          item.userTypesLabel.toLowerCase().includes(searchTerm) ||
          item.promoTypesLabel.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by ID
    if (params.filters?.id) {
      filtered = filtered.filter((item) =>
        item.promoId.toLowerCase().includes(params.filters.id.toLowerCase())
      );
    }

    // Filter by Paket (paketSubscription)
    if (
      params.filters?.paketSubscription &&
      params.filters.paketSubscription.length > 0
    ) {
      filtered = filtered.filter((item) =>
        params.filters.paketSubscription.includes(item.packageName)
      );
    }

    // Filter by User Types
    if (params.filters?.user && params.filters.user.length > 0) {
      const selectedUserTypes = params.filters.user
        .map((u) => mapUserType[u])
        .filter(Boolean);
      if (selectedUserTypes.length > 0) {
        filtered = filtered.filter((item) =>
          item.userTypes.some((u) => selectedUserTypes.includes(u))
        );
      }
    }

    // Filter by Promo Type
    if (params.filters?.tipePromo && params.filters.tipePromo.length > 0) {
      const selectedPromoTypes = params.filters.tipePromo
        .map((t) => mapPromoType[t])
        .filter(Boolean);

      if (selectedPromoTypes.length > 0) {
        filtered = filtered.filter((item) => {
          const hasDiscount = item.promoTypes.includes("DISCOUNT");
          const hasFreeCoin = item.promoTypes.includes("FREE_COIN");

          return selectedPromoTypes.some((type) => {
            if (type === "DISCOUNT") return hasDiscount;
            if (type === "FREE_COIN") return hasFreeCoin;
            return false;
          });
        });
      }
    }

    // Filter by Date Range
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

    // Filter by Status
    if (params.filters?.status && params.filters.status.length > 0) {
      const selectedStatuses = params.filters.status
        .map((s) => mapStatus[s])
        .filter(Boolean);
      if (selectedStatuses.length > 0) {
        filtered = filtered.filter((item) =>
          selectedStatuses.includes(item.status)
        );
      }
    }

    // Sorting
    if (params.sorting && params.sorting.length > 0) {
      const sortConfig = params.sorting[0];
      const { id: sortField, desc: isDescending } = sortConfig;

      // Map UI field names to API field names for sorting
      const getSortValue = (item, field) => {
        switch (field) {
          case "packageName":
            return item.packageName;
          case "status":
            return item.status;
          case "startDate":
            return item.startDate;
          case "endDate":
            return item.endDate;
          case "userTypes":
            return item.userTypes?.join(",");
          case "promoType":
            return item.promoTypes?.join(",");
          case "finalPrice":
            return item.pricing?.finalPrice;
          case "finalCoinsEarned":
            return item.coins?.totalCoins;
          case "promoId":
            return item.id; // API uses 'id' for promoId
          default:
            return item[field];
        }
      };

      filtered.sort((a, b) => {
        const aValue = getSortValue(a, sortField);
        const bValue = getSortValue(b, sortField);

        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue, "id-ID");
          return isDescending ? -comparison : comparison;
        }

        if (aValue < bValue) return isDescending ? 1 : -1;
        if (aValue > bValue) return isDescending ? -1 : 1;
        return 0;
      });
    }

    // Pagination
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / params.limit);
    const start = (params.page - 1) * params.limit;
    const paginatedItems = filtered.slice(start, start + params.limit);

    return {
      items: paginatedItems,
      pagination: {
        currentPage: params.page,
        totalPages,
        totalRecords,
        limit: params.limit,
        hasNextPage: params.page < totalPages,
        hasPreviousPage: params.page > 1,
      },
    };
  } else {
    // Real API Call
    const queryParams = {
      page: params.page,
      limit: params.limit,
      search:
        params.filters?.search?.length >= 3 ? params.filters.search : undefined,
      sort:
        params.sorting?.[0]?.id === "packageName"
          ? "packageName"
          : params.sorting?.[0]?.id === "status"
            ? "status"
            : params.sorting?.[0]?.id === "startDate"
              ? "startDate"
              : params.sorting?.[0]?.id === "endDate"
                ? "endDate"
                : params.sorting?.[0]?.id === "userTypes"
                  ? "userTypes"
                  : params.sorting?.[0]?.id === "promoType"
                    ? "promoType"
                    : params.sorting?.[0]?.id === "finalPrice"
                      ? "finalPrice"
                      : params.sorting?.[0]?.id === "finalCoinsEarned"
                        ? "finalCoinsEarned"
                        : params.sorting?.[0]?.id === "promoId"
                          ? "id"
                          : "id",
      order: params.sorting?.[0]?.desc ? "desc" : "asc",
      filterId: params.filters?.id,
      filterPackageIds: params.filters?.paketSubscription?.join(","),
      filterStartDate: params.filters?.startDate
        ? (() => {
            const d = new Date(params.filters.startDate);
            d.setHours(0, 0, 0, 0);
            return d.toISOString();
          })()
        : undefined,
      filterEndDate: params.filters?.endDate
        ? (() => {
            const d = new Date(params.filters.endDate);
            d.setHours(23, 59, 59, 999);
            return d.toISOString();
          })()
        : undefined,

      filterStatus: params.filters?.status?.filter(Boolean).join(","),

      filterUserTypes: params.filters?.user?.filter(Boolean).join(","),

      filterPromoTypes: params.filters?.tipePromo?.filter(Boolean).join(","),
    };

    // Remove undefined/null/empty params
    Object.keys(queryParams).forEach(
      (key) =>
        (queryParams[key] === undefined ||
          queryParams[key] === null ||
          queryParams[key] === "") &&
        delete queryParams[key]
    );

    const response = await fetcherMuatparts.get(endpoint, {
      params: queryParams,
    });

    const data = response.data?.Data;
    return {
      items: data?.items || data?.promos || [],
      pagination: data?.pagination || {},
      filterOptions: data?.filterOptions || {},
    };
  }
};

// --- Hook ---

export const useGetPromoSubscriptionsList = (params) => {
  const key = `promo-subscriptions-${JSON.stringify(params)}`;

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
