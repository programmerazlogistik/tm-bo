import { useCallback, useEffect, useState } from "react";

import { useDebounce } from "@muatmuat/hooks/use-debounce";

export const useDataTable = () => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Apply debouncing with minimum 3 characters requirement
  const debouncedInputValue = useDebounce(inputValue, 500);

  // Update search term when debounced value changes and meets requirements
  useEffect(() => {
    if (debouncedInputValue.length >= 3 || debouncedInputValue.length === 0) {
      setSearchTerm(debouncedInputValue);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [debouncedInputValue]);

  const onSearchChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const dataTableProps = {
    sorting,
    setSorting,
    pagination,
    setPagination,
    searchTerm,
    onSearchChange,
    inputValue, // Expose the input value for immediate UI updates
  };

  return {
    ...dataTableProps,
    dataTableProps,
  };
};
