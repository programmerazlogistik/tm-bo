"use client";

/* eslint-disable no-undef */
import useSWR from "swr";

const sellersData = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    companyName: "PT. Maju Mundur",
    email: "majumundur@gmail.com",
    city: "Kota Surabaya",
    businessType: "Perseroan",
    businessCategory: "Manufaktur",
    totalActiveProducts: 30,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "active",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    companyName: "PT. Maju Mapan",
    email: "majumapan@gmail.com",
    city: "Kab. Sidoarjo",
    businessType: "CV",
    businessCategory: "ATPM",
    totalActiveProducts: 10,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "active",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    companyName: "PT. Jaya Abadi",
    email: "jayabadi@gmail.com",
    city: "Kab. Malang",
    businessType: "PT",
    businessCategory: "Importir",
    totalActiveProducts: 15,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "pending",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    companyName: "PT. Agung Sejahtera",
    email: "agungsejah@gmail.com",
    city: "Kab. Lamongan",
    businessType: "Firma",
    businessCategory: "ATPM",
    totalActiveProducts: 5,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "draft",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    companyName: "PT. Budi Mulya",
    email: "budmul@gmail.com",
    city: "Kab. Jombang",
    businessType: "PT",
    businessCategory: "Manufaktur",
    totalActiveProducts: 5,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "active",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    companyName: "PT. Indo Perkasa",
    email: "indoper@gmail.com",
    city: "Kab. Lamongan",
    businessType: "PT",
    businessCategory: "Manufaktur",
    totalActiveProducts: 10,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "rejected",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    companyName: "PT. Jaya Teknik",
    email: "jayatek@gmail.com",
    city: "Kab. Lamongan",
    businessType: "PT",
    businessCategory: "Manufaktur",
    totalActiveProducts: 20,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "active",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    companyName: "PT. Tekno Baru Abadi",
    email: "teknobardi@gmail.com",
    city: "Kab. Lamongan",
    businessType: "PT",
    businessCategory: "ATPM",
    totalActiveProducts: 10,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "pending",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    companyName: "PT. Sukses Murni Jaya",
    email: "suksesmunjay@gmail.com",
    city: "Kab. Lamongan",
    businessType: "CV",
    businessCategory: "ATPM",
    totalActiveProducts: 15,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "active",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    companyName: "PT. Sekawan Lima",
    email: "sekawanlim@gmail.com",
    city: "Kab. Lamongan",
    businessType: "Firma",
    businessCategory: "Distributor",
    totalActiveProducts: 15,
    registrationDate: "2025-02-20T20:00:00Z",
    status: "pending",
  },
];

const sortData = (data, sorting) => {
  if (!sorting.length) {
    return data;
  }
  const { id, desc } = sorting[0];
  return [...data].sort((a, b) => {
    const valA = a[id];
    const valB = b[id];
    if (valA < valB) return desc ? 1 : -1;
    if (valA > valB) return desc ? -1 : 1;
    return 0;
  });
};

const fetcherCompanies = async ({
  pageIndex,
  pageSize,
  sorting,
  currentStatus,
}) => {
  console.log("Fetching data with:", {
    pageIndex,
    pageSize,
    sorting,
    currentStatus,
  });
  await new Promise((res) => setTimeout(res, 300));

  // Apply status filter if currentStatus is set
  let filteredData = sellersData;
  if (currentStatus) {
    filteredData = sellersData.filter((item) => item.status === currentStatus);
  }

  const sortedData = sortData(filteredData, sorting);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = pageIndex * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  // Calculate summary counts
  const summary = {
    totalActive: sellersData.filter((item) => item.status === "active").length,
    totalPending: sellersData.filter((item) => item.status === "pending")
      .length,
    totalDraft: sellersData.filter((item) => item.status === "draft").length,
    totalRejected: sellersData.filter((item) => item.status === "rejected")
      .length,
  };

  return {
    Message: { Code: 200, Text: "Domestic sellers retrieved successfully" },
    Data: {
      sellers: paginatedData,
      pagination: {
        currentPage: pageIndex + 1,
        totalPages: totalPages,
        totalItems: totalItems,
        itemsPerPage: pageSize,
        hasNext: pageIndex + 1 < totalPages,
        hasPrev: pageIndex > 0,
      },
      summary,
    },
    Type: "DOMESTIC_SELLERS_LIST",
  };
};

export const useGetCompanies = ({ pagination, sorting, currentStatus }) => {
  const swrKey = `companies-list-${JSON.stringify({ pagination, sorting, currentStatus })}`;

  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    () => fetcherCompanies({ ...pagination, sorting, currentStatus }),
    { revalidateOnFocus: false }
  );

  return {
    data: data?.Data,
    error,
    isLoading,
    mutate,
  };
};
