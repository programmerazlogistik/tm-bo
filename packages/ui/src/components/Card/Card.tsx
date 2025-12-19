import React from "react";

import { cn } from "@muatmuat/lib/utils";

import { IconComponent } from "../IconComponent";
import {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  ListContentProps,
} from "./types";

export const Card = ({ className, keys, children }: CardProps) => {
  return (
    <div
      key={keys}
      className={cn(
        "h-full w-full rounded-md border border-neutral-600 bg-white text-neutral-900 shadow-muat",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children }: CardHeaderProps) => {
  return (
    <header
      className={cn(`border-b border-neutral-600 px-8 py-5 ${className}`)}
    >
      {children}
    </header>
  );
};

export const CardContent = ({ className, children }: CardContentProps) => {
  return <div className={cn("px-8 py-5", className)}>{children}</div>;
};

export const CardFooter = ({ className, children }: CardFooterProps) => {
  return (
    <footer className={`border-t border-neutral-600 px-8 py-5 ${className}`}>
      {children}
    </footer>
  );
};

export const ListContent = ({
  icon,
  title,
  value,
  className,
}: ListContentProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="sm flex gap-2">
        {typeof icon === "string" ? (
          <IconComponent src={icon} />
        ) : (
          React.createElement(icon)
        )}
        <span className="text-xs font-medium text-neutral-600">{title}</span>
      </div>
      <span className="text-1b1b text-xs font-medium">{value}</span>
    </div>
  );
};
