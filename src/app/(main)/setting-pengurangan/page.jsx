"use client";

import { useMemo, useState } from "react";

import { Edit } from "@muatmuat/icons";
import { Button } from "@muatmuat/ui/Button";
import { Modal, ModalContent } from "@muatmuat/ui/Modal";
import { DataTableBO, TableBO } from "@muatmuat/ui/Table";

import PageTitle from "@/components/PageTitle/PageTitle";
import Toggle from "@/components/Toggle/Toggle";

function Page() {
  // State for search and pagination
  const [inputValue, setInputValue] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: "no", desc: false }]);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // State for modal form data
  const [formData, setFormData] = useState({
    statusActive: false,
    durasiFiturActive: false,
    penguranganKoin: "",
    durasiFitur: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  // Static data for the table
  const tableData = useMemo(
    () => [
      {
        no: 1,
        modul: "Modul A",
        keterangan: "Keterangan untuk Modul A",
        penguranganKoin: 100,
        durasiFitur: "OFF",
        status: "Active",
      },
      {
        no: 2,
        modul: "Modul B",
        keterangan: "Keterangan untuk Modul B",
        penguranganKoin: 200,
        durasiFitur: "OFF",
        status: "Non Active",
      },
      {
        no: 3,
        modul: "Modul C",
        keterangan: "Keterangan untuk Modul C",
        penguranganKoin: 150,
        durasiFitur: "15 Menit",
        status: "Active",
      },
      {
        no: 4,
        modul: "Modul D",
        keterangan: "Keterangan untuk Modul D",
        penguranganKoin: 300,
        durasiFitur: "10 Menit",
        status: "Active",
      },
      {
        no: 5,
        modul: "Modul E",
        keterangan: "Keterangan untuk Modul E",
        penguranganKoin: 75,
        durasiFitur: "5 Menit",
        status: "Non Active",
      },
    ],
    []
  );

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: "no",
        header: "NO",
        enableSorting: true,
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

  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!inputValue) return tableData;
    return tableData.filter((item) =>
      Object.values(item).some(
        (val) =>
          val && val.toString().toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [tableData, inputValue]);

  // Pagination data
  const paginationData = {
    currentPage: pagination.pageIndex + 1,
    itemsPerPage: pagination.pageSize,
    totalItems: filteredData.length,
    totalPages: Math.ceil(filteredData.length / pagination.pageSize),
  };

  // Handle search change
  const handleSearchChange = (value) => {
    setInputValue(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  // Handle add new package
  const handleAdd = () => {
    console.log("Add new package");
  };

  // Handle opening modal and initialize form data
  const handleOpenModal = (rowData) => {
    setSelectedData(rowData);
    setFormData({
      statusActive: rowData.status === "Active",
      durasiFiturActive: rowData.durasiFitur !== "OFF",
      penguranganKoin: rowData.penguranganKoin.toString(),
      durasiFitur:
        rowData.durasiFitur === "OFF"
          ? ""
          : rowData.durasiFitur.replace(" Menit", ""),
    });
    setErrorMessage("");
    setOpen(true);
  };

  // Handle save with validation
  const handleSave = () => {
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
      if (penguranganKoinValue <= 0) {
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

    // If all validations pass, save the data
    // TODO: Implement actual save logic here
    // Example: Call API to update the data
    // const updatedData = {
    //   ...selectedData,
    //   status: formData.statusActive ? "Active" : "Non Active",
    //   penguranganKoin: formData.statusActive ? parseFloat(formData.penguranganKoin) : selectedData.penguranganKoin,
    //   durasiFitur: formData.durasiFiturActive ? `${formData.durasiFitur} Menit` : "OFF",
    // };
    setOpen(false);
  };

  return (
    <>
      <PageTitle
        className="mb-2.5 text-[24px] font-bold text-[#176CF7]"
        appearance={{
          iconClassName: "size-6",
        }}
      >
        Setting Pengurangan Koin
      </PageTitle>
      <div className="mt-12">
        <DataTableBO.Root
          data={filteredData}
          columns={columns}
          pagination={pagination}
          onPaginationChange={setPagination}
          paginationData={paginationData}
          inputValue={inputValue}
          onSearchChange={handleSearchChange}
          pageCount={paginationData.totalPages}
          searchTerm={inputValue}
          sorting={sorting}
          onSortingChange={setSorting}
        >
          <DataTableBO.Content Table={TableBO} />
        </DataTableBO.Root>
      </div>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent className="w-[800px] px-8 py-8">
          <div className="space-y-6">
            {selectedData && (
              <>
                {/* Two-column grid layout */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Modul */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700/70">
                        Modul
                      </label>
                      <input
                        type="text"
                        value={selectedData.modul}
                        readOnly
                        className="w-full border-b border-gray-300 bg-transparent pb-2 text-base text-gray-700/70 outline-none"
                      />
                    </div>

                    {/* Status Active with Toggle */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-500">
                        Status Active
                      </label>
                      <Toggle
                        value={formData.statusActive}
                        onClick={(newValue) => {
                          setFormData((prev) => ({
                            ...prev,
                            statusActive: newValue,
                          }));
                          setErrorMessage(""); // Clear error when toggling
                        }}
                      />
                    </div>

                    {/* Durasi Fitur with Toggle */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-500">
                        Durasi Fitur
                      </label>
                      <Toggle
                        value={formData.durasiFiturActive}
                        onClick={(newValue) => {
                          setFormData((prev) => ({
                            ...prev,
                            durasiFiturActive: newValue,
                          }));
                          setErrorMessage(""); // Clear error when toggling
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Keterangan */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700/70">
                        Keterangan
                      </label>
                      <input
                        type="text"
                        value={selectedData.keterangan}
                        readOnly
                        className="w-full border-b border-gray-300 bg-transparent pb-2 text-base text-gray-700/70 outline-none"
                      />
                    </div>

                    {/* Pengurangan Poin */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-500">
                        Pengurangan Poin
                      </label>
                      <input
                        type="number"
                        value={formData.penguranganKoin}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            penguranganKoin: e.target.value,
                          }));
                          setErrorMessage(""); // Clear error when typing
                        }}
                        readOnly={!formData.statusActive}
                        className={`w-full border-b border-gray-300 bg-transparent pb-2 text-base outline-none focus:border-indigo-500 ${
                          formData.statusActive
                            ? "text-gray-700"
                            : "text-gray-400"
                        }`}
                      />
                    </div>

                    {/* Durasi Fitur (menit) */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-500">
                        Durasi Fitur (menit)
                      </label>
                      <input
                        type="number"
                        value={formData.durasiFitur}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            durasiFitur: e.target.value,
                          }));
                          setErrorMessage(""); // Clear error when typing
                        }}
                        placeholder="10"
                        readOnly={!formData.durasiFiturActive}
                        className={`w-full border-b border-gray-300 bg-transparent pb-2 text-base outline-none focus:border-indigo-500 ${
                          formData.durasiFiturActive
                            ? "text-gray-700"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message Section */}
                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-lg bg-red-50 px-4 py-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                      <svg
                        className="h-4 w-4 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-red-600">{errorMessage}</span>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    className="rounded-lg bg-indigo-600 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                    onClick={handleSave}
                  >
                    Simpan
                  </button>
                </div>
              </>
            )}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Page;
