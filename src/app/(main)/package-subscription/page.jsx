"use client";

import { useMemo, useState } from "react";

import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

import { useGetPackageSubscriptionList } from "@/services/package-subscription/useGetPackageSubscriptionList";

import PackageSubscriptionList from "@/container/PackageSubscription/List/PackageSubscriptionList";

/**
 * Transform API data to match component expectations
 * @param {Object} item - API item
 * @returns Transformed package object
 */
const transformPackageItem = (item) => {
  // Format date
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return format(date, "dd-MMM-yyyy", { locale: idLocale });
    } catch {
      return dateStr || "-";
    }
  };

  return {
    id: item.id,
    isActive: item.status || false,
    posisi: item.position || "-",
    namaPaket: item.packageName || "-",
    mulaiBerlaku: formatDate(item.startDate),
    periode: item.period ? `${item.period} Hari` : "-",
    price: item.price || 0,
    koin: item.isUnlimitedCoin ? "Unlimited" : item.coinEarned || 0,
    terpopuler: item.isPopular ? "Ya" : "Tidak",
  };
};

export default function PackageSubscriptionPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [sorting, setSorting] = useState([]);

  // Mapping field names from Indonesian (frontend) to English (API)
  const fieldNameMapping = {
    posisi: "position",
    namaPaket: "packageName",
    mulaiBerlaku: "startDate",
    periode: "period",
    price: "price",
    koin: "coinEarned",
  };

  // Calculate API params
  const apiParams = useMemo(() => {
    const params = {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    };

    // Add search term if exists
    if (searchTerm && searchTerm.trim()) {
      params.search = searchTerm.trim();
    }

    // Add sorting if exists
    if (sorting.length > 0) {
      const sort = sorting[0];
      // Map frontend field name to API field name
      const apiFieldName = fieldNameMapping[sort.id] || sort.id;
      params.sortBy = apiFieldName;
      params.sortOrder = sort.desc ? "desc" : "asc";
    }

    return params;
  }, [pagination.pageIndex, pagination.pageSize, searchTerm, sorting]);

  // Fetch data using SWR hook
  const {
    data: apiData,
    isLoading,
    mutate,
  } = useGetPackageSubscriptionList(apiParams);

  // Transform API data to component format
  const transformedData = useMemo(() => {
    if (!apiData?.packages) {
      return {
        packages: [],
        pagination: {
          currentPage: 1,
          itemsPerPage: pagination.pageSize,
          totalItems: 0,
          totalPages: 0,
        },
      };
    }

    return {
      packages: apiData.packages.map(transformPackageItem),
      pagination: {
        currentPage: apiData.pagination?.currentPage || 1,
        itemsPerPage: apiData.pagination?.limit || pagination.pageSize,
        totalItems: apiData.pagination?.totalData || 0,
        totalPages: apiData.pagination?.totalPages || 0,
      },
    };
  }, [apiData, pagination.pageSize]);

  const handlePaginationChange = (updater) => {
    const newPagination =
      typeof updater === "function" ? updater(pagination) : updater;
    setPagination(newPagination);
  };

  const handleSearchChange = (value) => {
    setInputValue(value);
    // If input is cleared (empty), reset search immediately
    if (value.trim() === "") {
      setSearchTerm("");
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  };

  const handleSearchSubmit = () => {
    // Only search if input has at least 3 characters or is empty (to clear search)
    if (inputValue.trim().length >= 3 || inputValue.trim().length === 0) {
      setSearchTerm(inputValue.trim());
      // Reset to first page when searching
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSortingChange = (updater) => {
    const newSorting =
      typeof updater === "function" ? updater(sorting) : updater;
    setSorting(newSorting);
    // Reset to first page when sorting changes
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleRefresh = () => {
    mutate();
  };

  return (
    <PackageSubscriptionList
      data={transformedData}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      onPaginationChange={handlePaginationChange}
      onSearchChange={handleSearchChange}
      onSearchSubmit={handleSearchSubmit}
      onKeyPress={handleKeyPress}
      inputValue={inputValue}
      onSortingChange={handleSortingChange}
      sorting={sorting}
    />
  );
}
