"use client";

import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { IconComponent } from "@muatmuat/ui/IconComponent";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn("relative w-full caption-bottom text-sm", className)}
      {...props}
    />
  )
);
Table.displayName = "Table";

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "data-[state=selected]:bg-muted border-b border-[#C6CBD4] transition-colors hover:bg-neutral-50",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  column?: any;
  children?: React.ReactNode;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, column, children, ...props }, ref) => {
    // Check if sorting is explicitly disabled for this column
    const isSortingDisabled = column?.enableSorting === false;

    // Default behavior: show sortable header unless explicitly disabled
    if (column && !isSortingDisabled && column.getCanSort?.()) {
      const sortDirection = column.getIsSorted();
      const iconSrc =
        sortDirection === "asc"
          ? "/icons/asc-sort.svg"
          : sortDirection === "desc"
            ? "/icons/desc-sort.svg"
            : "/icons/default-sort.svg";
      return (
        <th
          ref={ref}
          className={cn(
            "h-auto py-2 text-left align-middle text-xs font-semibold text-[#868686] [&:has([role=checkbox])]:pr-0",
            className
          )}
          style={{
            minWidth: `${column.getSize?.() ?? column.columnDef?.size ?? 120}px`,
          }}
          {...props}
        >
          {/* ✅ w-full class has been removed from this button */}
          <button
            onClick={() => column.toggleSorting()}
            className="flex min-h-8 items-center gap-2 p-2 text-xs font-semibold text-[#868686] hover:bg-transparent"
          >
            {children}
            <IconComponent src={iconSrc} alt="sort icon" className="h-4 w-4" />
          </button>
        </th>
      );
    }
    // Non-sortable header (when explicitly disabled or no column provided)
    return (
      <th
        ref={ref}
        className={cn(
          "h-auto py-2 text-left align-middle text-xs font-semibold text-[#868686] [&:has([role=checkbox])]:pr-0",
          className
        )}
        style={{
          minWidth: column
            ? `${column.getSize?.() ?? column.columnDef?.size ?? 120}px`
            : undefined,
        }}
        {...props}
      >
        <div className="flex min-h-8 items-center px-2">{children}</div>
      </th>
    );
  }
);
TableHead.displayName = "TableHead";

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-2 text-left align-middle text-xs text-[#1B1B1B] [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

export const TableBO = {
  Root: Table,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
};
