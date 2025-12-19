"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { IconComponent } from "../IconComponent";

export interface FilterItem {
  id?: string | number;
  label: string;
  item?: {
    icon?: string;
  };
}

export interface ActiveFiltersBarProps {
  filters?: FilterItem[];
  onRemoveFilter?: (filter: FilterItem) => void;
  onClearAll?: () => void;
  className?: string;
  showClearAll?: boolean;
  clearAllText?: string;
  emptyText?: string;
  tagClassName?: string;
  scrollButtonClassName?: string;
}

export const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  filters = [],
  onRemoveFilter,
  onClearAll,
  className,
  showClearAll = true,
  clearAllText = "Hapus Semua Filter",
  emptyText = "Tidak ada filter aktif",
  tagClassName,
  scrollButtonClassName,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [filters]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Clear All Button */}
      {showClearAll && (
        <button
          onClick={onClearAll}
          className="shrink-0 text-xs font-bold text-primary-700 hover:text-primary-800"
        >
          {clearAllText}
        </button>
      )}

      {/* Scroll Left Button */}
      {(canScrollLeft || canScrollRight) && (
        <button
          onClick={() => scroll("left")}
          className={cn(
            "shrink-0 rounded-full border p-1 transition-all",
            canScrollLeft
              ? "border-neutral-600 text-neutral-900 hover:bg-neutral-100"
              : "border-neutral-500 text-neutral-500 hover:cursor-not-allowed",
            scrollButtonClassName
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Filter Tags Container */}
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filters.map((filter, index) => (
            <div
              key={index}
              className={cn(
                "flex h-7 shrink-0 items-center gap-2 rounded-full border border-primary-700 bg-neutral-50 px-3",
                tagClassName
              )}
            >
              {filter.item?.icon && (
                <IconComponent src={filter.item.icon} width={14} height={14} />
              )}
              <span className="text-xs font-medium text-primary-700">
                {filter.label}
              </span>
              <button
                onClick={() => onRemoveFilter?.(filter)}
                className="rounded-full p-0.5 text-primary-700 transition-colors hover:bg-primary-100"
                aria-label={`Remove ${filter.label} filter`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Right Button */}
      {(canScrollLeft || canScrollRight) && (
        <button
          onClick={() => scroll("right")}
          className={cn(
            "shrink-0 rounded-full border p-1 transition-all",
            canScrollRight
              ? "border-neutral-600 text-neutral-900 hover:bg-neutral-100"
              : "border-neutral-500 text-neutral-500 hover:cursor-not-allowed",
            scrollButtonClassName
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
