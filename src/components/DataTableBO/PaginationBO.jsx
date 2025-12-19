"use client";

import { Fragment } from "react";

import { cn } from "@muatmuat/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SelectTotalDataBO from "./SelectTotalDataBO";

/**
 * BO-specific pagination component styled to match the back office design
 */
const PaginationBO = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onPerPageChange,
  perPage = 10,
  className,
  totalItems = 0,
  showItemsInfo = true,
}) => {
  const perPageOptions = [10, 20, 40];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const result = [];
    const maxVisiblePages = 5; // Show up to 5 pages before ellipsis

    if (totalPages <= maxVisiblePages + 2) {
      // If we have 7 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
    } else {
      // Always show page 1
      result.push(1);

      if (currentPage <= maxVisiblePages - 1) {
        // We're in the first set of pages
        for (let i = 2; i <= maxVisiblePages; i++) {
          result.push(i);
        }
        result.push("...");
        result.push(totalPages);
      } else if (currentPage > totalPages - maxVisiblePages + 1) {
        // We're in the last set of pages
        result.push("...");
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          result.push(i);
        }
      } else {
        // We're in the middle
        result.push("...");
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
        for (let i = startPage; i <= endPage; i++) {
          result.push(i);
        }
        result.push("...");
        result.push(totalPages);
      }
    }

    return result;
  };

  // Calculate the range of items being displayed
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      {/* Left side: Items info */}
      {showItemsInfo && (
        <p className="text-sm font-medium text-[#1B1B1B]">
          Menampilkan {startItem} - {endItem} data dari total {totalItems} data.
        </p>
      )}

      <div className="flex items-center justify-end gap-4">
        <SelectTotalDataBO
          perPage={perPage}
          onPerPageChange={onPerPageChange}
          labelText="Menampilkan"
          // suffixText={totalCountLabel}
        />
        <span className="text-[#868686]">|</span>

        {/* Right side: Pagination buttons and per page selector */}
        <div className="flex items-center gap-4">
          {/* Pagination buttons */}
          <div className="flex gap-1">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1 || totalPages === 0}
              className={`flex h-8 w-8 items-center justify-center rounded-md ${
                currentPage === 1 || totalPages === 0
                  ? "cursor-not-allowed text-gray-300"
                  : "text-[#868686] hover:bg-gray-100"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={24} />
            </button>

            {getPageNumbers().map((pageNumber, key) => (
              <Fragment key={key}>
                {pageNumber === "..." ? (
                  <span className="flex h-8 w-8 items-center justify-center text-[#868686]">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(pageNumber)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-xs ${
                      currentPage === pageNumber
                        ? "bg-primary font-bold text-white"
                        : "font-medium text-[#868686] hover:bg-gray-100"
                    }`}
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={
                      currentPage === pageNumber ? "page" : undefined
                    }
                  >
                    {pageNumber}
                  </button>
                )}
              </Fragment>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`flex h-8 w-8 items-center justify-center rounded-md ${
                currentPage === totalPages || totalPages === 0
                  ? "cursor-not-allowed text-gray-300"
                  : "text-[#868686] hover:bg-gray-100"
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationBO;
