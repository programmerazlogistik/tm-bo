import React from "react";

import { cn } from "@muatmuat/lib/utils";

import { IconComponent } from "../IconComponent";
import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "./BottomSheet";

export interface InfoBottomsheetProps {
  className?: string;
  title: string;
  children?: React.ReactNode;
  render?: string;
}

export const InfoBottomsheet: React.FC<InfoBottomsheetProps> = ({
  className,
  title,
  children,
  render,
}) => {
  return (
    <BottomSheet>
      <BottomSheetTrigger
        className={cn("block size-4 text-neutral-700", className)}
      >
        <IconComponent src="/icons/info16.svg" width={16} height={16} />
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetClose />
          <BottomSheetTitle>{title}</BottomSheetTitle>
        </BottomSheetHeader>
        {render ? (
          <div
            className="info-bottomsheet-content px-4 pb-6 text-sm font-medium leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: render }}
          />
        ) : (
          <div className="info-bottomsheet-content px-4 py-6 text-sm font-medium leading-[1.1]">
            {children}
          </div>
        )}
      </BottomSheetContent>
    </BottomSheet>
  );
};
