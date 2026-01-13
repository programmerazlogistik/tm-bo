"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Checkbox, Input } from "@muatmuat/ui/Form";
import PropTypes from "prop-types";

const MultiSelectUser = ({
  value = [],
  onChange,
  options = [],
  placeholder = "Pilih Tipe Pengguna",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleRemove = (optionValue, e) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const getSelectedLabels = () => {
    return options
      .filter((opt) => value.includes(opt.value))
      .map((opt) => opt.label);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-auto min-h-[32px] w-full items-center justify-between gap-2 rounded-md border bg-white px-3 py-2 text-left text-xs font-medium transition-colors duration-200",
          "hover:border-primary-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-700/20",
          isOpen ? "border-primary-500" : "border-neutral-600",
          value.length === 0 && "text-neutral-600"
        )}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {value.length === 0 ? (
            <span className="text-neutral-600">{placeholder}</span>
          ) : (
            getSelectedLabels().map((label, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded bg-[#868686] px-2 py-0.5 text-xs font-medium text-white"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) =>
                    handleRemove(
                      options.find((opt) => opt.label === label)?.value,
                      e
                    )
                  }
                  className="ml-1"
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={cn(
            "flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-[#176CF7] bg-white shadow-lg">
          {/* Search Input */}
          <div className="p-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Tipe Pengguna"
              className="w-full"
              appearance={{
                containerClassName: "h-8",
                inputClassName: "text-xs",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto">
            {/* Semua Pengguna Header */}
            <div className="mx-2 border-b border-[#C6CBD4] bg-neutral-50 py-2 text-xs font-semibold text-neutral-700">
              Semua Pengguna
            </div>

            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-neutral-500">
                Tidak ada data
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-neutral-100"
                  onClick={() => handleToggle(option.value)}
                >
                  <Checkbox
                    checked={value.includes(option.value)}
                    onCheckedChange={() => handleToggle(option.value)}
                    className="size-4"
                  />
                  <span className="flex-1">{option.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

MultiSelectUser.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

MultiSelectUser.defaultProps = {
  value: [],
  options: [],
  placeholder: "Pilih Tipe Pengguna",
  className: "",
};

export default MultiSelectUser;
