"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { IconComponent } from "@muatmuat/ui/IconComponent";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "CMS Homepage",
      icon: "/icons/sidebar/icon-cms-homepage.svg",
      href: "/cms-homepage",
      expandable: true,
      children: [
        {
          name: "Banner Ads",
          href: "/cms-homepage/banner-ads",
        },
        {
          name: "Banner Event",
          href: "/cms-homepage/banner-event",
        },
        {
          name: "Supplier",
          href: "/cms-homepage/supplier",
        },
        {
          name: "Section Promo",
          href: "/cms-homepage/section-promo",
        },
      ],
    },
    {
      name: "Pusat Bantuan",
      icon: "/icons/application.svg",
      href: "/help-center",
      expandable: true,
      children: [
        {
          name: "Master Tipe",
          href: "/master-type",
        },
        {
          name: "Pusat Bantuan",
          href: "/help-center",
        },
        {
          name: "Konten FAQ",
          href: "/master-faq",
        },
      ],
    },
    {
      name: "Vendor Domestik",
      icon: "/icons/nav/user.svg",
      href: "/vendor-domestik",
      expandable: true,
      children: [
        {
          name: "Register Vendor Baru",
          href: "/vendor-domestik/register",
        },
        {
          name: "Vendor Terdaftar",
          href: "/vendor-domestik/vendor-terdaftar",
        },
        {
          name: "Vendor Nonaktif",
          href: "/vendor-domestik/vendor-nonaktif",
        },
      ],
    },
    {
      name: "Vendor International",
      icon: "/icons/nav/user.svg",
      href: "/vendor-internasional",
      expandable: true,
      children: [
        {
          name: "Register Vendor Baru",
          href: "/vendor-internasional/register",
        },
        {
          name: "Vendor Terdaftar",
          href: "/vendor-internasional/vendor-terdaftar",
        },
        {
          name: "Vendor Nonaktif",
          href: "/vendor-internasional/vendor-nonaktif",
        },
      ],
    },
    {
      name: "Setting Promo Subscription",
      icon: "/icons/tags-outline.svg",
      href: "/setting-promo-subscription",
    },
    {
      name: "Permintaan Kontrak",
      icon: "/icons/nav/kontrak.svg",
      href: "/permintaan-kontrak",
    },
  ];

  // initialize expanded parents that are active
  const [expanded, setExpanded] = useState(() =>
    menuItems
      .filter(
        (it) =>
          Array.isArray(it.children) &&
          it.children.length > 0 &&
          (pathname === it.href || pathname.startsWith(`${it.href}/`))
      )
      .map((it) => it.href)
  );

  return (
    <div className="flex h-full flex-col bg-[#002064] shadow-[2px_0px_16px_0px_#00000026]">
      <div className="flex flex-grow flex-col overflow-y-auto py-2">
        {menuItems.map((item, index) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const isExpanded = expanded.includes(item.href);
          return (
            <div key={index}>
              {item.expandable ? (
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) =>
                      prev.includes(item.href)
                        ? prev.filter((p) => p !== item.href)
                        : [...prev, item.href]
                    )
                  }
                  aria-expanded={isExpanded}
                  className={`flex w-full items-center justify-between px-5 py-6 text-left transition-colors duration-200`}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <IconComponent
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        color={"white"}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {item.name}
                    </span>
                  </div>
                  <IconComponent
                    src="/icons/chevron-down-bo.svg"
                    alt="Chevron Down"
                    width={12}
                    height={12}
                    className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-5 py-6 transition-colors duration-200 ${
                    isActive ? "bg-[#007BFF]/40" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <IconComponent
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        color={"white"}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {item.name}
                    </span>
                  </div>
                </Link>
              )}
              {item.expandable && item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children.map((child, childIndex) => {
                    const isChildActive =
                      pathname === child.href ||
                      pathname.startsWith(`${child.href}/`);
                    return (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className={`flex items-center py-5 pl-12 pr-5 transition-colors duration-200 ${
                          isChildActive ? "bg-[#007BFF]" : ""
                        }`}
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold text-white">
                          <div
                            className={cn(
                              "size-2.5 rounded-full border-2 border-white",
                              isChildActive && "bg-white"
                            )}
                          />
                          {child.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
