"use client";

import { useCallback, useEffect, useState } from "react";

import { useGetPromoSubscriptionsList } from "@/services/promo-subscription/useGetPromoSubscriptionsList";

import PageTitle from "@/components/PageTitle/PageTitle";

import { usePromoSubscriptionStore } from "@/store/promo-subscription/usePromoSubscriptionStore";

import Filter from "./section/Filter";
import TabSection from "./section/TabSection";
import TableActiveSection from "./section/TableActiveSection";

const PromoSubscriptionList = () => {
  const { search, currentTab, setSearch, limit, setLimit } =
    usePromoSubscriptionStore();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: limit,
  });

  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState({});

  // Synchronize store limit with component pagination state
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize: limit,
    }));
  }, [limit, setPagination]);

  // Custom hook to synchronize pagination state
  const handlePaginationChange = useCallback(
    (updater) => {
      setPagination((prev) => {
        const newState =
          typeof updater === "function" ? updater(prev) : updater;

        // Update store if page index changed
        if (newState.pageIndex !== prev.pageIndex) {
          // Note: The store uses 1-based indexing while react-table uses 0-based
          // setPage(newState.pageIndex + 1);
        }

        // Update store if page size changed
        if (newState.pageSize !== prev.pageSize) {
          setLimit(newState.pageSize);
        }

        return newState;
      });
    },
    [setLimit]
  );

  // Fetch data using the custom hook
  const { data, loading, error, mutate } = useGetPromoSubscriptionsList({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sorting: sorting,
    filters: {
      ...filters,
      search,
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

  return (
    <section>
      <PageTitle
        withBack={true}
        className="mb-2.5 text-[24px] font-bold text-[#176CF7]"
        appearance={{
          iconClassName: "size-6",
        }}
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
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-red-700">
              Error loading data: {error.message}
            </div>
          )}

          <TableActiveSection
            promos={data?.items || []}
            pagination={pagination}
            setPagination={handlePaginationChange}
            sorting={sorting}
            setSorting={setSorting}
            data={data}
          />
        </>
      ) : (
        <h1>Tidak ada data</h1>
      )}
    </section>
  );
};

export default PromoSubscriptionList;
