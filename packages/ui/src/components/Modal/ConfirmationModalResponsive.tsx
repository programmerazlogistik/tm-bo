import * as React from "react";

import { cn } from "@muatmuat/lib/utils";

import { Button } from "../Button";
import { Modal, ModalContent } from "./Modal";

export interface ConfirmationModalResponsiveProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: {
    text?: string;
    className?: string;
  };
  description?: {
    text?: string;
    className?: string;
  };
  cancel?: {
    classname?: string;
    text?: string;
    onClick?: () => void;
  };
  confirm?: {
    classname?: string;
    text?: string;
    onClick?: () => void;
  };
}

export const ConfirmationModalResponsive: React.FC<
  ConfirmationModalResponsiveProps
> = ({
  isOpen,
  setIsOpen,
  title = { text: "", className: "" },
  description = { text: "", className: "" },
  cancel = { classname: "", text: "", onClick: () => setIsOpen(false) }, // Added default for cancel
  confirm = { classname: "", text: "", onClick: () => setIsOpen(false) }, // Added default for confirm
}) => {
  const { text: titleText = "", className: titleClassName = "" } = title;
  const { text: descriptionText = "", className: descriptionClassName = "" } =
    description;
  const {
    classname: cancelClassname = "",
    text: cancelText = "",
    onClick: onCancel = () => setIsOpen(false),
  } = cancel;
  const {
    classname: confirmClassname = "",
    text: confirmText = "",
    onClick: onConfirm = () => setIsOpen(false),
  } = confirm;
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen} closeOnOutsideClick>
      <ModalContent>
        <div className="w-[296px] px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-y-5">
            {titleText ? (
              <h1
                className={cn(
                  "text-base font-bold leading-[1.1] text-neutral-900",
                  titleClassName
                )}
              >
                {titleText}
              </h1>
            ) : null}
            {descriptionText ? (
              <p
                className={cn(
                  "text-center text-sm font-medium leading-[1.1] text-neutral-900",
                  descriptionClassName
                )}
              >
                {descriptionText}
              </p>
            ) : null}

            <div className="flex items-center gap-x-2">
              <Button
                variant="muatparts-primary-secondary"
                // 25. 18 - Web - LB - 0275
                // 25. 18 - Web - LB - 0282
                className={cn(
                  "h-7 w-[112px] text-xs leading-[1.1]",
                  cancelClassname
                )}
                onClick={onCancel}
                type="button"
              >
                {cancelText}
              </Button>
              <Button
                variant="muatparts-primary"
                // 25. 18 - Web - LB - 0275
                // 25. 18 - Web - LB - 0282
                className={cn(
                  "h-7 w-[112px] text-xs leading-[1.1]",
                  confirmClassname
                )}
                onClick={onConfirm}
                type="button"
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
