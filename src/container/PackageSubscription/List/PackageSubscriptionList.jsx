"use client";

import { useMemo } from "react";

import { LoadingStatic } from "@muatmuat/ui/Loading";
import { DataTableBO, TableBO, useDataTable } from "@muatmuat/ui/Table";

import PageTitle from "@/components/PageTitle/PageTitle";

import { WarningModal } from "../Add/components/Modals";
import ConfirmationModal from "./components/ConfirmationModal";
import TableHeader from "./components/TableHeader";
import { createColumns } from "./components/table/columns";
import { usePackageSubscriptionActions } from "./hooks/usePackageSubscriptionActions";

const PackageSubscriptionList = ({
  data,
  isLoading,
  onRefresh,
  onPaginationChange,
  onSearchChange: onSearchChangeProp,
  onSearchSubmit: _onSearchSubmit,
  onKeyPress: onKeyPressProp,
  inputValue: externalInputValue,
  onSortingChange: onSortingChangeProp,
  sorting: externalSorting,
  pagination: externalPagination,
}) => {
  // 26. 03 - TM - LB - 0006
  // 26. 03 - TM - LB - 0007
  const {
    sorting,
    setSorting,
    pagination,
    setPagination,
    inputValue,
    onSearchChange,
  } = useDataTable();

  const {
    modalState,
    errorModalState,
    isDeleting,
    handleEdit,
    handleDetail,
    handleAdd,
    handleDeletePackage,
    openConfirmationModal,
    closeConfirmationModal,
    setErrorModalState,
  } = usePackageSubscriptionActions(onRefresh);

  const tableData = useMemo(() => data?.packages || [], [data]);
  const paginationData = useMemo(() => data?.pagination, [data]);
  const pageCount = useMemo(() => data?.pagination?.totalPages ?? -1, [data]);

  const columns = useMemo(
    () =>
      createColumns({
        onDetail: handleDetail,
        onEdit: handleEdit,
        onDelete: (pkg) => openConfirmationModal("delete", pkg),
        onRefresh,
      }),
    [handleDetail, handleEdit, openConfirmationModal, onRefresh]
  );

  const handleSearchChange = (value) => {
    onSearchChange(value);
    if (onSearchChangeProp) {
      onSearchChangeProp(value);
    }
  };

  const currentInputValue =
    externalInputValue !== undefined ? externalInputValue : inputValue;
  const currentSorting =
    externalSorting !== undefined ? externalSorting : sorting;
  const currentPagination =
    externalPagination !== undefined ? externalPagination : pagination;

  return (
    <div>
      <PageTitle
        className="mb-2.5 text-[24px] font-bold text-[#176CF7]"
        appearance={{
          iconClassName: "size-6",
        }}
      >
        Master Paket Subscription
      </PageTitle>

      <DataTableBO.Root
        columns={columns}
        data={tableData}
        pageCount={pageCount}
        paginationData={paginationData}
        pagination={currentPagination}
        onPaginationChange={onPaginationChange || setPagination}
        sorting={currentSorting}
        onSortingChange={(updater) => {
          if (onSortingChangeProp) {
            onSortingChangeProp(updater);
          } else {
            setSorting(updater);
          }
        }}
        inputValue={currentInputValue}
        onSearchChange={handleSearchChange}
      >
        <DataTableBO.Header>
          <TableHeader
            inputValue={currentInputValue}
            onSearchChange={handleSearchChange}
            onKeyPress={onKeyPressProp}
            onAdd={handleAdd}
          />
        </DataTableBO.Header>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingStatic />
          </div>
        ) : (
          <DataTableBO.Content Table={TableBO} />
        )}

        {!isLoading && <DataTableBO.Pagination />}
      </DataTableBO.Root>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen && modalState.type === "delete"}
        setIsOpen={closeConfirmationModal}
        title={{ text: "Pemberitahuan" }}
        description={{
          text: modalState.package
            ? `Apakah Anda yakin ingin menghapus<br/>paket <strong>${modalState.package.namaPaket}</strong> ?`
            : "Apakah Anda yakin ingin menghapus paket ini?",
        }}
        cancel={{ text: "Batal" }}
        confirm={{
          text: isDeleting ? "Menghapus..." : "Simpan",
          onClick: handleDeletePackage,
        }}
        disabled={isDeleting}
      />

      <WarningModal
        isOpen={errorModalState.isOpen}
        setOpen={() => setErrorModalState({ isOpen: false, message: "" })}
        message={errorModalState.message}
      />
    </div>
  );
};

export default PackageSubscriptionList;
