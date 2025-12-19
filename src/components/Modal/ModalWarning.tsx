"use client";

import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Modal, ModalContent, ModalTitle } from "@muatmuat/ui/Modal";

export interface ModalWarningProps {
  /** Controls whether the modal is open or closed */
  open: boolean;
  /** Callback function triggered when modal open state changes */
  onOpenChange: (open: boolean) => void;
  /** Optional title text displayed in the modal header */
  title?: string;
  /** Optional description text displayed below the title */
  description?: string;
  /** Additional CSS classes to apply to the ModalContent */
  className?: string;
}

export const ModalWarning: React.FC<ModalWarningProps> = ({
  open,
  onOpenChange,
  title = "Warning",
  description,
  className,
}) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} withCloseButton={false}>
      <ModalContent
        className={cn(
          "w-[411px] rounded-xl bg-white p-0 shadow-[0px_4px_11px_rgba(65,65,65,0.25)]",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center gap-6 px-6 py-9">
          <ModalTitle withClose>{title}</ModalTitle>
          {description && (
            <p className="text-center text-sm font-medium text-[#1B1B1B]">
              {description}
            </p>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};
