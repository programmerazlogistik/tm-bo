"use client";

import Image from "next/image";
import Link from "next/link";

// Adjust path if needed
import { IconComponent } from "@muatmuat/ui/IconComponent";

// Adjust path if needed

/**
 * TopNavbar Component
 * This is the red navigation bar at the top of the layout.
 */
const TopNavbar = () => {
  return (
    // Outer bar wrapper
    // Figma CSS: height: 60px; background: #770000; padding: 12px 40px;
    <nav className="flex h-[60px] w-full items-center justify-center bg-[#770000] px-10 py-3">
      {/* Inner container for content alignment 
        Figma CSS: width: 1200px; margin: 0 auto; display: flex; align-items: center;
        Screenshot shows justify-between, so we use that.
      */}
      <div className="flex w-full max-w-[1200px] items-center justify-start gap-6">
        {/* Left Side: Logo */}
        <Link href="/" aria-label="Beranda Seller">
          {/* Figma CSS: width: 167px; height: 36px;
            Using placeholder as per guidelines.
          */}
          <Image
            src="/icons/muatpartsplus-seller.svg" // Placeholder
            alt="MuatParts Seller Logo"
            width={167}
            height={36}
            priority
          />
        </Link>

        {/* Right Side: Links & Language */}
        {/* Figma CSS: gap: 24px -> gap-6 */}
        <div className="flex items-center gap-6">
          {/* Download Link */}
          {/* Figma CSS: display: flex; align-items: center; gap: 4px -> gap-1 */}
          <Link href="/download" className="flex items-center gap-1">
            <IconComponent
              src="/icons/phone.svg" // Assumed icon path
              alt="Download"
              width={16}
              height={16}
              className="text-white" // Ensure icon is white
            />
            {/* Figma CSS: 
              font-weight: 600 -> font-semibold
              font-size: 12px -> text-xs
              color: #FFFFFF -> text-white
            */}
            <span className="text-xs font-semibold text-white">
              Download muatmuat
            </span>
          </Link>

          {/* Language Selector */}
          {/* Figma CSS: display: flex; align-items: center; gap: 4px -> gap-1 */}
          <button
            type="button"
            className="flex items-center gap-1"
            aria-label="Pilih bahasa"
          >
            {/* Figma CSS: 
              width: 24px, height: 16px, border, border-radius: 4px
            */}
            <Image
              src="https://azlogistik-rc.s3.ap-southeast-3.amazonaws.com/image_path-1747055003595.webp" // Placeholder for flag
              alt="Bendera Indonesia"
              width={24}
              height={16}
              className="rounded-[4px] border-[0.5px] border-[#C4C4C4]"
            />
            <span className="text-xs font-semibold text-white">IDN</span>
            <IconComponent
              src="/icons/chevron-down.svg"
              alt=""
              width={16}
              height={16}
              className="text-white" // Explicitly color icon white
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

/**
 * Main AuthLayout Component
 * This layout wraps content pages and includes the TopNavbar.
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {" "}
      {/* Added a default background */}
      <TopNavbar />
      <main>{children}</main>
      {/* A footer could be added here */}
    </div>
  );
};

export default AuthLayout;
