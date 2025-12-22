import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useDebounce } from "@muatmuat/hooks/use-debounce";
import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { DataTableBO, TableBO, useDataTable } from "@muatmuat/ui/Table";

import { useGetPromoSubscriptionHistoryLogs } from "@/services/promo-subscription/useGetPromoSubscriptionHistoryLogs";

const TabHistorySection = ({ promoId }) => {
  const router = useRouter();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");

  // Debounce search with 300ms delay
  const debouncedSearch = useDebounce(search, 300);

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
    filters: {
      search: debouncedSearch,
    },
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

  const handleDetail = useCallback(
    (log) => {
      router.push(`/promo-subscription/${promoId}/history/${log.id}`);
    },
    [router, promoId]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "lastUpdate",
        header: "Last Update",
        headerClassName: "font-semibold",
        cell: ({ row }) => formatDateTime(row.original.lastUpdate),
        enableSorting: true,
      },
      {
        accessorKey: "activity",
        header: "Activity",
        headerClassName: "font-semibold",
        enableSorting: true,
      },
      {
        accessorKey: "by",
        header: "By",
        headerClassName: "font-semibold",
        enableSorting: true,
      },
      {
        accessorKey: "username",
        header: "Username",
        headerClassName: "font-semibold",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
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
                status === "Berakhir" && "text-neutral-500"
              )}
            >
              {status}
            </span>
          );
        },
        enableSorting: true,
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
              placeholder="Cari Log"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <DataTableBO.Root
        columns={columns}
        data={data?.items || []}
        pageCount={data?.pagination?.totalPages || 1}
        paginationData={{
          currentPage: pagination?.pageIndex + 1 || 1,
          totalPages: data?.pagination?.totalPages || 1,
          totalItems: data?.pagination?.totalItems || 0,
          itemsPerPage: pagination?.pageSize || 10,
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
