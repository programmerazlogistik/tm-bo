"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { ConfirmationModal } from "@muatmuat/ui/Modal";
import { DataTableBO, TableBO, useDataTable } from "@muatmuat/ui/Table";
import { toast } from "@muatmuat/ui/Toaster";

import { useDeletePackageSubscription } from "@/services/package-subscription/useDeletePackageSubscription";

import { ActionDropdown } from "@/components/Dropdown/ActionDropdown";
import PageTitle from "@/components/PageTitle/PageTitle";

import ToggleStatus from "./components/ToggleStatus";

// Format currency to IDR
const formatCurrency = (value) => {
  if (!value && value !== 0) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

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
}) => {
  const router = useRouter();
  const { deletePackageSubscription, isMutating: isDeleting } =
    useDeletePackageSubscription();

  const {
    sorting,
    setSorting,
    pagination,
    setPagination,
    inputValue,
    onSearchChange,
  } = useDataTable();

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    package: null,
  });

  const tableData = useMemo(() => {
    return data?.packages || [];
  }, [data]);

  const paginationData = useMemo(() => data?.pagination, [data]);
  const pageCount = useMemo(() => data?.pagination?.totalPages ?? -1, [data]);

  const openConfirmationModal = useCallback((type, pkg) => {
    setModalState({ isOpen: true, type, package: pkg });
  }, []);

  const closeConfirmationModal = useCallback(() => {
    setModalState({ isOpen: false, type: null, package: null });
  }, []);

  const handleEdit = useCallback(
    (pkg) => {
      router.push(`/master-data/package-subscription/edit/${pkg.id}`);
    },
    [router]
  );

  const handleDetail = useCallback(
    (pkg) => {
      router.push(`/master-data/package-subscription/detail/${pkg.id}`);
    },
    [router]
  );

  const handleAdd = useCallback(() => {
    router.push("/master-data/package-subscription/add");
  }, [router]);

  const handleDeletePackage = useCallback(async () => {
    if (modalState.package && modalState.type === "delete") {
      try {
        await deletePackageSubscription(modalState.package.id);

        toast.success("Berhasil menghapus paket");

        // Refresh the data
        if (onRefresh) onRefresh();
      } catch (error) {
        toast.error(
          error?.response?.data?.Message?.Text || `Gagal menghapus paket`
        );
      }
    }
    closeConfirmationModal();
  }, [
    modalState,
    closeConfirmationModal,
    onRefresh,
    deletePackageSubscription,
  ]);

  const columns = useMemo(() => {
    return [
      {
        id: "actions",
        header: "Action",
        enableSorting: false,
        size: 85,
        cell: ({ row }) => {
          const pkg = row.original;

          const actions = [
            {
              title: "Detail",
              onClick: () => handleDetail(pkg),
            },
            {
              title: "Ubah",
              onClick: () => handleEdit(pkg),
            },
            {
              title: "Hapus",
              onClick: () => openConfirmationModal("delete", pkg),
              className: "text-[#F71717]",
            },
          ];

          return (
            <ActionDropdown.Root>
              <ActionDropdown.Trigger />
              <ActionDropdown.Content>
                {actions.map((item) => (
                  <ActionDropdown.Item
                    key={item.title}
                    onClick={item.onClick}
                    className={item.className}
                  >
                    {item.title}
                  </ActionDropdown.Item>
                ))}
              </ActionDropdown.Content>
            </ActionDropdown.Root>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        enableSorting: false,
        size: 85,
        cell: ({ row }) => {
          const pkg = row.original;
          return <ToggleStatus package={pkg} onSuccess={onRefresh} />;
        },
      },
      {
        accessorKey: "posisi",
        header: "Posisi",
        size: 90,
        enableSorting: true,
        cell: ({ row }) => {
          const value = row.original.posisi;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value || <span className="text-[#868686]">-</span>}
            </div>
          );
        },
      },
      {
        accessorKey: "namaPaket",
        header: "Nama Paket",
        size: 150,
        enableSorting: true,
        cell: ({ row }) => {
          const value = row.original.namaPaket;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value || <span className="text-[#868686]">-</span>}
            </div>
          );
        },
      },
      {
        accessorKey: "mulaiBerlaku",
        header: "Mulai Berlaku",
        size: 150,
        enableSorting: true,
        cell: ({ row }) => {
          const value = row.original.mulaiBerlaku;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value || <span className="text-[#868686]">-</span>}
            </div>
          );
        },
      },
      {
        accessorKey: "periode",
        header: "Periode",
        size: 120,
        enableSorting: true,
        cell: ({ row }) => {
          const value = row.original.periode;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value || <span className="text-[#868686]">-</span>}
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
        enableSorting: true,
        cell: ({ row }) => {
          const value = row.original.price;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {formatCurrency(value)}
            </div>
          );
        },
      },
      {
        accessorKey: "koin",
        header: "Koin",
        size: 100,
        enableSorting: true,
        cell: ({ row }) => {
          const value = row.original.koin;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value !== null && value !== undefined ? (
                value.toLocaleString("id-ID")
              ) : (
                <span className="text-[#868686]">-</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "terpopuler",
        header: "Terpopuler",
        size: 120,
        enableSorting: false,
        cell: ({ row }) => {
          const value = row.original.terpopuler;
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {value || <span className="text-[#868686]">-</span>}
            </div>
          );
        },
      },
    ];
  }, [handleDetail, handleEdit, openConfirmationModal, onRefresh]);

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
        pagination={pagination}
        onPaginationChange={onPaginationChange || setPagination}
        sorting={externalSorting !== undefined ? externalSorting : sorting}
        onSortingChange={(updater) => {
          if (onSortingChangeProp) {
            onSortingChangeProp(updater);
          } else {
            setSorting(updater);
          }
        }}
        inputValue={inputValue}
        onSearchChange={(value) => {
          onSearchChange(value);
          if (onSearchChangeProp) {
            onSearchChangeProp(value);
          }
        }}
      >
        <DataTableBO.Header>
          <div className="flex w-full justify-between">
            <Input
              value={
                externalInputValue !== undefined
                  ? externalInputValue
                  : inputValue
              }
              onChange={(e) => {
                const value = e.target.value;
                if (onSearchChangeProp) {
                  onSearchChangeProp(value);
                } else {
                  onSearchChange(value);
                }
              }}
              onKeyPress={(e) => {
                if (onKeyPressProp) {
                  onKeyPressProp(e);
                }
              }}
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
              + Buat Paket
            </Button>
          </div>
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

      {/* Konfirmasi Hapus */}
      <ConfirmationModal
        isOpen={modalState.isOpen && modalState.type === "delete"}
        setIsOpen={closeConfirmationModal}
        variant="bo"
        title={{
          text: "Pemberitahuan",
        }}
        description={{
          text: modalState.package
            ? `Apakah Anda yakin ingin menghapus paket "${modalState.package.namaPaket}"?`
            : "Apakah Anda yakin ingin menghapus paket ini?",
        }}
        cancel={{
          text: "Batal",
        }}
        confirm={{
          text: isDeleting ? "Menghapus..." : "Simpan",
          onClick: handleDeletePackage,
        }}
        disabled={isDeleting}
      />
    </div>
  );
};

export default PackageSubscriptionList;
