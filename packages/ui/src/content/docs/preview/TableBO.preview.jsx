"use client";

import { TableBO } from "@muatmuat/ui/Table";

export function TableBOPreview() {
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "Designer",
      status: "Pending",
    },
  ];

  // Mock column with sorting functionality
  const mockColumn = {
    getIsSorted: () => false,
    toggleSorting: () => console.log("Sort clicked"),
  };

  const sortedColumn = {
    getIsSorted: () => "asc",
    toggleSorting: () => console.log("Sort clicked"),
  };

  const descSortedColumn = {
    getIsSorted: () => "desc",
    toggleSorting: () => console.log("Sort clicked"),
  };

  return (
    <div className="space-y-6 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Table Examples</h3>
        <p className="mb-6 text-neutral-600">
          Responsive tables with sorting capabilities and clean styling
        </p>
      </div>

      {/* Basic table */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Basic Table</h4>
        <TableBO.Root>
          <TableBO.Header>
            <TableBO.Row>
              <TableBO.Head>ID</TableBO.Head>
              <TableBO.Head>Name</TableBO.Head>
              <TableBO.Head>Email</TableBO.Head>
              <TableBO.Head>Role</TableBO.Head>
              <TableBO.Head>Status</TableBO.Head>
            </TableBO.Row>
          </TableBO.Header>
          <TableBO.Body>
            {data.map((row) => (
              <TableBO.Row key={row.id}>
                <TableBO.Cell>{row.id}</TableBO.Cell>
                <TableBO.Cell>{row.name}</TableBO.Cell>
                <TableBO.Cell>{row.email}</TableBO.Cell>
                <TableBO.Cell>{row.role}</TableBO.Cell>
                <TableBO.Cell>{row.status}</TableBO.Cell>
              </TableBO.Row>
            ))}
          </TableBO.Body>
        </TableBO.Root>
      </div>

      {/* Sortable table */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Sortable Table</h4>
        <TableBO.Root>
          <TableBO.Header>
            <TableBO.Row>
              <TableBO.Head column={sortedColumn}>Name</TableBO.Head>
              <TableBO.Head column={mockColumn}>Email</TableBO.Head>
              <TableBO.Head column={descSortedColumn}>Role</TableBO.Head>
              <TableBO.Head column={mockColumn}>Status</TableBO.Head>
            </TableBO.Row>
          </TableBO.Header>
          <TableBO.Body>
            {data.map((row) => (
              <TableBO.Row key={row.id}>
                <TableBO.Cell>{row.name}</TableBO.Cell>
                <TableBO.Cell>{row.email}</TableBO.Cell>
                <TableBO.Cell>{row.role}</TableBO.Cell>
                <TableBO.Cell>
                  <span
                    className={`rounded px-2 py-1 text-xs ${
                      row.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : row.status === "Inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </TableBO.Cell>
              </TableBO.Row>
            ))}
          </TableBO.Body>
        </TableBO.Root>
      </div>

      {/* Compact table */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Product Table</h4>
        <TableBO.Root>
          <TableBO.Header>
            <TableBO.Row>
              <TableBO.Head column={mockColumn}>Product</TableBO.Head>
              <TableBO.Head column={sortedColumn}>Price</TableBO.Head>
              <TableBO.Head column={mockColumn}>Category</TableBO.Head>
              <TableBO.Head column={mockColumn}>Stock</TableBO.Head>
            </TableBO.Row>
          </TableBO.Header>
          <TableBO.Body>
            {[
              {
                id: 1,
                product: "Laptop",
                price: "$999",
                category: "Electronics",
                stock: 15,
              },
              {
                id: 2,
                product: "Mouse",
                price: "$29",
                category: "Accessories",
                stock: 50,
              },
              {
                id: 3,
                product: "Keyboard",
                price: "$79",
                category: "Accessories",
                stock: 25,
              },
              {
                id: 4,
                product: "Monitor",
                price: "$299",
                category: "Electronics",
                stock: 8,
              },
            ].map((row) => (
              <TableBO.Row key={row.id}>
                <TableBO.Cell className="font-medium">
                  {row.product}
                </TableBO.Cell>
                <TableBO.Cell className="font-semibold">
                  {row.price}
                </TableBO.Cell>
                <TableBO.Cell>{row.category}</TableBO.Cell>
                <TableBO.Cell>
                  <span
                    className={`rounded px-2 py-1 text-xs ${
                      row.stock > 20
                        ? "bg-green-100 text-green-800"
                        : row.stock > 10
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {row.stock} in stock
                  </span>
                </TableBO.Cell>
              </TableBO.Row>
            ))}
          </TableBO.Body>
        </TableBO.Root>
      </div>
    </div>
  );
}
