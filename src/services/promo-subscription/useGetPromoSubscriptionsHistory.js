import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

// --- Mock Data for History (API Contract Compliant - ENDED Status Only) ---
const useMock = false;
const endpoint = "/v1/bo/subscription-tm/promos/history";

const MOCK_HISTORY_DATA = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc1",
    promoId: "001",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc1",
    packageName: "Basic",
    position: 1,
    status: "ENDED",
    statusLabel: "Selesai",
    startDate: "2023-01-01T00:00:00Z",
    endDate: "2023-06-30T23:59:59Z",
    userTypes: ["NEW_USER"],
    userTypesLabel: "User Baru",
    promoType: {
      discount: {
        discountAmount: 25000,
        discountPercentage: 25.0,
      },
    },
    promoTypesLabel: "Discount",
    normalPrice: 100000,
    finalPrice: 75000,
    normalCoinsEarned: 25,
    freeCoinsEarned: null,
    finalCoinsEarned: 25,
    createdAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc2",
    promoId: "002",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc2",
    packageName: "Business",
    position: 2,
    status: "ENDED",
    statusLabel: "Selesai",
    startDate: "2023-02-01T00:00:00Z",
    endDate: "2023-07-31T23:59:59Z",
    userTypes: ["NEW_USER", "EXISTING_USER"],
    userTypesLabel: "User Baru, User Lama",
    promoType: {
      freeCoin: {
        bonusCoins: 15,
      },
    },
    promoTypesLabel: "Free Coin",
    normalPrice: 150000,
    finalPrice: 150000,
    normalCoinsEarned: 50,
    freeCoinsEarned: 15,
    finalCoinsEarned: 65,
    createdAt: "2023-02-01T10:00:00Z",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afc3",
    promoId: "003",
    packageId: "1a85f64-5717-4562-b3fc-2c963f66afc3",
    packageName: "Business Pro",
    position: 3,
    status: "ENDED",
    statusLabel: "Selesai",
    startDate: "2023-03-01T00:00:00Z",
    endDate: "2023-08-31T23:59:59Z",
    userTypes: ["NEW_USER"],
    userTypesLabel: "User Baru",
    promoType: {
      discount: {
        discountAmount: 100000,
        discountPercentage: 20.0,
      },
      freeCoin: {
        bonusCoins: 30,
      },
    },
    promoTypesLabel: "Discount, Free Coin",
    normalPrice: 500000,
    finalPrice: 400000,
    normalCoinsEarned: 100,
    freeCoinsEarned: 30,
    finalCoinsEarned: 130,
    createdAt: "2023-03-01T10:00:00Z",
  },
];

// --- Fetcher ---

const fetcher = async (params) => {
  // Helper maps for UI -> API values
  const mapUserType = {
    "User Baru": "NEW_USER",
    "User Lama": "EXISTING_USER",
  };

  const mapPromoType = {
    Discount: "DISCOUNT",
    "Free Coin": "FREE_COIN",
  };

  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = [...MOCK_HISTORY_DATA];

    // 1. Filter by general search term
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
          const hasDiscount = item.promoType.discount !== undefined;
          const hasFreeCoin = item.promoType.freeCoin !== undefined;

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

    // Sorting
    if (params.sorting && params.sorting.length > 0) {
      const sortConfig = params.sorting[0];
      const { id: sortField, desc: isDescending } = sortConfig;

      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Map sorting fields if necessary
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
      sort: params.sorting?.[0]?.id,
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

      filterUserTypes: params.filters?.user
        ?.map((u) => mapUserType[u])
        .filter(Boolean)
        .join(","),

      filterPromoTypes: params.filters?.tipePromo
        ?.map((t) => mapPromoType[t] || t)
        .filter(Boolean)
        .join(","),
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
    };
  }
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
