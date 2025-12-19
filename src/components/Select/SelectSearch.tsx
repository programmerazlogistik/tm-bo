import React, { useEffect, useMemo, useRef, useState } from "react";

import { Check, ChevronDown, Plus, Search } from "@muatmuat/icons";
import { cn } from "@muatmuat/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@muatmuat/ui/Popover";
import { X } from "lucide-react";

export interface Option {
  label: string;
  value: string;
  description?: string;
}

interface SelectSearchProps {
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onCreate?: (searchTerm: string) => void;
  className?: string;
}

/**
 * SelectSearch Component
 */
const SelectSearch: React.FC<SelectSearchProps> = ({
  options = [],
  value,
  onChange,
  placeholder = "Select item...",
  disabled = false,
  onCreate,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const [triggerWidth, setTriggerWidth] = useState(0);

  // Sync Popover width with Trigger width
  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current, isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [isOpen]);

  // Filter options client-side (if not handled by parent via API)
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            "group flex h-8 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-xs font-medium transition-all",
            "border-neutral-600 text-neutral-900", // Default state
            "hover:border-primary-500", // Hover state
            "focus:outline-none focus:ring-0", // Remove default ring
            isOpen && "border-primary-700 ring-1 ring-primary-700", // Active/Open state
            disabled && "cursor-not-allowed bg-neutral-100 text-neutral-500",
            className
          )}
        >
          <span
            className={cn(
              "truncate",
              selectedOption ? "text-neutral-900" : "text-neutral-600"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-neutral-500 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="rounded-md border border-neutral-400 bg-white p-0 shadow-[0px_4px_11px_rgba(65,65,65,0.25)]"
        style={{ width: triggerWidth || "auto" }}
        align="start"
        sideOffset={4}
      >
        <div className="flex flex-col">
          {/* Search Header */}
          <div className="flex items-center gap-2 border-b border-neutral-200 p-2.5">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-2 h-4 w-4 text-neutral-500" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari..."
                className={cn(
                  "h-8 w-full rounded-md border border-primary-700 bg-white pl-8 pr-8 text-xs font-medium text-neutral-900 placeholder:text-neutral-600",
                  "focus:outline-none focus:ring-0"
                )}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 flex items-center justify-center text-neutral-500 hover:text-neutral-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="scrollbar-custom max-h-[200px] min-h-0 flex-1 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "flex h-8 w-full items-center justify-between px-3 py-2 text-xs font-medium text-neutral-900 hover:bg-neutral-100",
                    value === option.value && "bg-primary-50 text-primary-700"
                  )}
                >
                  <span>
                    {option.description ? (
                      <>
                        {option.label}, {option.description}
                      </>
                    ) : (
                      option.label
                    )}
                  </span>
                  {value === option.value && (
                    <Check className="h-3 w-3 text-primary-700" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-xs text-neutral-500">
                Tidak ada hasil ditemukan
              </div>
            )}
          </div>

          {/* Add New Item Footer */}
          {onCreate && (
            <div className="border-t border-neutral-200 p-2">
              <button
                onClick={() => {
                  onCreate(searchTerm);
                  setIsOpen(false);
                }}
                className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-left hover:bg-neutral-100"
              >
                <div className="flex h-4 w-4 items-center justify-center rounded bg-primary-700 text-white">
                  <Plus className="h-3 w-3" />
                </div>
                <span className="text-xs font-semibold text-neutral-900">
                  Tambah "{searchTerm || "Item Baru"}"
                </span>
              </button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectSearch;
