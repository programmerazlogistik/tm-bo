import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { ConfirmationModal } from "@muatmuat/ui/Modal";
import { DataTableBO, TableBO, useDataTable } from "@muatmuat/ui/Table";
import { toast } from "@muatmuat/ui/Toaster";

import { useCancelPromoSubscription } from "@/services/promo-subscription/useCancelPromoSubscription";

import { ActionDropdown } from "@/components/Dropdown/ActionDropdown";

import { PromoStatus } from "@/container/PromoSubscription/utils/enum";

const TableActiveSection = ({
  promos = [],
  pagination: externalPagination,
  setPagination: setExternalPagination,
  sorting: externalSorting,
  setSorting: setExternalSorting,
  data,
  loading = false,
  mutate,
}) => {
  const router = useRouter();
  const { cancelSubscription, isLoading: isCancelLoading } =
    useCancelPromoSubscription();

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

          // If status is "RUNNING", add "Ubah" action
          if (promo.status === PromoStatus.RUNNING) {
            actions.push({
              title: "Ubah",
              onClick: () => handleEdit(promo),
            });
          }

          // If status is "UPCOMING", add both "Ubah" and "Batalkan" actions
          if (promo.status === PromoStatus.UPCOMING) {
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
        accessorKey: "promoId",
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
          const statusLabel = row?.original?.statusLabel;

          return (
            <span
              className={cn(
                "text-sm font-semibold",
                status === "RUNNING" && "text-green-500",
                status === "UPCOMING" && "text-amber-500",
                status === "ENDED" && "text-neutral-500"
              )}
            >
              {statusLabel || status}
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
        accessorKey: "userTypes",
        header: "User",
        cell: ({ row }) => {
          return row.original.userTypesLabel || "-";
        },
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "promoType",
        header: "Tipe Promo",
        cell: ({ row }) => {
          return row.original.promoTypesLabel || "-";
        },
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "finalPrice", // Sorting key needs to match API param
        header: "Harga Promo",
        cell: ({ row }) => {
          const pricing = row.original.pricing;
          if (!pricing) return "-";

          const normalPrice = pricing.normalPrice;
          const finalPrice = pricing.finalPrice;

          // If normalPrice equals finalPrice, no discount applied
          if (normalPrice === finalPrice) {
            return <span>Rp {formatNumber(normalPrice)}</span>;
          }

          return (
            <div className="flex flex-col">
              <span className="text-gray-500 line-through">
                Rp {formatNumber(normalPrice)}
              </span>
              <span>Rp {formatNumber(finalPrice)}</span>
            </div>
          );
        },
        enableSorting: true,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "finalCoinsEarned", // Sorting key needs to match API param
        header: "Free Coin",
        cell: ({ row }) => {
          const coins = row.original.coins;
          if (!coins) return "-";

          const normalCoins = coins.normalCoins;
          const bonusCoins = coins.bonusCoins;
          const totalCoins = coins.totalCoins;
          const isUnlimited = row.original.isUnlimitedCoin;

          if (isUnlimited) return "Unlimited";

          // If no free coins, just show normal coins
          if (!bonusCoins) {
            return <span>{formatNumber(normalCoins)}</span>;
          }

          // Show normal coins + bonus
          return (
            <div className="flex flex-col">
              <span>{formatNumber(totalCoins)}</span>
              <span className="text-sm text-gray-500">
                (+{formatNumber(bonusCoins)} bonus)
              </span>
            </div>
          );
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
          totalItems:
            data?.pagination?.totalItems ||
            data?.pagination?.totalRecords ||
            data?.pagination?.TotalData ||
            0,
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
            modalState.type === "cancel" && modalState.promo ? (
              <span>
                Apakah Anda yakin ingin membatalkan promo{" "}
                <strong>{modalState.promo.promoId}</strong> ?
              </span>
            ) : modalState.type === "delete" && modalState.promo ? (
              <span>
                Apakah Anda yakin ingin menghapus promo{" "}
                <strong>{modalState.promo.promoId}</strong> ?
              </span>
            ) : null,
        }}
        cancel={{
          text: "Batal",
          disabled: isProcessing,
        }}
        confirm={{
          text:
            isProcessing || isCancelLoading
              ? "Memproses..."
              : modalState.type === "cancel"
                ? "Ya"
                : "Hapus",
          onClick: async () => {
            setIsProcessing(true);
            // Handle the action based on type
            if (modalState.type === "cancel") {
              try {
                // Call the cancel API
                const response = await cancelSubscription(modalState.promo.id);

                if (response?.Message?.Code === 200) {
                  // Show success toast
                  toast.success("Promo berhasil dibatalkan");
                  // Use mutate to refresh the data
                  if (mutate) {
                    await mutate();
                  }
                } else {
                  toast.error("Gagal membatalkan promo");
                }
              } catch (error) {
                toast.error(error.message || "Gagal membatalkan promo");
              }
            } else if (modalState.type === "delete") {
              // Handle deletion logic here
              console.log(`Promo ${modalState.promo.id} deleted`);
              // Simulate API call delay
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            setIsProcessing(false);
            closeConfirmationModal();
          },
          disabled: isProcessing || isCancelLoading,
        }}
      />
    </>
  );
};

export default TableActiveSection;
