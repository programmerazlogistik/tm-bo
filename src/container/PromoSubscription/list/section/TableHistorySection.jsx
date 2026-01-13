import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { DataTableBO, TableBO, useDataTable } from "@muatmuat/ui/Table";

import { UserTypeLabel } from "@/container/PromoSubscription/utils/enum";
// 26. 03 - TM - LB - 0128
const TableHistorySection = ({
  promos = [],
  pagination: externalPagination,
  setPagination: setExternalPagination,
  sorting: externalSorting,
  setSorting: setExternalSorting,
  data,
  loading = false,
  searchValue,
  onSearchChange,
  historyError,
}) => {
  const router = useRouter();

  const {
    sorting,
    setSorting,
    pagination: internalPagination,
    setPagination: setInternalPagination,
  } = useDataTable();

  // Use external state if provided, otherwise fallback to internal
  const pagination = externalPagination || internalPagination;
  const setPagination = setExternalPagination || setInternalPagination;

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

  const handleDetail = useCallback(
    (promo) => {
      router.push(`/promo-subscription/${promo.id}/detail`);
    },
    [router]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "action",
        header: "Action",
        headerClassName: "font-semibold",
        cell: ({ row }) => {
          const promo = row.original;

          return (
            <div className="relative">
              <Button
                variant="muatparts-primary-secondary"
                size="sm"
                onClick={() => handleDetail(promo)}
              >
                Detail
              </Button>
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

          // Map API status to Indonesian display
          const displayStatus = status === "ENDED" ? "Berakhir" : status;

          return (
            <span
              className={cn(
                "text-sm font-semibold",
                status === "ENDED" && "text-neutral-500"
              )}
            >
              {displayStatus}
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
          const userTypes = row.original.userTypes;
          if (!userTypes) return "-";

          if (Array.isArray(userTypes)) {
            return userTypes
              .map((type) => UserTypeLabel[type] || type)
              .join(", ");
          }

          return UserTypeLabel[userTypes] || userTypes;
        },
        enableSorting: true,
        sortDescFirst: false,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "promoType",
        header: "Tipe Promo",
        cell: ({ row }) => {
          return row.original.promoTypesLabel || "-";
        },
        enableSorting: true,
        sortDescFirst: false,
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
        sortDescFirst: false,
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
        sortDescFirst: false,
      },
    ],
    [handleDetail]
  );

  return (
    <>
      <section className="my-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <label
            htmlFor="search"
            className="shrink-0 whitespace-nowrap text-sm font-medium text-neutral-900"
          >
            Pencarian :
          </label>
          <div className="w-[240px]">
            <Input
              id="search"
              name="search"
              placeholder="Cari Promo"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              withReset
            />
          </div>
        </div>
      </section>

      {/* Show error state for history */}
      {historyError ? (
        <div className="rounded-md bg-red-50 p-4 text-red-700">
          Error loading data: {historyError.message}
        </div>
      ) : (
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
          onPaginationChange={setPagination}
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
      )}
    </>
  );
};

export default TableHistorySection;
