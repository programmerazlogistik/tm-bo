import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { DataTableBO, TableBO } from "@muatmuat/ui/Table";

import {
  formatActivity,
  formatDate,
  formatPromoType,
} from "../utils/formatters";

const HistoryTable = ({ history = [], pagination = {}, promoId = "" }) => {
  const router = useRouter();
  const columns = useMemo(() => {
    return [
      {
        accessorKey: "lastUpdate",
        header: () => <span className="font-normal italic">last update</span>,
        cell: ({ row }) => {
          return (
            <span className="text-xs font-normal text-neutral-900">
              {formatDate(row.original.createdAt)}
            </span>
          );
        },
      },
      {
        accessorKey: "admin",
        header: "Admin",
        cell: ({ row }) => {
          return (
            <span className="text-xs font-normal text-neutral-900">
              {row.original.admin || "-"}
            </span>
          );
        },
      },
      {
        accessorKey: "startDate",
        header: "Tanggal Mulai",
        cell: ({ row }) => {
          return (
            <span className="text-xs font-normal text-neutral-900">
              {formatDate(row.original.startDate)}
            </span>
          );
        },
      },
      {
        accessorKey: "endDate",
        header: "Tanggal Akhir",
        cell: ({ row }) => {
          return (
            <span className="text-xs font-normal text-neutral-900">
              {formatDate(row.original.endDate)}
            </span>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Tipe",
        cell: ({ row }) => {
          return (
            <span className="text-xs font-normal text-neutral-900">
              {formatPromoType(row.original.type)}
            </span>
          );
        },
      },
      {
        accessorKey: "url",
        header: "URL Redirect",
        cell: ({ row }) => {
          return (
            <span className="text-xs font-normal text-primary-700">
              {row.original.url || "-"}
            </span>
          );
        },
      },
      {
        accessorKey: "activity",
        header: "Aktivitas",
        cell: ({ row }) => {
          const activity = row.original.activity;
          const historyId = row.original.id;
          return (
            <span
              className="cursor-pointer text-xs font-normal text-primary-700 underline hover:text-primary-800"
              onClick={() => {
                router.push(
                  `/cms-homepage/section-promo/detail/${promoId}/history/${historyId}`
                );
              }}
            >
              {formatActivity(activity)}
            </span>
          );
        },
      },
    ];
  }, [promoId, router]);

  const tableData = useMemo(() => history || [], [history]);
  const pageCount = useMemo(
    () => pagination?.totalPages || Math.ceil((history?.length || 0) / 10),
    [history, pagination]
  );

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-sm font-medium text-neutral-900">
        Riwayat Perubahan
      </h2>
      <DataTableBO.Root
        columns={columns}
        data={tableData}
        pageCount={pageCount}
        manualPagination={false}
      >
        <DataTableBO.Content Table={TableBO} />
        <DataTableBO.Pagination />
      </DataTableBO.Root>
    </div>
  );
};

export default HistoryTable;
