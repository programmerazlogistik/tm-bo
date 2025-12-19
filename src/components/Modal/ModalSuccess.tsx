"use client";

import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { Modal, ModalContent, ModalTitle } from "@muatmuat/ui/Modal";

export interface SuccessIconProps {
  /** Additional CSS classes to apply to the SVG icon */
  className?: string;
}

/**
 * SuccessIcon component - Custom SVG checkmark icon with green circle background
 *
 * @example
 * ```tsx
 * <SuccessIcon className="custom-class" />
 * ```
 */
const SuccessIcon: React.FC<SuccessIconProps> = ({ className }) => (
  <svg
    className={cn("h-16 w-16", className)}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="31.5" stroke="#D4EDDA" />
    <path
      d="M22 32L28.5 38.5L42 25"
      stroke="#28A745"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface ModalSuccessProps {
  /** Controls whether the modal is open or closed */
  open: boolean;
  /** Function to update the modal's visibility */
  onOpenChange: (open: boolean) => void;
  /** Optional callback executed when the confirm button is clicked */
  onConfirm?: () => void;
  /** Title text displayed in the modal */
  title?: string;
  /** Text displayed on the confirm button */
  confirmText?: string;
  /** Additional CSS classes to apply to the ModalContent */
  className?: string;
  /** Button variant for the action button */
  buttonVariant?: "muatparts-primary" | "muattrans-primary" | string;
}

/**
 * ModalSuccess component - A specialized modal to confirm successful data submission
 *
 * This component displays a success icon, title, and confirmation button.
 * Suitable for showing successful form submissions, data saving, or other positive actions.
 *
 * @example
 * ```tsx
 * <ModalSuccess
 *   isOpen={isOpen}
 *   setIsOpen={setIsOpen}
 *   title="Data Saved Successfully"
 *   onConfirm={() => console.log('Confirmed')}
 * />
 * ```
 */
export const ModalSuccess: React.FC<ModalSuccessProps> = ({
  open,
  onOpenChange = () => {},
  onConfirm,
  title = "Berhasil Menyimpan Data",
  confirmText = "OK",
  className,
  buttonVariant = "muatparts-primary",
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        className={cn("w-[395px] rounded-lg bg-white p-0 shadow-lg", className)}
        withCloseButton={false}
      >
        <div className="flex h-[232px] flex-col items-center justify-center gap-6 px-6 py-9">
          <SuccessIcon />
          <ModalTitle className="text-center text-[23px] font-bold leading-[28px] text-[#59595F]">
            {title}
          </ModalTitle>
          <Button
            variant={buttonVariant as any}
            onClick={handleConfirm}
            className="h-8 w-[72px] px-6 py-2"
          >
            {confirmText}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
