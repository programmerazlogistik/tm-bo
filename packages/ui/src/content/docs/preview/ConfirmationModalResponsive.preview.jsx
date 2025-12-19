"use client";

import { useState } from "react";

import { ConfirmationModalResponsive } from "@muatmuat/ui/Modal";

export function ConfirmationModalResponsivePreview() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Action confirmed");
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-muat-parts-non-600 px-4 py-2 text-white hover:bg-muat-parts-non-700"
      >
        Open Responsive Modal
      </button>
      <ConfirmationModalResponsive
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={{ text: "Remove Item?" }}
        description={{ text: "This item will be removed from your list." }}
        cancel={{ text: "Cancel" }}
        confirm={{ text: "Remove", onClick: handleConfirm }}
      />
    </div>
  );
}
