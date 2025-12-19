"use client";

import { useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Input } from "@muatmuat/ui/Form";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { X } from "lucide-react";

import PaginationBO from "./PaginationBO";
import TableBO from "./TableBO";

// Helper components
const ActiveFiltersBar = ({ filters, onRemoveFilter, onClearAll }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
        >
          <span className="mr-1">{filter.label}:</span>
          <span className="font-medium">{filter.value}</span>
          <button
            onClick={() => onRemoveFilter(filter)}
            className="ml-2 text-gray-500 hover:text-gray-700"
            aria-label="Remove filter"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={onClearAll}
        className="text-sm text-blue-600 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
};

const DisplayOptionsBar = ({
  totalCount,
  statusOptions = [],
  currentStatus,
  onStatusChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">
        Total: <strong>{totalCount}</strong> items
      </span>
      <div className="flex gap-3">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={`rounded-full px-3 py-1 text-sm ${
              currentStatus === option.value
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const DataNotFound = ({ title = "No Data Found", type, className }) => (
  <div
    className={cn("flex flex-col items-center justify-center p-8", className)}
  >
    <h3 className="mb-2 text-lg font-medium text-gray-600">{title}</h3>
  </div>
);

/**
 * BO-specific DataTable component styled to match the back office design
 */
const DataTableBO = ({
  data = [],
  columns = [],
  searchPlaceholder = "Search...",
  showFilter = true,
  showSearch = true,
  showPagination = true,
  showTotalCount = true,
  showDisplayView = false,
  totalCountLabel = "items",
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  perPage = 10,
  onPageChange,
  onPerPageChange,
  onSearch,
  onFilter,
  loading = false,
  emptyState = null,
  className,
  headerActions = null,
  onRowClick = null,
  rowClassName = null,
  filterConfig = null,
  onSort,
  displayOptions = null,
  tableTitle = null,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ sort: null, order: null });

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleSearchKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    onFilter?.(filters);
  };

  // Convert selected filters to active filter format
  const getActiveFilters = () => {
    const activeFilters = [];

    Object.entries(selectedFilters).forEach(([categoryKey, items]) => {
      if (Array.isArray(items) && items.length > 0) {
        items.forEach((item) => {
          activeFilters.push({
            categoryKey,
            label:
              filterConfig?.find((f) => f.key === categoryKey)?.label ||
              categoryKey,
            value: item.label || item,
            id: item.id || item,
          });
        });
      } else if (items && typeof items === "object") {
        activeFilters.push({
          categoryKey,
          label:
            filterConfig?.find((f) => f.key === categoryKey)?.label ||
            categoryKey,
          value: items.label || items.toString(),
          id: items.id || items,
        });
      }
    });

    return activeFilters;
  };

  const handleRemoveFilter = (filter) => {
    const newFilters = { ...selectedFilters };

    if (Array.isArray(newFilters[filter.categoryKey])) {
      newFilters[filter.categoryKey] = newFilters[filter.categoryKey].filter(
        (item) => (item.id || item) !== filter.id
      );
      if (newFilters[filter.categoryKey].length === 0) {
        delete newFilters[filter.categoryKey];
      }
    } else {
      delete newFilters[filter.categoryKey];
    }

    setSelectedFilters(newFilters);
    onFilter?.(newFilters);
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
    onFilter?.({});
  };

  const handleSort = (sort) => {
    if (!onSort) return;

    let newOrder = null;
    let newSort = sort;

    if (sortConfig.sort === sort) {
      newOrder = sortConfig.order === "asc" ? "desc" : null;
      if (newOrder === null) {
        newSort = null;
      }
    } else {
      newOrder = "asc";
    }

    setSortConfig({ sort: newSort, order: newOrder });

    if (newOrder) {
      onSort(newSort, newOrder);
    } else {
      onSort(null, null);
    }
  };

  const renderEmptyState = () => {
    return emptyState || <DataNotFound title="Belum Ada Data" />;
  };

  const activeFilters = getActiveFilters();

  return (
    <>
      {/* Search and filters outside of the table */}
      <div className="flex items-center justify-between">
        {showSearch ? (
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={handleSearchKeyUp}
            disabled={loading}
            icon={{
              left: <IconComponent src="/icons/search.svg" width={16} />,
              right:
                searchValue.length > 2 ? (
                  <button
                    onClick={() => {
                      setSearchValue("");
                      onSearch?.("");
                    }}
                    className="flex items-center justify-center rounded-full p-0.5 hover:bg-neutral-200"
                  >
                    <X className="h-4 w-4 text-neutral-600" />
                  </button>
                ) : null,
            }}
            appearance={{
              containerClassName: "h-8 w-[326px]",
              inputClassName: "text-xs font-medium mt-0",
            }}
            className="w-fit"
          />
        ) : (
          <div></div>
        )}

        <div className="flex items-center gap-4">
          {headerActions && (
            <div className="flex items-center gap-2">{headerActions}</div>
          )}
        </div>
      </div>

      {/* Filters bar */}
      {showFilter && activeFilters.length > 0 && (
        <div className="mb-4">
          <ActiveFiltersBar
            filters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />
        </div>
      )}

      {/* Display options */}
      {showDisplayView && displayOptions && (
        <div className="mb-4">
          <DisplayOptionsBar
            totalCount={displayOptions.totalCount || totalItems}
            statusOptions={displayOptions.statusOptions || []}
            currentStatus={displayOptions.currentStatus}
            onStatusChange={displayOptions.onStatusChange}
          />
        </div>
      )}

      {/* Table component */}
      <div
        className={cn(
          "flex w-full flex-col overflow-hidden overflow-x-auto rounded-[10px] border border-[#A8A8A8]",
          className
        )}
      >
        <div className="flex-1 overflow-hidden">
          <TableBO
            columns={columns}
            data={data}
            loading={loading}
            onRowClick={onRowClick}
            rowClassName={rowClassName}
            onSort={handleSort}
            sortConfig={sortConfig}
            emptyComponent={renderEmptyState()}
            showHeadersWhenEmpty={true}
          />
        </div>
      </div>

      {/* Pagination and per page selector */}
      {showPagination && (
        <div className="flex items-center justify-between">
          <PaginationBO
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={perPage}
            totalItems={totalItems}
            onPageChange={onPageChange}
            onPerPageChange={onPerPageChange}
            className="pb-0"
          />
        </div>
      )}
    </>
  );
};

export default DataTableBO;
