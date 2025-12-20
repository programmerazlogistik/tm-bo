import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { ConfirmationModal } from "@muatmuat/ui/Modal";
import { DataTableBO, TableBO, useDataTable } from "@muatmuat/ui/Table";
import { toast } from "@muatmuat/ui/Toaster";

import { ActionDropdown } from "@/components/Dropdown/ActionDropdown";

const TableActiveSection = ({
  promos = [],
  pagination: externalPagination,
  setPagination: setExternalPagination,
  sorting: externalSorting,
  setSorting: setExternalSorting,
  data,
  loading = false,
}) => {
  const router = useRouter();

  const { sorting, setSorting, pagination, setPagination } = useDataTable();

  // Sync external sorting with internal state if provided
  useEffect(() => {
    if (externalSorting && setSorting) {
      // Only update if the sorting actually changed
      setSorting((prevSorting) => {
        if (JSON.stringify(prevSorting) === JSON.stringify(externalSorting)) {
          return prevSorting;
        }
        return externalSorting;
      });
    }
  }, [externalSorting, setSorting]);

  // Sync internal sorting with external state if provided
  useEffect(() => {
    if (setExternalSorting) {
      // Only update if the sorting actually changed
      setExternalSorting((prevSorting) => {
        if (JSON.stringify(prevSorting) === JSON.stringify(sorting)) {
          return prevSorting;
        }
        return sorting;
      });
    }
  }, [sorting, setExternalSorting]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    promo: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Helper function to format numbers
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0";
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const handleEdit = useCallback(
    (promo) => {
      router.push(`/promo-subscription/${promo.id}/edit`);
    },
    [router]
  );

  const handleDetail = useCallback(
    (promo) => {
      router.push(`/promo-subscription/${promo.id}/detail`);
    },
    [router]
  );

  const handleAdd = useCallback(() => {
    router.push("/promo-subscription/add");
  }, [router]);

  const openConfirmationModal = useCallback((type, promo) => {
    setModalState({ isOpen: true, type, promo });
  }, []);

  const closeConfirmationModal = useCallback(() => {
    setModalState({ isOpen: false, type: null, promo: null });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "action",
        header: "Action",
        headerClassName: "font-semibold",
        cell: ({ row }) => {
          const promo = row.original;

          // Determine which actions to show based on status
          const actions = [
            {
              title: "Detail",
              onClick: () => handleDetail(promo),
            },
          ];

          // If status is "Berjalan", add "Ubah" action
          if (promo.status === "Berjalan") {
            actions.push({
              title: "Ubah",
              onClick: () => handleEdit(promo),
            });
          }

          // If status is "Akan Datang", add both "Ubah" and "Batalkan" actions
          if (promo.status === "Akan Datang") {
            actions.push(
              {
                title: "Ubah",
                onClick: () => handleEdit(promo),
              },
              {
                title: "Batalkan",
                onClick: () => openConfirmationModal("cancel", promo),
                className: "text-[#F71717]",
              }
            );
          }

          return (
            <div className="relative">
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
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "id",
        header: "ID",
        headerClassName: "font-semibold",
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row?.original?.status;
          return (
            <span
              className={cn(
                "text-sm font-semibold",
                status === "Berjalan" && "text-green-500",
                status === "Akan Datang" && "text-amber-500",
                status === "Selesai" && "text-neutral-500"
              )}
            >
              {status}
            </span>
          );
        },
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "packageName",
        header: "Nama Paket",
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "startDate",
        header: "Mulai Berlaku",
        cell: ({ row }) => formatDateTime(row.original.startDate),
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "endDate",
        header: "Berakhir",
        cell: ({ row }) => formatDateTime(row.original.endDate),
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
          const userTypes = row.original.user;
          if (!userTypes) return "-";

          // Assuming user is an array of user types
          if (Array.isArray(userTypes)) {
            return userTypes.join(", ");
          }

          return userTypes;
        },
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "promoType",
        header: "Tipe Promo",
        cell: ({ row }) => {
          const promoTypes = row.original.promoType;
          if (!promoTypes) return "-";

          // Assuming promoType is an array of promo types
          if (Array.isArray(promoTypes)) {
            return promoTypes.join(", ");
          }

          return promoTypes;
        },
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "promoPrice",
        header: "Harga Promo",
        cell: ({ row }) => {
          const originalPrice = row.original.originalPrice;
          const promoPrice = row.original.promoPrice;

          if (promoPrice === null || promoPrice === undefined) {
            return <span>Rp {formatNumber(originalPrice)}</span>;
          }

          return (
            <div className="flex flex-col">
              <span className="text-gray-500 line-through">
                Rp {formatNumber(originalPrice)}
              </span>
              <span>Rp {formatNumber(promoPrice)}</span>
            </div>
          );
        },
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "freeCoin",
        header: "Free Coin",
        cell: ({ row }) => {
          const freeCoin = row.original.freeCoin;
          const bonusCoin = row.original.bonusCoin;

          if (freeCoin === "unlimited") {
            return <span>Unlimited</span>;
          }

          if (bonusCoin) {
            return (
              <div className="flex flex-col">
                <span>{formatNumber(freeCoin)}</span>
                <span>(+{formatNumber(bonusCoin)} bonus)</span>
              </div>
            );
          }

          return <span>{formatNumber(freeCoin)}</span>;
        },
        enableSorting: true,
      },
    ],
    []
  );

  return (
    <>
      <DataTableBO.Root
        columns={columns}
        data={promos}
        pageCount={data?.pagination?.totalPages || 1}
        paginationData={{
          currentPage: pagination?.pageIndex + 1 || 1,
          totalPages: data?.pagination?.totalPages || 1,
          totalItems: data?.pagination?.totalItems || 0,
          itemsPerPage: pagination?.pageSize || 10,
        }}
        pagination={pagination}
        onPaginationChange={setExternalPagination || setPagination}
        sorting={externalSorting || sorting}
        onSortingChange={setExternalSorting || setSorting}
      >
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingStatic />
          </div>
        ) : (
          <>
            <DataTableBO.Content Table={TableBO} />
            <DataTableBO.Pagination />
          </>
        )}
      </DataTableBO.Root>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        setIsOpen={closeConfirmationModal}
        variant="bo"
        title={{
          text: "Pemberitahuan",
        }}
        description={{
          text:
            modalState.type === "cancel" && modalState.promo
              ? `Apakah Anda yakin ingin membatalkan promo ${modalState.promo.id}?`
              : modalState.type === "delete" && modalState.promo
                ? `Apakah Anda yakin ingin menghapus promo ${modalState.promo.id}?`
                : "Apakah Anda yakin ingin melakukan tindakan ini?",
        }}
        cancel={{
          text: "Batal",
          disabled: isProcessing,
        }}
        confirm={{
          text: isProcessing
            ? "Memproses..."
            : modalState.type === "cancel"
              ? "Ya"
              : "Hapus",
          onClick: async () => {
            setIsProcessing(true);
            // Handle the action based on type
            if (modalState.type === "cancel") {
              // Handle cancellation logic here
              console.log(`Promo ${modalState.promo.id} cancelled`);
              // Simulate API call delay
              await new Promise((resolve) => setTimeout(resolve, 1000));
              // Show success toast
              toast.success("Data berhasil disimpan");
            } else if (modalState.type === "delete") {
              // Handle deletion logic here
              console.log(`Promo ${modalState.promo.id} deleted`);
              // Simulate API call delay
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            setIsProcessing(false);
            closeConfirmationModal();
          },
          disabled: isProcessing,
        }}
      />
    </>
  );
};

export default TableActiveSection;
