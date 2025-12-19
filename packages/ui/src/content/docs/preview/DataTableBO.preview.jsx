"use client";

import { useMemo, useState } from "react";

import { DataTableBO, TableBO } from "@muatmuat/ui/Table";

export function DataTableBOPreview() {
  const [data] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
      department: "Design",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Manager",
      department: "Management",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "Designer",
      department: "Design",
      status: "Pending",
    },
    {
      id: 6,
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Product Manager",
      department: "Product",
      status: "Active",
    },
    {
      id: 7,
      name: "Edward Norton",
      email: "edward@example.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: 8,
      name: "Fiona Green",
      email: "fiona@example.com",
      role: "QA Engineer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: 9,
      name: "George Miller",
      email: "george@example.com",
      role: "Marketing Lead",
      department: "Marketing",
      status: "Inactive",
    },
    {
      id: 10,
      name: "Helen Troy",
      email: "helen@example.com",
      role: "Sales Representative",
      department: "Sales",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState([{ id: "name", desc: false }]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={`rounded px-2 py-1 text-xs ${
              info.getValue() === "Active"
                ? "bg-green-100 text-green-800"
                : info.getValue() === "Inactive"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
    ],
    []
  );

  const paginationData = {
    currentPage: pagination.pageIndex + 1,
    itemsPerPage: pagination.pageSize,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / pagination.pageSize),
  };

  return (
    <div className="space-y-6 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Data Table Examples</h3>
        <p className="mb-6 text-neutral-600">
          Advanced data tables with search, pagination, and sorting capabilities
        </p>
      </div>

      {/* Full-featured data table */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Employee Directory</h4>
        <DataTableBO.Root
          data={data}
          columns={columns}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          paginationData={paginationData}
        >
          <DataTableBO.Header>
            <DataTableBO.Search />
          </DataTableBO.Header>
          <DataTableBO.Content Table={TableBO} />
          <DataTableBO.Pagination />
        </DataTableBO.Root>
      </div>

      {/* Custom header example */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Custom Header Example</h4>
        <DataTableBO.Root
          data={data.slice(0, 6)}
          columns={[
            { accessorKey: "name", header: "Employee Name" },
            { accessorKey: "role", header: "Position" },
            { accessorKey: "department", header: "Department" },
            { accessorKey: "status", header: "Status" },
          ]}
          pagination={{ pageIndex: 0, pageSize: 10 }}
          onPaginationChange={() => {}}
          paginationData={{
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 6,
            totalPages: 1,
          }}
        >
          <DataTableBO.Header className="border-b pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Team Overview</h2>
              <DataTableBO.Search />
            </div>
          </DataTableBO.Header>
          <DataTableBO.Content Table={TableBO} />
        </DataTableBO.Root>
      </div>

      {/* Small dataset example */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Simple Product List</h4>
        <DataTableBO.Root
          data={[
            {
              id: 1,
              product: "Laptop",
              price: 999,
              category: "Electronics",
              stock: 15,
            },
            {
              id: 2,
              product: "Mouse",
              price: 29,
              category: "Accessories",
              stock: 50,
            },
            {
              id: 3,
              product: "Keyboard",
              price: 79,
              category: "Accessories",
              stock: 25,
            },
          ]}
          columns={[
            { accessorKey: "product", header: "Product" },
            { accessorKey: "price", header: "Price" },
            { accessorKey: "category", header: "Category" },
            { accessorKey: "stock", header: "Stock" },
          ]}
          pagination={{ pageIndex: 0, pageSize: 5 }}
          onPaginationChange={() => {}}
          paginationData={{
            currentPage: 1,
            itemsPerPage: 5,
            totalItems: 3,
            totalPages: 1,
          }}
        >
          <DataTableBO.Content Table={TableBO} />
        </DataTableBO.Root>
      </div>
    </div>
  );
}
