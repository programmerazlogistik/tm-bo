"use client";

import { useEffect, useMemo, useState } from "react";

import { Edit } from "@muatmuat/icons";
import { Button } from "@muatmuat/ui/Button";

import { useGetDetailRules } from "@/services/setting-pengurangan/useGetDetailRules";
import { useGetListRules } from "@/services/setting-pengurangan/useGetListRules";
import { usePutUpdateRules } from "@/services/setting-pengurangan/usePutUpdateRules";

import { SettingPenguranganList } from "@/container/setting-pengurangan/SettingPenguranganList";

function Page() {
  // State for search and pagination
  const [inputValue, setInputValue] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: "no", desc: false }]);
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // State for modal form data
  const [formData, setFormData] = useState({
    statusActive: false,
    durasiFiturActive: false,
    penguranganKoin: "",
    durasiFitur: "",
  });

  // Store the original durasi fitur value to preserve it when toggle is off
  const [originalDurasiFitur, setOriginalDurasiFitur] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Fetch data from API
  const {
    data: apiData,
    error,
    isLoading,
    mutate,
  } = useGetListRules({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: inputValue,
  });

  // Update rules hook
  const { trigger: updateRule, isMutating: isUpdating } = usePutUpdateRules();

  const tableData = useMemo(() => {
    if (!apiData?.rules) return [];

    // Transform API data to match table format
    return apiData.rules.map((rule, index) => ({
      no: pagination.pageIndex * pagination.pageSize + index + 1,
      id: rule.id,
      modul: rule.module,
      keterangan: rule.description,
      actionCode: rule.actionCode,
      penguranganKoin: rule.reductionAmount,
      durasiFitur: rule.isUsingDuration
        ? `${rule.featureDuration} Menit`
        : "OFF",
      status: rule.isActive ? "Active" : "Non Active",
      isDefault: rule.isDefault,
    }));
  }, [apiData, pagination.pageIndex, pagination.pageSize]);

  // Define columns for the table
  // jika mau ubah sorting bisa ubah disini
  const columns = useMemo(
    () => [
      {
        accessorKey: "no",
        header: "NO",
        enableSorting: false,
      },
      {
        accessorKey: "modul",
        header: "Modul",
        enableSorting: false,
      },
      {
        accessorKey: "keterangan",
        header: "Keterangan",
        enableSorting: false,
      },
      {
        accessorKey: "penguranganKoin",
        header: "Pengurangan Koin",
        enableSorting: false,
      },
      {
        accessorKey: "durasiFitur",
        header: "Durasi Fitur",
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={`rounded-full px-3 py-2 text-sm font-medium ${
              info.getValue() === "Active"
                ? "bg-green-50 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {info.getValue()}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "edit",
        header: "Edit",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => {
              handleOpenModal(row.original);
            }}
          >
            <Edit className="h-5 w-5 stroke-1 text-neutral-600" />
          </Button>
        ),
        enableSorting: false,
      },
    ],
    []
  );

  // Use tableData directly since filtering is handled by API
  const filteredData = tableData;

  // Pagination data
  const paginationData = {
    currentPage: apiData?.pagination?.currentPage || 1,
    itemsPerPage: pagination.pageSize,
    totalItems: apiData?.pagination?.totalCount || 0,
    totalPages: apiData?.pagination?.totalPages || 1,
  };

  // Handle search change
  const handleSearchChange = (value) => {
    setInputValue(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  // Handle opening modal and initialize form data
  const handleOpenModal = (rowData) => {
    setSelectedData(rowData);

    // Set initial form data from the row data
    const durasiFiturValue =
      rowData.durasiFitur === "OFF"
        ? ""
        : rowData.durasiFitur.replace(" Menit", "");
    setOriginalDurasiFitur(durasiFiturValue);
    setFormData({
      statusActive: rowData.status === "Active",
      durasiFiturActive: rowData.durasiFitur !== "OFF",
      penguranganKoin: rowData.penguranganKoin.toString(),
      durasiFitur: durasiFiturValue,
    });
    setErrorMessage("");
    setOpen(true);
  };

  // Fetch detail data when modal opens
  const { data: detailData, isLoading: isDetailLoading } = useGetDetailRules(
    open && selectedData?.id ? selectedData.id : null
  );

  // Update form data when detail data is loaded
  useEffect(() => {
    if (detailData && open) {
      const durasiFiturValue = detailData.featureDuration.toString();
      setOriginalDurasiFitur(durasiFiturValue);
      setFormData({
        statusActive: detailData.isActive,
        durasiFiturActive: detailData.isUsingDuration,
        penguranganKoin: detailData.reductionAmount.toString(),
        durasiFitur: durasiFiturValue,
      });
    }
  }, [detailData, open]);

  // Handle save with validation
  const handleSubmit = async () => {
    // Reset error message
    setErrorMessage("");

    // Validation: Check if Status Active is enabled
    if (formData.statusActive) {
      // Check if Pengurangan Poin is empty
      if (!formData.penguranganKoin || formData.penguranganKoin.trim() === "") {
        setErrorMessage("Anda belum mengisi Field yang dibutuhkan");
        return;
      }

      // Check if Pengurangan Poin is below or equal to 0
      const penguranganKoinValue = parseFloat(formData.penguranganKoin);
      if (isNaN(penguranganKoinValue) || penguranganKoinValue <= 0) {
        setErrorMessage("Nilai harus lebih dari 0");
        return;
      }
    }

    // Validation: Check if Durasi Fitur is enabled
    if (formData.durasiFiturActive) {
      // Check if Durasi Fitur (menit) is empty
      if (!formData.durasiFitur || formData.durasiFitur.trim() === "") {
        setErrorMessage("Anda belum mengisi Field yang dibutuhkan");
        return;
      }
    }

    // Check if Durasi Fitur (menit) is a valid number
    const durasiFiturValue = parseFloat(formData.durasiFitur);
    if (isNaN(durasiFiturValue) || durasiFiturValue <= 0) {
      setErrorMessage("Nilai durasi fitur harus lebih dari 0");
      return;
    }

    return setOpenConfirmation(true);
  };

  const handleSave = async () => {
    try {
      // Prepare the payload for API update
      const payload = {
        isActive: formData.statusActive,
        reductionAmount: parseFloat(formData.penguranganKoin),
        isUsingDuration: formData.durasiFiturActive,
        featureDuration: parseFloat(formData.durasiFitur),
      };

      // Call the API to update the rule
      await updateRule({ id: selectedData.id, ...payload });

      // Close the modal after successful update
      setOpen(false);
      setOpenConfirmation(false);

      // Refetch the data to show updated values
      mutate();
    } catch (error) {
      // Handle error from API call
      setErrorMessage(
        error?.message || "Terjadi kesalahan saat menyimpan data"
      );
    }
  };

  const handleStatusActiveToggle = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      statusActive: newValue,
    }));
    setErrorMessage(""); // Clear error when toggling
  };

  const handleDurasiFiturToggle = (newValue) => {
    setFormData((prev) => {
      // When turning off, preserve the current value
      if (!newValue) {
        setOriginalDurasiFitur(prev.durasiFitur);
      }
      return {
        ...prev,
        durasiFiturActive: newValue,
      };
    });
    setErrorMessage(""); // Clear error when toggling
  };

  const handlePenguranganKoinChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      penguranganKoin: e.target.value,
    }));
    setErrorMessage(""); // Clear error when typing
  };

  const handleDurasiFiturChange = (e) => {
    const newValue = e.target.value;
    setFormData((prev) => ({
      ...prev,
      durasiFitur: newValue,
    }));
    setOriginalDurasiFitur(newValue); // Update original value as user types
    setErrorMessage(""); // Clear error when typing
  };

  const handleModalClose = (isOpen) => {
    setOpen(isOpen);
  };

  const handleConfirmationClose = (isOpen) => {
    setOpenConfirmation(isOpen);
  };

  const handleConfirmationCancel = () => {
    setOpenConfirmation(false);
    setOpen(false);
  };

  return (
    <SettingPenguranganList
      selectedData={selectedData}
      isDetailLoading={isDetailLoading}
      formData={formData}
      originalDurasiFitur={originalDurasiFitur}
      errorMessage={errorMessage}
      open={open}
      openConfirmation={openConfirmation}
      handleOpenModal={handleOpenModal}
      handleSubmit={handleSubmit}
      handleSave={handleSave}
      handleStatusActiveToggle={handleStatusActiveToggle}
      handleDurasiFiturToggle={handleDurasiFiturToggle}
      handlePenguranganKoinChange={handlePenguranganKoinChange}
      handleDurasiFiturChange={handleDurasiFiturChange}
      handleModalClose={handleModalClose}
      handleConfirmationClose={handleConfirmationClose}
      handleConfirmationCancel={handleConfirmationCancel}
      isUpdating={isUpdating}
      filteredData={filteredData}
      columns={columns}
      pagination={pagination}
      setPagination={setPagination}
      paginationData={paginationData}
      inputValue={inputValue}
      handleSearchChange={handleSearchChange}
      sorting={sorting}
      setSorting={setSorting}
      isLoading={isLoading}
    />
  );
}

export default Page;
