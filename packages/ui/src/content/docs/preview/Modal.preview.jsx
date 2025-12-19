"use client";

import { useState } from "react";

import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

// Default export for the main preview
export function ModalPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
          Open Modal
        </button>
      </ModalTrigger>
      <ModalContent>
        <ModalTitle>Modal Title</ModalTitle>
        <div className="p-6">
          <p className="text-neutral-700">
            This is a basic modal with default settings. It includes a title,
            content area, and close functionality.
          </p>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <button className="rounded-md bg-neutral-300 px-4 py-2 text-neutral-700 hover:bg-neutral-400">
              Cancel
            </button>
          </ModalClose>
          <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
            Confirm
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Individual example components
export function BasicModalExample() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
          Open Modal
        </button>
      </ModalTrigger>
      <ModalContent className="w-[458px] px-4 py-6">
        <ModalTitle className="text-center font-bold">Modal Title</ModalTitle>
        <div className="p-6">Modal content goes here...</div>
      </ModalContent>
    </Modal>
  );
}

export function ControlledModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Open Modal
        </button>
      </ModalTrigger>
      <ModalContent className="w-[458px] px-4 py-6">
        <ModalTitle className="text-center font-bold">Modal Title</ModalTitle>
        <div className="p-6">
          <p>Modal content goes here...</p>
          <p className="mt-2 text-sm text-neutral-500">
            State: {isOpen ? "open" : "closed"}
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
}

export function BrandedModalExample() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <button className="rounded-md bg-muat-trans-primary-400 px-4 py-2 text-white hover:bg-muat-trans-primary-500">
          Open Branded Modal
        </button>
      </ModalTrigger>
      <ModalContent type="muattrans" className="w-[500px]">
        <ModalHeader />
        <ModalTitle className="text-center font-bold">
          Transportation Modal
        </ModalTitle>
        <div className="px-6 pb-6">
          <p>This modal uses the muattrans branded header.</p>
        </div>
      </ModalContent>
    </Modal>
  );
}

export function SimpleModalExample() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Open Simple Modal
        </button>
      </ModalTrigger>
      <ModalContent type="primary" className="w-[400px] p-6">
        <ModalTitle className="mb-4">Simple Modal</ModalTitle>
        <p>This modal has no branded header and uses the primary theme.</p>
      </ModalContent>
    </Modal>
  );
}

export function MuatpartsPlusExample() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <button className="rounded-md bg-muat-parts-member-900 px-4 py-2 text-white hover:bg-muat-parts-member-800">
          Open Premium Modal
        </button>
      </ModalTrigger>
      <ModalContent type="muatparts-plus" className="w-[500px]">
        <ModalHeader variant="muatparts-plus" />
        <ModalTitle className="text-center font-bold">
          Premium Features
        </ModalTitle>
        <div className="px-6 pb-6">
          <p>This modal showcases the muatparts-plus premium theme.</p>
        </div>
      </ModalContent>
    </Modal>
  );
}
