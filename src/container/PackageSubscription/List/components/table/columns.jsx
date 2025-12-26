import { ActionDropdown } from "@/components/Dropdown/ActionDropdown";

import { formatCurrency, formatNumber } from "../../lib/utils";
import ToggleStatus from "../ToggleStatus";

/**
 * Create table cell with default styling
 */
const TableCell = ({ value, isBold = false }) => {
  const textClass = isBold
    ? "font-bold text-[#1B1B1B]"
    : "font-normal text-[#1B1B1B]";

  return (
    <div className={`text-xs leading-[18px] ${textClass}`}>
      {value || <span className="text-[#868686]">-</span>}
    </div>
  );
};

/**
 * Generate table columns configuration
 * @param {Object} handlers - Action handlers
 * @param {Function} handlers.onDetail - Detail handler
 * @param {Function} handlers.onEdit - Edit handler
 * @param {Function} handlers.onDelete - Delete handler
 * @param {Function} handlers.onRefresh - Refresh handler
 */
export const createColumns = ({ onDetail, onEdit, onDelete, onRefresh }) => {
  return [
    {
      id: "actions",
      header: "Action",
      enableSorting: false,
      size: 85,
      cell: ({ row }) => {
        const pkg = row.original;
        const actions = [
          { title: "Detail", onClick: () => onDetail(pkg) },
          { title: "Ubah", onClick: () => onEdit(pkg) },
          {
            title: "Hapus",
            onClick: () => onDelete(pkg),
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
      cell: ({ row }) => (
        <ToggleStatus package={row.original} onSuccess={onRefresh} />
      ),
    },
    {
      accessorKey: "posisi",
      header: "Posisi",
      size: 90,
      enableSorting: true,
      cell: ({ row }) => <TableCell value={row.original.posisi} />,
    },
    {
      accessorKey: "namaPaket",
      header: "Nama Paket",
      size: 150,
      enableSorting: true,
      cell: ({ row }) => <TableCell value={row.original.namaPaket} />,
    },
    {
      accessorKey: "mulaiBerlaku",
      header: "Mulai Berlaku",
      size: 150,
      enableSorting: true,
      cell: ({ row }) => <TableCell value={row.original.mulaiBerlaku} />,
    },
    {
      accessorKey: "periode",
      header: "Periode",
      size: 120,
      enableSorting: true,
      cell: ({ row }) => <TableCell value={row.original.periode} />,
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 150,
      enableSorting: true,
      cell: ({ row }) => (
        <TableCell value={formatCurrency(row.original.price)} />
      ),
    },
    {
      accessorKey: "koin",
      header: "Koin",
      size: 100,
      enableSorting: true,
      cell: ({ row }) => <TableCell value={formatNumber(row.original.koin)} />,
    },
    {
      accessorKey: "terpopuler",
      header: "Terpopuler",
      size: 120,
      enableSorting: false,
      cell: ({ row }) => {
        const isPopular = row.original.terpopuler === "Ya";
        return (
          <div className="text-xs leading-[18px]">
            {isPopular && <TableCell value="Terpopuler" isBold />}
          </div>
        );
      },
    },
  ];
};
