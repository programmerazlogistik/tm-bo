import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { DataTableBO, TableBO, useDataTable } from "@muatmuat/ui/Table";

import { useGetPromoSubscriptionHistoryLogs } from "@/services/promo-subscription/useGetPromoSubscriptionHistoryLogs";

const TabHistorySection = ({
  promoId,
  pagination: externalPagination,
  setPagination: setExternalPagination,
  sorting: externalSorting,
  setSorting: setExternalSorting,
}) => {
  const router = useRouter();

  const { sorting, setSorting, pagination, setPagination } = useDataTable();

  // Debounce search with 300ms delay

  const { sorting: internalSorting, setSorting: setInternalSorting } =
    useDataTable();

  // Sync external sorting with internal state
  useEffect(() => {
    if (sorting && setInternalSorting) {
      setInternalSorting((prevSorting) => {
        if (JSON.stringify(prevSorting) === JSON.stringify(sorting)) {
          return prevSorting;
        }
        return sorting;
      });
    }
  }, [sorting, setInternalSorting]);

  // Sync internal sorting with external state
  useEffect(() => {
    if (setSorting) {
      setSorting((prevSorting) => {
        if (JSON.stringify(prevSorting) === JSON.stringify(internalSorting)) {
          return prevSorting;
        }
        return internalSorting;
      });
    }
  }, [internalSorting]);

  // Fetch history logs data
  const { data, loading, error } = useGetPromoSubscriptionHistoryLogs(promoId, {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sorting: sorting,
  });

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getStatusLabel = (status) => {
    if (!status) return "-";
    const statusMap = {
      RUNNING: "Berjalan",
      UPCOMING: "Akan Datang",
      ENDED: "Berakhir",
    };
    return statusMap[status] || status;
  };

  const handleDetail = useCallback(
    (log) => {
      router.push(`/promo-subscription/${promoId}/history/${log.id}`);
    },
    [router, promoId]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "createdAt",
        header: "Last Update",
        headerClassName: "font-semibold",
        cell: ({ row }) => formatDateTime(row.original.createdAt),
        enableSorting: false,
      },
      {
        accessorKey: "activity",
        header: "Activity",
        headerClassName: "font-semibold",
        enableSorting: false,
      },
      {
        accessorKey: "actorType",
        header: "By",
        headerClassName: "font-semibold",
        enableSorting: false,
      },
      {
        accessorKey: "username",
        header: "Username",
        headerClassName: "font-semibold",
        enableSorting: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        headerClassName: "font-semibold",
        enableSorting: false,
      },
      {
        headerClassName: "font-semibold",
        accessorKey: "statusAfter",
        header: "Status",
        cell: ({ row }) => {
          const status = row?.original?.statusAfter;
          const statusLabel = getStatusLabel(status);
          return (
            <span
              className={cn(
                "text-sm font-semibold",
                status === "RUNNING" && "text-green-500",
                status === "UPCOMING" && "text-amber-500",
                status === "ENDED" && "text-neutral-500"
              )}
            >
              {statusLabel}
            </span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "detail",
        header: "Detail",
        headerClassName: "font-semibold",
        cell: ({ row }) => {
          const log = row.original;

          return (
            <Button variant="link" onClick={() => handleDetail(log)}>
              Detail
            </Button>
          );
        },
        enableSorting: false,
      },
    ],
    [handleDetail]
  );

  return (
    <>
      <DataTableBO.Root
        columns={columns}
        data={data?.history || []}
        pageCount={data?.pagination?.totalPages || 1}
        paginationData={{
          currentPage: pagination?.pageIndex + 1 || 1,
          totalPages: data?.pagination?.totalPages || 1,
          totalItems: data?.pagination?.totalData || 0,
          itemsPerPage: pagination?.pageSize || 5,
        }}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
      >
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingStatic />
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center text-red-500">
            Error loading history logs
          </div>
        ) : (
          <>
            <DataTableBO.Content Table={TableBO} />
            <DataTableBO.Pagination />
          </>
        )}
      </DataTableBO.Root>
    </>
  );
};

export default TabHistorySection;
