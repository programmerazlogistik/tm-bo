"use client";

import { useEffect, useState } from "react";

import { cn } from "@muatmuat/lib/utils";

import { ImageComponent } from "../ImageComponent";

interface AvatarAppearance {
  labelClassName?: string;
}

interface AvatarProps {
  src?: string;
  name?: string;
  nameLength?: number;
  size?: number;
  className?: string;
  appearance?: AvatarAppearance;
  alt?: string;
}

function initialsFromName(name: string, length: number = 1): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1)
    return parts[0]?.slice(0, length).toUpperCase() || "?";
  return (parts[0]?.[0] || "") + (parts[1]?.[0] || "").toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "",
  nameLength = 1,
  size = 36,
  className = "",
  appearance = {
    labelClassName: "",
  },
  alt = "avatar",
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  // reset when src changes
  useEffect(() => setImgFailed(false), [src]);

  const initials = initialsFromName(name, nameLength);

  // Map sizes to text classes based on ranges
  const getSizeClass = (size: number): string => {
    if (appearance.labelClassName) return appearance.labelClassName;
    if (size <= 24) return "text-xs";
    if (size <= 32) return "text-sm";
    if (size <= 48) return "text-base";
    return "text-base";
  };

  const baseWrapper = cn(
    "inline-flex flex-shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-primary-700",
    className
  );

  const textClass = cn(
    "font-semibold leading-none text-white",
    getSizeClass(size)
  );

  if (src && !imgFailed) {
    return (
      <ImageComponent
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(baseWrapper, "object-cover")}
        onError={() => setImgFailed(true)}
        unoptimized
      />
    );
  }

  return (
    <div
      className={cn(baseWrapper)}
      title={name}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      <span className={textClass}>{initials}</span>
    </div>
  );
};
