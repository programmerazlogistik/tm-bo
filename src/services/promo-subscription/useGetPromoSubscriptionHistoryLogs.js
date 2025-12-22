import useSWR from "swr";

// --- Mock Data for History Logs ---

const MOCK_HISTORY_LOGS = [
  {
    id: "LOG-001",
    lastUpdate: "2024-01-20T17:00:00Z",
    activity: "Create",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Berjalan",
  },
  {
    id: "LOG-002",
    lastUpdate: "2024-01-21T14:30:00Z",
    activity: "Update",
    by: "User",
    username: "Nandi",
    email: "nandi@gmail.com",
    status: "Berjalan",
  },
  {
    id: "LOG-003",
    lastUpdate: "2024-01-22T09:15:00Z",
    activity: "Update",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Akan Datang",
  },
  {
    id: "LOG-004",
    lastUpdate: "2024-01-23T16:45:00Z",
    activity: "Create",
    by: "User",
    username: "Nandi",
    email: "nandi@gmail.com",
    status: "Berakhir",
  },
  {
    id: "LOG-005",
    lastUpdate: "2024-01-24T11:20:00Z",
    activity: "Update",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Berjalan",
  },
  {
    id: "LOG-006",
    lastUpdate: "2024-01-25T13:00:00Z",
    activity: "Create",
    by: "User",
    username: "Nandi",
    email: "nandi@gmail.com",
    status: "Akan Datang",
  },
  {
    id: "LOG-007",
    lastUpdate: "2024-01-26T15:30:00Z",
    activity: "Update",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Berjalan",
  },
  {
    id: "LOG-008",
    lastUpdate: "2024-01-27T10:45:00Z",
    activity: "Update",
    by: "User",
    username: "Nandi",
    email: "nandi@gmail.com",
    status: "Berakhir",
  },
  {
    id: "LOG-009",
    lastUpdate: "2024-01-28T14:15:00Z",
    activity: "Create",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Akan Datang",
  },
  {
    id: "LOG-010",
    lastUpdate: "2024-01-29T12:00:00Z",
    activity: "Update",
    by: "User",
    username: "Nandi",
    email: "nandi@gmail.com",
    status: "Berjalan",
  },
  {
    id: "LOG-011",
    lastUpdate: "2024-01-30T16:30:00Z",
    activity: "Create",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Berakhir",
  },
  {
    id: "LOG-012",
    lastUpdate: "2024-01-31T09:45:00Z",
    activity: "Update",
    by: "User",
    username: "Nandi",
    email: "nandi@gmail.com",
    status: "Berjalan",
  },
  {
    id: "LOG-013",
    lastUpdate: "2024-02-01T11:30:00Z",
    activity: "Update",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Akan Datang",
  },
  {
    id: "LOG-014",
    lastUpdate: "2024-02-02T15:00:00Z",
    activity: "Create",
    by: "User",
    username: "Nandi",
    email: "nandi@gmail.com",
    status: "Berjalan",
  },
  {
    id: "LOG-015",
    lastUpdate: "2024-02-03T13:15:00Z",
    activity: "Update",
    by: "User",
    username: "Carena",
    email: "carena@gmail.com",
    status: "Berakhir",
  },
];

// --- Fetcher ---

const fetcher = async (params) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...MOCK_HISTORY_LOGS];

  // 1. Filter by general search term
  if (params.filters?.search) {
    const searchTerm = params.filters.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.activity.toLowerCase().includes(searchTerm) ||
        item.username.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm) ||
        item.status.toLowerCase().includes(searchTerm) ||
        item.by.toLowerCase().includes(searchTerm)
    );
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
      if (sortField === "lastUpdate") {
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

export const useGetPromoSubscriptionHistoryLogs = (promoId, params) => {
  const key = `promo-subscription-history-logs-${promoId}-${JSON.stringify(params)}`;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetcher(params),
    {
      revalidateOnFocus: false,
      keepPreviousData: true, // UX improvement for pagination
    }
  );

  return { data, error, loading: isLoading, mutate };
};
