"use client";

import Image from "next/image";
import Link from "next/link";

import { IconComponent } from "@muatmuat/ui/IconComponent";

import LoginButton from "@/components/Auth/LoginButton";

// LB - 0202
const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-primary sticky left-0 top-0 z-30 flex h-[58px] w-screen items-center justify-between px-7 text-white">
      <div className="flex">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center rounded-md p-2 text-white transition-all duration-200 hover:bg-primary-800 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <IconComponent
            src="/icons/nav/fix-button.svg"
            alt="Toggle Menu"
            width={28}
            height={28}
          />
        </button>
        <div className="bg-primary flex h-[58px] items-center justify-center px-4">
          <Link href="/">
            <div className="flex flex-col items-center">
              <Image
                src="/svg/logo-muatmuat.svg"
                alt="MuatMuat Logo"
                width={136}
                height={32}
              />
            </div>
            <div className="-mt-2 mr-2 text-right text-xs font-bold text-white">
              <p>Transport Market</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Icon links */}
      <div className="ml-auto flex items-center space-x-[14px]">
        {/* User profile */}
        <LoginButton />
      </div>
    </div>
  );
};

export default Navbar;
