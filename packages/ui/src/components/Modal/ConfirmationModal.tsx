import React from "react";

import { cn } from "@muatmuat/lib/utils";

import { Button } from "../Button";
// Added ModalClose for the inline close button
import {
  Modal,
  ModalContent,
  // Ensure ModalVariants includes 'bo' but not 'muatparts'
  ModalHeader,
  // Re-added ModalHeader for default variants
  ModalTitle,
  ModalVariants,
} from "./Modal";

export interface ConfirmationModalConfig {
  text: string;
  className?: string;
}

export interface ConfirmationModalButtonConfig {
  classname?: string;
  text: string;
  onClick?: () => void;
}

export interface ConfirmationModalProps {
  size?: "small" | "big"; // Kept size prop with original default
  variant?: ModalVariants; // Includes 'bo' now, kept original default
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: ConfirmationModalConfig;
  withCancel?: boolean;
  description?: ConfirmationModalConfig;
  cancel?: ConfirmationModalButtonConfig;
  confirm?: ConfirmationModalButtonConfig;
  className?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  size = "small", // Restored default
  variant = "muattrans", // Restored default
  isOpen,
  setIsOpen,
  title = { text: "", className: "" }, // Use empty defaults unless 'bo'
  withCancel = true,
  description = { text: "", className: "" },
  cancel = { text: "Cancel", onClick: () => setIsOpen(false) }, // Generic default
  confirm = { text: "Confirm", onClick: () => setIsOpen(false) }, // Generic default
  className = "",
}) => {
  // Use specific defaults only if variant is 'bo'
  const isBoVariant = variant === "bo";
  const finalTitle = isBoVariant ? { ...title, text: "Pemberitahuan" } : title;

  // Properly merge cancel button config with defaults
  const finalCancel = isBoVariant
    ? {
        classname: cancel?.classname,
        text: cancel?.text ?? "Batal",
        onClick: cancel?.onClick ?? (() => setIsOpen(false)),
      }
    : {
        classname: cancel?.classname,
        text: cancel?.text ?? "Cancel",
        onClick: cancel?.onClick ?? (() => setIsOpen(false)),
      };

  // Properly merge confirm button config with defaults
  const finalConfirm = isBoVariant
    ? {
        classname: confirm?.classname,
        text: confirm?.text ?? "Simpan",
        onClick: confirm?.onClick ?? (() => setIsOpen(false)),
      }
    : {
        classname: confirm?.classname,
        text: confirm?.text ?? "Confirm",
        onClick: confirm?.onClick ?? (() => setIsOpen(false)),
      };

  const { text: titleText = "", className: titleClassName = "" } = finalTitle;
  const { text: descriptionText = "", className: descriptionClassName = "" } =
    description;
  const {
    classname: cancelClassname = "",
    text: cancelText = "",
    onClick: onCancel = () => setIsOpen(false),
  } = finalCancel;
  const {
    classname: confirmClassname = "",
    text: confirmText = "",
    onClick: onConfirm = () => setIsOpen(false),
  } = finalConfirm;

  // Default modal sizes
  const modalSizeClasses: Record<string, string> = {
    small: "w-modal-small",
    big: "w-modal-big",
  };

  // Determine modal class: use fixed width for 'bo', otherwise use size prop
  const modalStyles = isBoVariant
    ? "w-[411px] rounded-xl p-0" // Specific 'bo' styling
    : modalSizeClasses[size] || modalSizeClasses.small; // Default sizing

  // Button variants map including 'bo' but excluding 'muatparts'
  const secondaryStyles: Partial<Record<ModalVariants, string>> = {
    "muatparts-plus": "muatparts-primary-secondary",
    muattrans: "muattrans-primary-secondary",
    bo: "muatparts-error-secondary", // Red border button
  };

  const primaryButtonStyles: Partial<Record<ModalVariants, string>> = {
    "muatparts-plus": "muatparts-primary",
    muattrans: "muattrans-primary",
    bo: "muatparts-primary", // Blue button
  };

  const currentSecondaryStyles =
    secondaryStyles[variant] || secondaryStyles.muattrans; // Fallback to original default
  const currentPrimaryStyles =
    primaryButtonStyles[variant] || primaryButtonStyles.muattrans; // Fallback to original default

  return (
    <Modal
      // Disable default corner close button only for 'bo' variant
      withCloseButton={!isBoVariant}
      closeOnOutsideClick={false}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <ModalContent
        className={cn(modalStyles, className)} // Apply determined class
        type={variant} // Pass the current variant for styling context
      >
        {/* Conditionally render ModalHeader for non-'bo' variants */}
        {!isBoVariant && <ModalHeader size={size} variant={variant} />}

        {/* Adjusted padding/gap only for 'bo' variant */}
        <div
          className={cn(
            "flex flex-col items-center",
            isBoVariant ? "gap-y-6 px-6 py-9" : "gap-y-6 px-6 py-9" // Default padding kept, adjust if needed
          )}
        >
          {titleText &&
            // Conditionally use ModalTitle with inline close for 'bo'
            (isBoVariant ? (
              <ModalTitle
                withClose={true}
                className={cn(
                  "w-full text-center text-sm font-bold leading-[17px] text-neutral-900",
                  titleClassName
                )}
              >
                {titleText}
              </ModalTitle>
            ) : (
              // Original h1 for other variants
              <h1
                className={cn(
                  "text-base font-bold leading-[19.2px] text-neutral-900",
                  titleClassName
                )}
              >
                {titleText}
              </h1>
            ))}
          {descriptionText && (
            <p
              className={cn(
                "text-center text-sm font-medium leading-[15.4px] text-neutral-900", // Keep original style
                isBoVariant && "leading-[17px]", // Override leading for 'bo'
                descriptionClassName
              )}
            >
              {descriptionText}
            </p>
          )}
          {/* Adjusted button gap and container style based on variant */}
          <div
            className={cn(
              "flex items-center gap-x-2",
              isBoVariant && "justify-center" // Center buttons only for 'bo'
            )}
          >
            {withCancel && (
              <Button
                variant={currentSecondaryStyles as any}
                // Apply specific 'bo' styles or default h-8
                className={cn(
                  isBoVariant
                    ? "h-8 w-[112px] rounded-[20px] text-sm font-semibold"
                    : "h-8",
                  cancelClassname
                )}
                onClick={onCancel}
                type="button"
              >
                {cancelText}
              </Button>
            )}
            <Button
              variant={currentPrimaryStyles as any}
              // Apply specific 'bo' styles or default h-8
              className={cn(
                isBoVariant
                  ? "h-8 w-[112px] rounded-[20px] text-sm font-semibold"
                  : "h-8",
                confirmClassname
              )}
              onClick={onConfirm}
              type="button"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
