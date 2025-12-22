"use client";

import { useMemo, useState } from "react";

import { Edit } from "@muatmuat/icons";
import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";
import { Modal } from "@muatmuat/ui/Modal";
import { DataTableBO, TableBO } from "@muatmuat/ui/Table";

import PageTitle from "@/components/PageTitle/PageTitle";

function Page() {
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

  // State for search and pagination
  const [inputValue, setInputValue] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: "no",
        header: "NO",
      },
      {
        accessorKey: "modul",
        header: "Modul",
      },
      {
        accessorKey: "keterangan",
        header: "Keterangan",
      },
      {
        accessorKey: "penguranganKoin",
        header: "Pengurangan Koin",
      },
      {
        accessorKey: "durasiFitur",
        header: "Durasi Fitur",
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
      },
      {
        accessorKey: "edit",
        header: "Edit",
        cell: () => (
          <Edit className="h-5 cursor-pointer stroke-1 text-xs text-neutral-600" />
        ),
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
        sorting={[]}
      >
        <DataTableBO.Header>
          <div className="flex w-full justify-between">
            <Input
              value={inputValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari Paket"
              className="h-8 w-[350px]"
              appearance={{
                containerClassName: "h-8 rounded-[6px] border-[#A8A8A8]",
                inputClassName: "text-xs",
              }}
              withReset
            />
            <Button
              variant="muatparts-primary"
              className="h-8 rounded-[20px] bg-[#176CF7] text-sm font-semibold text-white"
              onClick={handleAdd}
            >
              + Buat Pengurangan Koin
            </Button>
          </div>
        </DataTableBO.Header>

        <DataTableBO.Content Table={TableBO} />
        <DataTableBO.Pagination />
      </DataTableBO.Root>

      <Modal></Modal>
    </>
  );
}

export default Page;
