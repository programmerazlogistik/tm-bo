"use client";

import { useState } from "react";

import { Breadcrumb } from "@muatmuat/ui/Breadcrumb";

export function BreadcrumbPreview() {
  const [currentPath, setCurrentPath] = useState("products");
  const [disableClick, setDisableClick] = useState(false);
  const [disableActive, setDisableActive] = useState(false);
  const [useMaxWidth, setUseMaxWidth] = useState(false);

  const breadcrumbPaths = {
    home: [{ name: "Home", href: "/" }],
    products: [
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
    ],
    electronics: [
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: "Electronics", href: "/products/electronics" },
    ],
    phones: [
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: "Electronics", href: "/products/electronics" },
      { name: "Smartphones", href: "/products/electronics/phones" },
    ],
    specific: [
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: "Electronics", href: "/products/electronics" },
      { name: "Smartphones", href: "/products/electronics/phones" },
      {
        name: "iPhone 15 Pro Max",
        href: "/products/electronics/phones/iphone-15",
      },
    ],
    long: [
      { name: "Dashboard", href: "/" },
      { name: "Sales Management", href: "/sales" },
      { name: "Regional Reports", href: "/sales/regional" },
      { name: "Quarterly Analysis", href: "/sales/regional/quarterly" },
      {
        name: "Very Long Department Name That Needs Truncation",
        href: "/long",
      },
      { name: "Current Active Page Item" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="text-sm font-medium">Navigation Path:</label>
          <select
            value={currentPath}
            onChange={(e) => setCurrentPath(e.target.value)}
            className="ml-2 rounded border px-2 py-1"
          >
            <option value="home">Home</option>
            <option value="products">Products</option>
            <option value="electronics">Products &gt; Electronics</option>
            <option value="phones">
              Products &gt; Electronics &gt; Smartphones
            </option>
            <option value="specific">Specific Product</option>
            <option value="long">Long Path with Truncation</option>
          </select>
        </div>

        <label className="text-sm font-medium">
          <input
            type="checkbox"
            checked={disableClick}
            onChange={(e) => setDisableClick(e.target.checked)}
            className="mr-2"
          />
          Disable Click
        </label>

        <label className="text-sm font-medium">
          <input
            type="checkbox"
            checked={disableActive}
            onChange={(e) => setDisableActive(e.target.checked)}
            className="mr-2"
          />
          Disable Active Style
        </label>

        <label className="text-sm font-medium">
          <input
            type="checkbox"
            checked={useMaxWidth}
            onChange={(e) => setUseMaxWidth(e.target.checked)}
            className="mr-2"
          />
          Max Width (120px)
        </label>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-gray-700">
            Current Breadcrumb:
          </h4>
          <Breadcrumb
            data={breadcrumbPaths[currentPath]}
            disableClick={disableClick}
            disableActive={disableActive}
            maxWidth={useMaxWidth ? 120 : undefined}
            className="rounded bg-white p-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">
              All Paths Preview:
            </h4>
            {Object.entries(breadcrumbPaths)
              .slice(0, 3)
              .map(([key, path]) => (
                <div key={key} className="rounded border bg-white p-2">
                  <p className="mb-1 text-xs font-medium text-gray-600">
                    {key}
                  </p>
                  <Breadcrumb data={path} className="text-xs" />
                </div>
              ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">
              Complex Examples:
            </h4>
            {Object.entries(breadcrumbPaths)
              .slice(3)
              .map(([key, path]) => (
                <div key={key} className="rounded border bg-white p-2">
                  <p className="mb-1 text-xs font-medium text-gray-600">
                    {key}
                  </p>
                  <Breadcrumb
                    data={path}
                    className="text-xs"
                    maxWidth={key === "long" ? 100 : undefined}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Navigate different paths and toggle options to see how breadcrumbs
        behave. Click on breadcrumb items to navigate (when enabled).
      </p>
    </div>
  );
}
