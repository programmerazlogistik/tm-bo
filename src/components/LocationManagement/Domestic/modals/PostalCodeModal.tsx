import React, { useCallback, useEffect, useState } from "react";

import { useDebounce } from "@muatmuat/hooks/use-debounce";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { Modal, ModalContent } from "@muatmuat/ui/Modal";

import { useLocationFieldStateMachineContext } from "../LocationFieldContext";

const PostalCodeModal: React.FC = () => {
  const stateMachine = useLocationFieldStateMachineContext();
  const { state } = stateMachine;
  const {
    activeModal,
    closeModal,
    postalCodes,
    isSubmitting,
    handlePostalCodeSelect,
    handleEnhancedPostalCodeSelect,
    postalCodeResults,
    isSearchingPostalCodes,
    searchPostalCodes,
    isLoadingPostalCodeDetails,
    errors,
  } = stateMachine;

  const isPostalModalOpen = activeModal === "postal";
  const setIsPostalModalOpen = (open: boolean) => !open && closeModal();

  const [searchQuery, setSearchQuery] = useState("");

  // Auto-populate search when modal opens
  useEffect(() => {
    if (isPostalModalOpen) {
      // Use existing search query or trigger search
      if (searchQuery) {
        searchPostalCodes(searchQuery);
      }
    }
  }, [isPostalModalOpen, searchQuery, searchPostalCodes]);

  // Handle search with debouncing
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (isPostalModalOpen && debouncedSearch.length >= 3) {
      searchPostalCodes(debouncedSearch);
    }
  }, [debouncedSearch, isPostalModalOpen, searchPostalCodes]);

  // Extract postal codes from districts data (same as PostalCodeSelect)
  const districtsPostalCodes = React.useMemo(() => {
    const districtsData = (state.context.placeDetail as any)?.districtsData;
    console.warn("🏘️ POSTAL_DEBUG: districtsData:", districtsData);

    if (districtsData?.length > 0) {
      const allPostalCodes: any[] = [];

      districtsData.forEach((district: any) => {
        console.warn("🏘️ POSTAL_DEBUG: Processing district:", district);
        if (district.postalCodes?.length > 0) {
          district.postalCodes.forEach((postal: any) => {
            console.warn("🏘️ POSTAL_DEBUG: Processing postal:", postal);
            // Avoid duplicates
            if (
              !allPostalCodes.find((pc) => pc.postalCode === postal.postalCode)
            ) {
              const postalEntry = {
                value: postal.postalCode,
                postalCode: postal.postalCode,
                description: postal.description,
                districtName: district.district,
                cityName: district.cityName,
                provinceName: district.provinceName,
              };
              console.warn(
                "🏘️ POSTAL_DEBUG: Creating postal entry:",
                postalEntry
              );
              allPostalCodes.push(postalEntry);
            }
          });
        }
      });

      console.warn(
        "🏘️ POSTAL_DEBUG: Final districtsPostalCodes:",
        allPostalCodes
      );
      return allPostalCodes;
    }
    console.warn("🏘️ POSTAL_DEBUG: No districtsData found");
    return [];
  }, [state.context.placeDetail]);

  // Combine districts postal codes with API postal codes and search results
  const allPostalCodes = React.useMemo(() => {
    const combined = [...districtsPostalCodes, ...(postalCodes || [])];

    // Add search results, avoiding duplicates
    postalCodeResults.forEach((result) => {
      if (!combined.some((pc) => pc.value === result.title)) {
        combined.push({
          value: result.title,
          name: result.title,
          description: (result as any).description,
          // Include full location data from API response
          districtName: (result as any).districtName,
          cityName: (result as any).cityName,
          provinceName: (result as any).provinceName,
          // Add flag to indicate this is from search results (but now with location data)
          isSearchResult: true,
        });
      }
    });

    console.warn("🏘️ POSTAL_DEBUG: Final allPostalCodes combined:", combined);
    return combined;
  }, [districtsPostalCodes, postalCodes, postalCodeResults]);

  // Filter based on search query
  const filteredPostalCodes = React.useMemo(() => {
    if (!searchQuery) {
      console.warn(
        "🏘️ POSTAL_DEBUG: No search query, returning all:",
        allPostalCodes
      );
      return allPostalCodes;
    }

    const filtered = allPostalCodes.filter(
      (postal) =>
        postal.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
        postal.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        postal.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.warn("🏘️ POSTAL_DEBUG: Filtered postal codes:", filtered);
    return filtered;
  }, [allPostalCodes, searchQuery]);

  const handleSelect = (postalCode: string) => {
    console.warn("🏘️ POSTAL_DEBUG: handleSelect called with:", postalCode);
    console.warn("🏘️ POSTAL_DEBUG: current searchQuery:", searchQuery);

    // Get the original title from search results for formatted address
    const selectedResult = postalCodeResults.find(
      (result) => result.title === postalCode
    );

    // Get the original title from context (tempLocationTitle should have the original search query)
    const contextOriginalTitle =
      stateMachine.state?.context?.tempLocationTitle ||
      stateMachine.state?.context?.originalSearchTitle;
    const originalTitle =
      contextOriginalTitle ||
      selectedResult?.title ||
      searchQuery ||
      postalCode;

    console.warn(
      "🏘️ POSTAL_DEBUG: Context tempLocationTitle:",
      stateMachine.state?.context?.tempLocationTitle
    );
    console.warn(
      "🏘️ POSTAL_DEBUG: Context originalSearchTitle:",
      stateMachine.state?.context?.originalSearchTitle
    );
    console.warn(
      "🏘️ POSTAL_DEBUG: Context originalTitle to use:",
      contextOriginalTitle
    );
    console.warn("🏘️ POSTAL_DEBUG: Final originalTitle:", originalTitle);
    console.warn("🏘️ POSTAL_DEBUG: selectedResult:", selectedResult);
    console.warn("🏘️ POSTAL_DEBUG: searchQuery:", searchQuery);
    console.warn("🏘️ POSTAL_DEBUG: postalCodeResults:", postalCodeResults);

    // Extract location data from search result (this is rich data!)
    const locationData = selectedResult
      ? {
          districtName: (selectedResult as any).districtName,
          cityName: (selectedResult as any).cityName,
          provinceName: (selectedResult as any).provinceName,
          description: (selectedResult as any).description,
        }
      : undefined;

    // Extract original search result with identifiers for API calls
    const originalSearchResult = selectedResult
      ? {
          provinceID: (selectedResult as any).provinceID,
          cityID: (selectedResult as any).cityID,
          districtID: (selectedResult as any).districtID,
          postalCode: (selectedResult as any).postalCode,
        }
      : undefined;

    console.warn("🏘️ POSTAL_DEBUG: Extracted location data:", locationData);
    console.warn(
      "🏘️ POSTAL_DEBUG: Extracted original search result with IDs:",
      originalSearchResult
    );

    // Enhanced selection flow: trigger API calls and state updates with location data and original result
    handleEnhancedPostalCodeSelect(
      postalCode,
      originalTitle,
      locationData,
      originalSearchResult
    );

    setSearchQuery("");
    // Modal will close automatically via state machine
    console.warn("🏘️ POSTAL_DEBUG: Enhanced selection triggered");
  };

  // Memoized function to generate highlighted postal code HTML
  const getHighlightedPostalCodeHTML = useCallback(
    (postal: any, currentSearchQuery: string) => {
      const postalCode = postal.value;
      let highlightedPostalCode = postalCode;

      // Highlight search query within postal code
      if (
        currentSearchQuery &&
        postalCode.toLowerCase().includes(currentSearchQuery.toLowerCase())
      ) {
        const query = currentSearchQuery.toLowerCase();
        const codeLower = postalCode.toLowerCase();
        const startIndex = codeLower.indexOf(query);

        if (startIndex !== -1) {
          const beforeMatch = postalCode.substring(0, startIndex);
          const matchedPart = postalCode.substring(
            startIndex,
            startIndex + query.length
          );
          const afterMatch = postalCode.substring(startIndex + query.length);
          highlightedPostalCode = `${beforeMatch}<strong>${matchedPart}</strong>${afterMatch}`;
        } else {
          highlightedPostalCode = `<strong>${postalCode}</strong>`;
        }
      } else {
        highlightedPostalCode = `<strong>${postalCode}</strong>`;
      }

      // Build location info
      let locationInfo = "";
      if (postal.isSearchResult && postal.districtName) {
        locationInfo = `, ${postal.districtName}, ${postal.cityName}, ${postal.provinceName}`;
      } else if (postal.isSearchResult) {
        locationInfo = postal.description
          ? `, ${postal.description}`
          : ' <span class="text-neutral-500">(Kode pos dari hasil pencarian)</span>';
      } else if (postal.districtName) {
        locationInfo = `, ${postal.districtName}, ${postal.cityName}, ${postal.provinceName}`;
      } else if (postal.description) {
        locationInfo = `, ${postal.description}`;
      } else if (postal.name && postal.name !== postal.value) {
        locationInfo = `, ${postal.name}`;
      }

      return highlightedPostalCode + locationInfo;
    },
    []
  );

  return (
    <Modal
      open={isPostalModalOpen}
      onOpenChange={setIsPostalModalOpen}
      closeOnOutsideClick={false}
      withCloseButton={false}
    >
      <ModalContent>
        <div className="relative w-[472px] space-y-6 p-6">
          {/* Title */}
          <div className="text-center text-sm font-bold">Pilih Kode Pos</div>

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
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kode pos..."
                className="w-full border-none bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-600 focus:ring-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
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
            {searchQuery && (
              <div className="absolute top-full z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-md border border-neutral-300 bg-white shadow-lg">
                {filteredPostalCodes.length === 0 ? (
                  <div className="py-4 text-center text-sm text-neutral-600">
                    Tidak ada hasil ditemukan
                  </div>
                ) : (
                  <div className="py-1">
                    {filteredPostalCodes.map((postal) => {
                      return (
                        <button
                          key={postal.value}
                          type="button"
                          onClick={() => {
                            console.warn(
                              "🏘️ POSTAL_DEBUG: Button clicked for:",
                              postal.value
                            );
                            handleSelect(postal.value);
                          }}
                          onMouseDown={() =>
                            console.warn(
                              "🏘️ POSTAL_DEBUG: Mouse down on:",
                              postal.value
                            )
                          }
                          className="w-full px-4 py-3 text-left transition-colors hover:bg-primary-50"
                        >
                          <div
                            className="flex-1 shrink gap-2.5 self-stretch text-sm font-semibold text-neutral-900"
                            dangerouslySetInnerHTML={{
                              __html: getHighlightedPostalCodeHTML(
                                postal,
                                searchQuery
                              ),
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Empty State when no search */}
          {!searchQuery &&
            allPostalCodes.length === 0 &&
            !isSubmitting &&
            !isSearchingPostalCodes && (
              <div className="py-8 text-center text-sm text-neutral-600">
                {state.context.placeDetail
                  ? "Tidak ada kode pos tersedia untuk lokasi ini"
                  : "Pilih lokasi terlebih dahulu atau ketik untuk mencari kode pos"}
              </div>
            )}

          {/* Loading State */}
          {(isSubmitting || isSearchingPostalCodes) && (
            <div className="py-8 text-center text-sm text-neutral-600">
              {isSearchingPostalCodes
                ? "Mencari kode pos..."
                : "Memuat kode pos..."}
            </div>
          )}

          {/* Enhanced Error Display */}
          {errors.postalCode && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {errors.postalCode}
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        onClick={() => {
                          // Clear error and retry
                          if (typeof stateMachine.clearError === "function") {
                            stateMachine.clearError("postalCode");
                          }
                          // Trigger retry if retry function is available
                          if (
                            typeof stateMachine.retryPostalCodeDetails ===
                            "function"
                          ) {
                            stateMachine.retryPostalCodeDetails();
                          }
                        }}
                        className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                      >
                        Coba Lagi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ModalContent>

      {/* Enhanced Global Loading Overlay for Postal Code Details */}
      {isLoadingPostalCodeDetails && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-center">
              <div className="mr-3 h-8 w-8 animate-spin rounded-full border-b-2 border-primary-700"></div>
              <span className="text-sm text-neutral-600">
                Memuat detail kode pos...
              </span>
            </div>
            <div className="mt-2 text-center text-xs text-neutral-500">
              Sedang mengambil data provinsi dan kecamatan
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PostalCodeModal;
