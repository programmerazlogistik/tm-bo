import React, { useEffect, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { Modal, ModalContent, ModalTitle } from "@muatmuat/ui/Modal";

import { useLocationFieldStateMachineContext } from "../LocationFieldProvider";

const PostalCodeModal: React.FC = () => {
  const stateMachine = useLocationFieldStateMachineContext();
  const {
    selectedLocation,
    activeModal,
    closeModal,
    postalCodes,
    handlePostalCodeSelect,
    handleFetchPostalCodesByCountry,
  } = stateMachine;

  const isPostalModalOpen = activeModal === "postal";
  const setIsPostalModalOpen = (open: boolean) => !open && closeModal();

  const [searchQuery, setSearchQuery] = useState("");
  const [tempSelection, setTempSelection] = useState<{
    city: string;
    postalCode: string;
    value: string;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch postal codes when modal opens
  useEffect(() => {
    console.warn("[MODAL_DEBUG] PostalCodeModal useEffect:", {
      isPostalModalOpen,
      countryCode: selectedLocation?.countryCode,
    });
    if (isPostalModalOpen && selectedLocation?.countryCode) {
      // Trigger fetch of postal codes by country
      console.warn(
        "[MODAL_DEBUG] Triggering fetchPostalCodesByCountry with:",
        selectedLocation.countryCode
      );
      handleFetchPostalCodesByCountry(selectedLocation.countryCode);
    }
  }, [
    isPostalModalOpen,
    selectedLocation?.countryCode,
    handleFetchPostalCodesByCountry,
  ]);

  // Filter postal codes based on search query (client-side filtering)
  const filteredPostalCodes = searchQuery
    ? postalCodes.filter(
        (postal) =>
          postal.postalCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          postal.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          postal.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : postalCodes;

  const handleSelect = (postal: any) => {
    // Set search query to city name for better UX
    setSearchQuery(postal.name);
    // Store temporary selection
    setTempSelection({
      city: postal.name,
      postalCode: postal.postalCode,
      value: postal.value,
    });
    // Close dropdown after selection
    setShowDropdown(false);
  };

  const handleSave = () => {
    if (tempSelection) {
      handlePostalCodeSelect(tempSelection.postalCode, tempSelection.city);
    }
    setSearchQuery("");
    setTempSelection(null);
    setShowDropdown(false);
    closeModal();
  };

  const handleCancel = () => {
    setSearchQuery("");
    setTempSelection(null);
    setShowDropdown(false);
    closeModal();
  };

  return (
    <Modal
      open={isPostalModalOpen}
      onOpenChange={setIsPostalModalOpen}
      closeOnOutsideClick={false}
      withCloseButton={false}
    >
      <ModalContent>
        <div className="relative w-[472px] space-y-6 p-6 pb-3">
          {/* Title */}
          <ModalTitle className="text-center text-sm font-bold">
            Isi Negara/Kota/Kode Pos
          </ModalTitle>

          {/* Divider */}
          <div className="min-h-[1px] w-full border border-solid border-stone-300 bg-stone-300" />

          {/* Search Input with Dropdown */}
          <div className="relative">
            <div className="flex h-10 w-full items-center rounded-md border border-neutral-600 bg-neutral-50 px-3 transition-colors focus-within:border-primary-700 hover:border-primary-700">
              <IconComponent
                src="/icons/search.svg"
                width={16}
                height={16}
                className="mr-2 text-neutral-600"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                  // Clear temp selection when user starts typing
                  if (tempSelection) {
                    setTempSelection(null);
                  }
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Cari Negara / Kota / Kode Pos"
                className="w-full border-none bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-600 focus:ring-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setShowDropdown(false);
                    setTempSelection(null);
                  }}
                  className="ml-2 flex-shrink-0 text-neutral-600 hover:text-neutral-900"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {searchQuery && showDropdown && (
              <div className="absolute top-full z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-md border border-neutral-300 bg-white shadow-lg">
                {filteredPostalCodes.length === 0 ? (
                  <div className="py-4 text-center text-sm text-neutral-600">
                    Tidak ada hasil ditemukan
                  </div>
                ) : (
                  <div className="py-1">
                    {filteredPostalCodes.map((postal) => (
                      <button
                        key={postal.value}
                        type="button"
                        onClick={() => handleSelect(postal)}
                        className={`w-full px-4 py-3 text-left transition-colors hover:bg-primary-50 ${
                          tempSelection?.value === postal.value
                            ? "border-l-4 border-primary-600 bg-primary-100"
                            : ""
                        }`}
                      >
                        <div className="text-sm font-semibold text-neutral-900">
                          {postal.name},{postal.value}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button
              variant="muatparts-primary-secondary"
              onClick={handleCancel}
            >
              Batalkan
            </Button>
            <Button variant="muatparts-primary" onClick={handleSave}>
              Simpan
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default PostalCodeModal;
