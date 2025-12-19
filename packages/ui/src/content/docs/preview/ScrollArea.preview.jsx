"use client";

import { ScrollArea, ScrollBar } from "@muatmuat/ui/ScrollArea";

export function ScrollAreaPreview() {
  const longContent = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is a description for item ${i + 1}. It contains some text to make the content longer and demonstrate scrolling functionality.`,
  }));

  const wideContent = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    columns: [
      `Column 1 - Row ${i + 1}`,
      `Column 2 - Row ${i + 1}`,
      `Column 3 - Row ${i + 1}`,
      `Column 4 - Row ${i + 1}`,
      `Column 5 - Row ${i + 1}`,
    ],
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700">
            Vertical Scrolling
          </h4>
          <ScrollArea className="h-[300px] w-full rounded-lg border">
            <div className="p-4">
              <h3 className="mb-4 text-lg font-semibold">
                Scrollable Content List
              </h3>
              <div className="space-y-4">
                {longContent.map((item) => (
                  <div key={item.id} className="rounded-lg bg-gray-50 p-3">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
          <p className="text-sm text-gray-600">
            Scroll through the list to see custom scrollbar behavior.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700">
            Horizontal Scrolling
          </h4>
          <ScrollArea className="h-[200px] w-full rounded-lg border">
            <div className="w-[800px] p-4">
              <h3 className="mb-4 text-lg font-semibold">Wide Data Table</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      {[
                        "ID",
                        "Product Name",
                        "Category",
                        "Price",
                        "Stock",
                        "Status",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="border-r p-2 text-left text-sm font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {wideContent.map((row) => (
                      <tr key={row.id} className="border-b">
                        {row.columns.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border-r p-2 text-sm">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <p className="text-sm text-gray-600">
            Horizontal scrollbar for wide content like data tables.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">
          Both Directions with Custom Styling
        </h4>
        <ScrollArea className="h-[250px] w-full rounded-lg border-2 border-primary-200 bg-primary-50">
          <div className="w-[600px] p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-primary-900">
                Mixed Content Area
              </h3>
              <p className="text-primary-700">
                This scroll area has custom styling and supports both
                directions.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="rounded-lg bg-white p-3 shadow-sm">
                  <div className="mb-2 h-16 rounded bg-primary-100"></div>
                  <h5 className="text-sm font-medium">Card {i + 1}</h5>
                  <p className="text-xs text-gray-600">
                    Content for card {i + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" className="bg-primary-200" />
        </ScrollArea>
        <p className="text-sm text-gray-600">
          Custom styled scroll area with both vertical and horizontal
          scrollbars.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">Compact Example</h4>
        <div className="flex gap-4">
          <ScrollArea className="h-[150px] w-48 rounded-lg border">
            <div className="p-3">
              <h5 className="mb-2 font-medium">Quick Links</h5>
              <ul className="space-y-1 text-sm">
                {[
                  "Dashboard",
                  "Products",
                  "Orders",
                  "Customers",
                  "Analytics",
                  "Settings",
                  "Profile",
                  "Help",
                ].map((link) => (
                  <li
                    key={link}
                    className="cursor-pointer py-1 text-blue-600 hover:underline"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>

          <ScrollArea className="h-[150px] w-48 rounded-lg border">
            <div className="p-3">
              <h5 className="mb-2 font-medium">Activity Feed</h5>
              <div className="space-y-2 text-sm">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="border-b pb-1">
                    <span className="text-gray-600">
                      User {i + 1} performed action
                    </span>
                    <span className="block text-xs text-gray-400">
                      {i + 1} min ago
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
        <p className="text-sm text-gray-600">
          Compact scroll areas for sidebars and feeds.
        </p>
      </div>
    </div>
  );
}
