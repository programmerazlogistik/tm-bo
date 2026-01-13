"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useDebounce } from "@muatmuat/hooks/use-debounce";

import { useGetPromoSubscriptionsHistory } from "@/services/promo-subscription/useGetPromoSubscriptionsHistory";
import { useGetPromoSubscriptionsList } from "@/services/promo-subscription/useGetPromoSubscriptionsList";

import PageTitle from "@/components/PageTitle/PageTitle";

import { usePromoSubscriptionStore } from "@/store/promo-subscription/usePromoSubscriptionStore";

import Filter from "./section/Filter";
import TabSection from "./section/TabSection";
import TableActiveSection from "./section/TableActiveSection";
import TableHistorySection from "./section/TableHistorySection";

const PromoSubscriptionList = () => {
  const router = useRouter();
  const { search, currentTab, setSearch, limit, setLimit } =
    usePromoSubscriptionStore();

  // State for Active tab
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: limit,
  });

  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState({});

  // Reset pagination and sorting when tab changes
  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: limit,
    });
    setSorting([]);
  }, [currentTab, limit]);

  // State for History tab
  const [historyPagination, setHistoryPagination] = useState({
    pageIndex: 0,
    pageSize: limit,
  });

  const [historySorting, setHistorySorting] = useState([]);
  const [historySearch, setHistorySearch] = useState("");

  // Reset history pagination and sorting when tab changes to history
  useEffect(() => {
    if (currentTab === "history") {
      setHistoryPagination({
        pageIndex: 0,
        pageSize: limit,
      });
      setHistorySorting([]);
    }
  }, [currentTab, limit]);

  // Debounce history search with 300ms delay
  const debouncedHistorySearch = useDebounce(historySearch, 300);

  // Synchronize store limit with component pagination state
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize: limit,
    }));
    setHistoryPagination((prev) => ({
      ...prev,
      pageSize: limit,
    }));
  }, [limit]);

  // Custom hook to synchronize pagination state for Active tab
  const handlePaginationChange = useCallback(
    (updater) => {
      setPagination((prev) => {
        const newState =
          typeof updater === "function" ? updater(prev) : updater;

        // Update store if page size changed
        if (newState.pageSize !== prev.pageSize) {
          setLimit(newState.pageSize);
        }

        return newState;
      });
    },
    [setLimit]
  );

  // Custom hook to synchronize pagination state for History tab
  const handleHistoryPaginationChange = useCallback(
    (updater) => {
      setHistoryPagination((prev) => {
        const newState =
          typeof updater === "function" ? updater(prev) : updater;

        // Update store if page size changed
        if (newState.pageSize !== prev.pageSize) {
          setLimit(newState.pageSize);
        }

        return newState;
      });
    },
    [setLimit]
  );

  // Fetch data for Active tab using the custom hook
  const { data, loading, error, mutate } = useGetPromoSubscriptionsList({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sorting: sorting,
    filters: {
      ...filters,
      search: search.trim(),
    },
  });

  // Fetch data for History tab using the custom hook
  const {
    data: historyData,
    loading: historyLoading,
    error: historyError,
    mutate: _historyMutate,
  } = useGetPromoSubscriptionsHistory({
    page: historyPagination.pageIndex + 1,
    limit: historyPagination.pageSize,
    sorting: historySorting,
    filters: {
      search: debouncedHistorySearch.trim(),
    },
  });

  // Function to handle filter submission
  const handleFilterSubmit = (newFilters) => {
    // Remove search from filters since it's managed separately
    const { search: _, ...filtersWithoutSearch } = newFilters;
    setFilters(filtersWithoutSearch);
    // Reset to first page when applying new filters
    handlePaginationChange((prev) => ({ ...prev, pageIndex: 0 }));
  };

  // Function to reset filters
  const handleResetFilters = () => {
    setFilters({});
    setSearch("");
    handlePaginationChange((prev) => ({ ...prev, pageIndex: 0 }));
  };

  // Function to handle history search change
  const handleHistorySearchChange = (value) => {
    setHistorySearch(value);
    // Reset to first page when searching
    setHistoryPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <section>
      <PageTitle
        withBack={true}
        className="mb-2.5 text-[24px] font-bold text-[#176CF7]"
        appearance={{
          iconClassName: "size-6",
        }}
        onBackClick={() => router.push("/")}
      >
        Master Promo Subscription
      </PageTitle>

      <TabSection />

      {currentTab === "active" ? (
        <>
          {/* Pass filter functions to Filter component */}
          <Filter
            onFilterSubmit={handleFilterSubmit}
            onResetFilters={handleResetFilters}
          />

          {/* Show error state */}
          {error ? (
            <div className="rounded-md bg-red-50 p-4 text-red-700">
              <p className="text-center">Data tidak ditemukan</p>
            </div>
          ) : (
            <TableActiveSection
              promos={data?.items || []}
              pagination={pagination}
              setPagination={handlePaginationChange}
              sorting={sorting}
              setSorting={setSorting}
              data={data}
              loading={loading}
              mutate={mutate}
            />
          )}
        </>
      ) : (
        <>
          <TableHistorySection
            historyError={historyError}
            promos={historyData?.items || []}
            pagination={historyPagination}
            setPagination={handleHistoryPaginationChange}
            sorting={historySorting}
            setSorting={setHistorySorting}
            data={historyData}
            loading={historyLoading}
            searchValue={historySearch}
            onSearchChange={handleHistorySearchChange}
          />
        </>
      )}
    </section>
  );
};

export default PromoSubscriptionList;
