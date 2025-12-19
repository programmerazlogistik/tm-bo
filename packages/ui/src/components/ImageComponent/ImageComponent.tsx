"use client";

import Image from "next/image";
import * as React from "react";

import { getAssetPath } from "../../lib/asset-path";

interface ImageProps {
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  quality?: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
  unoptimized?: boolean;
  blurDataURL?: string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  placeholder?: "blur" | "empty";
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: () => void;
  sizes?: string;
}

/**
 * A wrapper component around Next.js Image with custom source URL handling
 */
export const ImageComponent: React.FC<ImageProps> = ({
  src = "",
  width = 100,
  height = 100,
  alt = "alt",
  className,
  ...props
}) => {
  // Check if src is an external resource
  const isExternalResource =
    src &&
    (src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("//") ||
      src.startsWith("data:") ||
      src.startsWith("blob:"));

  const source = isExternalResource ? src : getAssetPath(src);

  return (
    <Image
      src={source}
      width={width}
      height={height}
      className={className}
      alt={alt}
      {...props}
    />
  );
};
