import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

/**
 * Create history table columns configuration
 */
export const createHistoryColumns = (packageId, router) => {
  return [
    {
      accessorKey: "createdAt",
      header: "Last Update",
      enableSorting: false,
      size: 140,
      cell: ({ row }) => {
        const date = row.original.createdAt;
        if (!date) return <span className="text-[#868686]">-</span>;

        try {
          return (
            <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
              {format(new Date(date), "dd/MM/yyyy HH:mm", { locale: localeId })}
            </div>
          );
        } catch {
          return <span className="text-[#868686]">-</span>;
        }
      },
    },
    {
      accessorKey: "activity",
      header: "Activity",
      enableSorting: false,
      size: 90,
      cell: ({ row }) => {
        const value = row.original.activity;
        return (
          <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
            {value || <span className="text-[#868686]">-</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "actorType",
      header: "By",
      enableSorting: false,
      size: 80,
      cell: ({ row }) => {
        const value = row.original.actorType;
        return (
          <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
            {value || <span className="text-[#868686]">-</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "username",
      header: "Username",
      enableSorting: false,
      size: 120,
      cell: ({ row }) => {
        const value = row.original.username;
        return (
          <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
            {value || <span className="text-[#868686]">-</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: false,
      size: 180,
      cell: ({ row }) => {
        const value = row.original.email;
        return (
          <div className="text-xs font-normal leading-[18px] text-[#1B1B1B]">
            {value || <span className="text-[#868686]">-</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "statusAfter",
      header: "Status",
      enableSorting: false,
      size: 100,
      cell: ({ row }) => {
        const status = row.original.statusAfter;
        const isActive = status === true || status === "active";
        return (
          <div
            className={`text-xs font-bold leading-[18px] ${
              isActive ? "text-[#3ECD00]" : "text-[#F71717]"
            }`}
          >
            {isActive ? "Active" : "Nonactive"}
          </div>
        );
      },
    },
    {
      id: "detail",
      header: "Detail",
      enableSorting: false,
      size: 80,
      cell: ({ row }) => {
        const historyId = row.original.id;
        return (
          <button
            className="text-xs font-medium leading-[18px] text-[#176CF7] underline"
            onClick={() =>
              router.push(
                `/package-subscription/${packageId}/detail/${historyId}`
              )
            }
          >
            Detail
          </button>
        );
      },
    },
  ];
};
