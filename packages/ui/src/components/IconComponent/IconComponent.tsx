import * as React from "react";
import { useMemo } from "react";

import { cn } from "@muatmuat/lib/utils";
import SVG from "react-inlinesvg";

import { getAssetPath } from "../../lib/asset-path";

const colorClasses = {
  primary: "stroke-blue-500",
  secondary: "stroke-yellow-500",
  danger: "stroke-red-600",
  white: "stroke-white",
  gray: "stroke-gray-500",
  default: "",
};

const sizes = {
  xsmall: 12,
  small: 16,
  medium: 24,
  large: 32,
};

export interface IconComponentProps {
  src: string;
  color?: keyof typeof colorClasses;
  size?: keyof typeof sizes;
  title?: string;
  alt?: string;
  height?: number;
  width?: number;
  loader?: boolean;
  rotate?: number;
  className?: string;
  onClick?: () => void;
}

/**
 * Icon component that renders SVG icons with customizable colors, sizes, and rotation.
 */
const IconComponentImplementation = ({
  src,
  color = "default",
  size,
  title,
  height = 16,
  width = 16,
  loader = true,
  rotate = 0,
  className,
  onClick,
}: IconComponentProps) => {
  // Memoize computed values to prevent unnecessary re-renders
  const computedSize = useMemo(
    () => ({
      width: size && sizes[size] ? sizes[size] : width,
      height: size && sizes[size] ? sizes[size] : height,
    }),
    [size, width, height]
  );

  const iconSrc = useMemo(() => {
    const isExternalResource =
      src &&
      (src.startsWith("http://") ||
        src.startsWith("https://") ||
        src.startsWith("//") ||
        src.startsWith("data:") ||
        src.startsWith("blob:"));
    if (isExternalResource) return src;
    return getAssetPath(src);
  }, [src]);

  const loaderElement = useMemo(
    () =>
      loader ? (
        <span
          className={cn(
            "animate-pulse",
            "rounded-sm",
            "bg-gray-500",
            rotate && `rotate-${rotate}`
          )}
          style={{
            width: `${computedSize.width}px`,
            height: `${computedSize.height}px`,
          }}
        />
      ) : null,
    [loader, computedSize.width, computedSize.height, rotate]
  );

  const buttonStyle = useMemo(
    () => ({
      width: `${computedSize.width}px`,
      height: `${computedSize.height}px`,
    }),
    [computedSize.width, computedSize.height]
  );

  const svgClassName = useMemo(
    () => cn(className, colorClasses[color], rotate && `rotate-${rotate}`),
    [className, color, rotate]
  );

  // Interactive element
  if (onClick) {
    return (
      <button type="button" style={buttonStyle} onClick={onClick}>
        <SVG
          cacheRequests
          loader={loaderElement}
          src={iconSrc}
          title={title}
          width={computedSize.width}
          height={computedSize.height}
          className={svgClassName}
        />
      </button>
    );
  }

  // Non-interactive element
  return (
    <SVG
      cacheRequests
      loader={loaderElement}
      src={iconSrc}
      title={title}
      width={computedSize.width}
      height={computedSize.height}
      className={svgClassName}
    />
  );
};

export const IconComponent = React.memo(IconComponentImplementation);
IconComponent.displayName = "IconComponent";
