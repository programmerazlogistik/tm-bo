"use client";

import { useState } from "react";

import { ConfirmationModal } from "@muatmuat/ui/Modal";

export function ConfirmationModalPreview() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log("Item deleted");
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-error-600 px-4 py-2 text-white hover:bg-error-700"
      >
        Delete Item
      </button>
      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={{ text: "Delete Item?" }}
        description={{ text: "This action cannot be undone." }}
        cancel={{ text: "Cancel" }}
        confirm={{ text: "Delete", onClick: handleDelete }}
      />
    </div>
  );
}
