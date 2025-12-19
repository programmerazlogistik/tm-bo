"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@muatmuat/lib/utils";
import { IconComponent } from "@muatmuat/ui/IconComponent";

/**
 * BO-specific Table component styled to match the back office design
 */
const TableBO = ({
  columns = [],
  data = [],
  loading = false,
  onRowClick = null,
  rowClassName = null,
  onSort = null,
  sortConfig = { sort: null, order: null },
  loadingComponent = null,
  emptyComponent = null,
  enableInfiniteScroll = false,
  isLoadingMore = false,
  hasNextPage = false,
  loadMore = null,
  loadingMoreComponent = null,
  endOfResultsComponent = null,
  scrollThreshold = 0.8,
  showHeadersWhenEmpty = true,
}) => {
  const handleSort = (columnKey) => {
    if (!onSort || !columnKey) return;
    onSort(columnKey);
  };

  const scrollContainerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!enableInfiniteScroll || !hasNextPage || isLoadingMore || !loadMore)
      return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPercentage >= scrollThreshold) {
      loadMore();
    }
  }, [
    enableInfiniteScroll,
    hasNextPage,
    isLoadingMore,
    loadMore,
    scrollThreshold,
  ]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !enableInfiniteScroll) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [enableInfiniteScroll, handleScroll]);

  const renderLoading = () => {
    if (loadingComponent) return loadingComponent;
    return (
      <div className="flex h-[66px] w-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-700 border-t-transparent"></div>
      </div>
    );
  };

  const renderEmpty = () => {
    if (emptyComponent) return emptyComponent;
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <div className="text-center text-gray-500">Belum Ada Data</div>
      </div>
    );
  };

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full overflow-auto"
      style={{ maxHeight: enableInfiniteScroll ? "600px" : "unset" }}
    >
      <div className="relative inline-block min-w-full">
        <div className="absolute inset-x-0 top-0 z-0 h-[84px]" />
        <div className="relative z-10 px-[10px] pb-1">
          <table className="relative z-10 w-full table-fixed">
            <thead className="h-10 border-b border-b-[#A8A8A8] text-left text-[#868686]">
              <tr>
                {columns.map((column, index) => {
                  const isSortable =
                    column.sortable !== false && Boolean(onSort);
                  const isActive = sortConfig.sort === column.key;
                  const order = isActive ? sortConfig.order : null;

                  return (
                    <th
                      key={column.key || index}
                      className={cn(
                        "text-sm",
                        isSortable
                          ? "hover:bg-primary-dark cursor-pointer"
                          : "",
                        column.headerClassName,
                        index !== columns.length - 1 ? "pr-[10px]" : "",
                        index === columns.length - 1 ? "pr-5" : ""
                      )}
                      style={{ width: column.width }}
                      onClick={
                        isSortable ? () => handleSort(column.key) : undefined
                      }
                    >
                      <div
                        className={cn(
                          "flex items-center gap-[6px]",
                          column.headerClassName
                        )}
                      >
                        <span>
                          {typeof column.header === "function"
                            ? column.header()
                            : column.header}
                        </span>
                        {isSortable && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSort(column.key);
                            }}
                            className="cursor-pointer"
                          >
                            <IconComponent
                              src={
                                !isActive
                                  ? "/icons/default-sort.svg"
                                  : order === "asc"
                                    ? "/icons/asc-sort.svg"
                                    : "/icons/desc-sort.svg"
                              }
                              height={16}
                              className="text-[#A8A8A8]"
                            />
                          </button>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white p-3">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-6 text-center"
                  >
                    {renderLoading()}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-6 text-center"
                  >
                    {renderEmpty()}
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr
                    key={row.id || rowIndex}
                    className={cn(
                      onRowClick ? "cursor-pointer hover:bg-opacity-80" : "",
                      typeof rowClassName === "function"
                        ? rowClassName(row, rowIndex)
                        : rowClassName
                    )}
                    onClick={
                      onRowClick ? () => onRowClick(row, rowIndex) : undefined
                    }
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        key={`${rowIndex}-${column.key || columnIndex}`}
                        className={cn(
                          "break-words border-b border-b-[#E5E5E5] p-3 text-xs font-medium",
                          "bg-white",
                          columnIndex === 0 && "rounded-l-md",
                          columnIndex === columns.length - 1 && "rounded-r-md",
                          column.className
                        )}
                      >
                        {column.render
                          ? column.render(row, rowIndex)
                          : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {enableInfiniteScroll && isLoadingMore && loadingMoreComponent}

      {enableInfiniteScroll &&
        !hasNextPage &&
        data.length > 0 &&
        endOfResultsComponent}
    </div>
  );
};

export default TableBO;
