"use client";

import { useEffect, useState } from "react";

import Navbar from "@/container/Layouts/Navbar";
import Sidebar from "@/container/Layouts/Sidebar";

const DesktopLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="grid min-h-screen grid-rows-[58px_1fr] overflow-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex min-w-0 overflow-hidden">
        <div
          className={`z-20 min-h-[calc(100dvh_-_58px)] bg-white shadow-md transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-0"
          }`}
        >
          <Sidebar />
        </div>

        <main className="w-0 min-w-0 flex-1 overflow-y-auto bg-white p-[18px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DesktopLayout;
