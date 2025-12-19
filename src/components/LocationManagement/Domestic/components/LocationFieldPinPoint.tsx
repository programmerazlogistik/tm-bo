"use client";

import React, { useEffect, useState } from "react";

import { useDebounce } from "@muatmuat/hooks/use-debounce";
import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { MapContainer } from "@muatmuat/ui/Maps";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

import { useLocationFieldStateMachineContext } from "../LocationFieldProvider";
import LocationAPIAdapter from "../api-adapter";
import { Coordinates, LocationDetails, LocationSuggestion } from "../types";
import LocationFieldInput from "./LocationFieldInput";

export interface LocationFieldPinPointProps {
  value?: Coordinates;
  onChange?: (coords: Coordinates) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const LocationFieldPinPoint: React.FC<LocationFieldPinPointProps> = ({
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}) => {
  const stateMachine = useLocationFieldStateMachineContext();
  const { coordinates, handleCoordinateChange, send, placeDetail } = stateMachine;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localCoordinates, setLocalCoordinates] =
    useState<Coordinates>(coordinates);

  // Modal search state
  const [modalSearchQuery, setModalSearchQuery] = useState("");
  const [isModalDropdownOpen, setIsModalDropdownOpen] = useState(false);
  const debouncedModalSearch = useDebounce(modalSearchQuery, 500);

  const currentCoords = value || coordinates;

  // Fetch search results for modal (only when modal is open and query is long enough)
  const [modalSearchResults, setModalSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Store selected location details from search to use when saving
  const [selectedLocationDetails, setSelectedLocationDetails] = useState<LocationDetails | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (isModalOpen && debouncedModalSearch.length > 2) {
        setIsSearching(true);
        try {
          const results =
            await LocationAPIAdapter.searchLocations(debouncedModalSearch);
          setModalSearchResults(results);
        } catch (error) {
          console.error("Search error:", error);
          setModalSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setModalSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [debouncedModalSearch, isModalOpen]);

  const handleModalPositionChange = (position: {
    latitude: number;
    longitude: number;
  }) => {
    setLocalCoordinates(position);
  };

  // Step 1: Fetch location by coordinates to get place_id
  const debouncedCoords = useDebounce(localCoordinates, 500);
  const [modalLocation, setModalLocation] = useState(null);
  const [placeIdForDetail, setPlaceIdForDetail] = useState<string | null>(null);
  const [modalPlaceDetail, setModalPlaceDetail] = useState(null);

  useEffect(() => {
    const fetchLocationByCoordinates = async () => {
      if (
        isModalOpen &&
        debouncedCoords.latitude &&
        debouncedCoords.longitude
      ) {
        try {
          const location =
            await LocationAPIAdapter.reverseGeocode(debouncedCoords.latitude, debouncedCoords.longitude);
          setModalLocation(location);
        } catch (error) {
          console.error("Location by coordinates error:", error);
          setModalLocation(null);
        }
      }
    };

    fetchLocationByCoordinates();
  }, [debouncedCoords, isModalOpen]);

  // Step 2: When we get place_id, fetch full place details
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (placeIdForDetail) {
        try {
          const placeDetail =
            await LocationAPIAdapter.getPlaceDetails(placeIdForDetail);
          setModalPlaceDetail(placeDetail);
        } catch (error) {
          console.error("Place detail error:", error);
          setModalPlaceDetail(null);
        }
      }
    };

    fetchPlaceDetails();
  }, [placeIdForDetail]);

  // Step 3: When location is fetched, trigger place detail fetch
  useEffect(() => {
    if (modalLocation?.place_id && isModalOpen) {
      setPlaceIdForDetail(modalLocation.place_id);
    }
  }, [modalLocation, isModalOpen]);

  // Step 4: When place detail is fetched, update search query with formatted address
  useEffect(() => {
    if (modalPlaceDetail?.locationInfo?.address && isModalOpen) {
      setModalSearchQuery(modalPlaceDetail.locationInfo.address);
    }
  }, [modalPlaceDetail, isModalOpen]);

  // Sync local coordinates with global coordinates ONLY when opening modal
  // We removed the live sync effect to ensure isolation

  const handleSaveModal = () => {
    console.log("[PINPOINT_DEBUG] handleSaveModal called");
    console.log("[PINPOINT_DEBUG] selectedLocationDetails:", selectedLocationDetails);
    console.log("[PINPOINT_DEBUG] localCoordinates:", localCoordinates);

    // Update via onChange prop if provided (for form control)
    if (onChange) {
      console.log("[PINPOINT_DEBUG] Calling onChange with coordinates:", localCoordinates);
      onChange(localCoordinates);
    }

    // If we have location details from search selection, use them directly
    if (selectedLocationDetails) {
      console.log("[PINPOINT_DEBUG] Using stored location details");
      // Send PLACE_SUCCESS event to trigger onLocationChange with complete location data
      const eventData = {
        type: "PLACE_SUCCESS",
        placeDetail: selectedLocationDetails
      } as any;
      console.log("[PINPOINT_DEBUG] Sending PLACE_SUCCESS event:", eventData);
      send(eventData);

      // Add a setTimeout to check if the event was processed
      setTimeout(() => {
        console.log("[PINPOINT_DEBUG] Checking if PLACE_SUCCESS was processed after timeout");
        console.log("[PINPOINT_DEBUG] Current context placeDetail:", stateMachine.placeDetail);
      }, 100);

    } else {
      console.log("[PINPOINT_DEBUG] No location details stored, using coordinates only");
      // Fallback: Only update coordinates (no reverse geocoding)
      handleCoordinateChange(localCoordinates, false);
    }

    setIsModalOpen(false);
  };

  const handleModalOpenChange = (open: boolean) => {
    if (open) {
      // Sync local coordinates when opening modal
      setLocalCoordinates(value || coordinates);

      // Pre-fill search with current address from context
      const currentAddress =
        stateMachine.searchQuery ||
        stateMachine.selectedLocation?.address ||
        "";
      setModalSearchQuery(currentAddress);
    } else {
      // Clear search and location details when closing
      setModalSearchQuery("");
      setIsModalDropdownOpen(false);
      setSelectedLocationDetails(null);
    }
    setIsModalOpen(open);
  };

  // Handle location selection inside modal LOCALLY
  const handleLocationSelect = async (location: LocationSuggestion) => {
    console.log("[PINPOINT_DEBUG] handleLocationSelect called with:", location);
    setModalSearchQuery(location.title);
    setIsModalDropdownOpen(false);

    // Fetch details locally to get coordinates without triggering global state
    try {
      // We need to get the place details to get the coordinates
      // The Autocomplete suggestion doesn't always have coordinates
      const placeId = location.id || (location as any).place_id; // Check both in case of raw vs mapped
      console.log("[PINPOINT_DEBUG] Extracted placeId:", placeId);
      if (placeId) {
        const details = await LocationAPIAdapter.getPlaceDetails(placeId);
        console.log("[PINPOINT_DEBUG] Fetched place details:", details);
        console.log("[PINPOINT_DEBUG] details.info:", details?.info);
        console.log("[PINPOINT_DEBUG] details.coordinates:", details?.coordinates);
        if (details && details.coordinates) {
          setLocalCoordinates(details.coordinates);
          // Store complete location details for save operation
          // Enhanced: Store the search title as the formatted address
          const enhancedDetails = {
            ...details,
            searchTitle: location.title // Store the search title for formattedAddress
          };
          setSelectedLocationDetails(enhancedDetails);
          console.log("[PINPOINT_DEBUG] Location details stored successfully:", enhancedDetails);
          console.log("[PINPOINT_DEBUG] City:", details.info?.city);
          console.log("[PINPOINT_DEBUG] PostalCode:", details.info?.postalCode);
          console.log("[PINPOINT_DEBUG] Address:", details.info?.address);
          console.log("[PINPOINT_DEBUG] Search Title (will be used as formattedAddress):", location.title);
        } else {
          console.log("[PINPOINT_DEBUG] No coordinates found in details");
        }
      }
    } catch (error) {
      console.error("[PINPOINT_DEBUG] Failed to fetch details for local selection:", error);
      // Clear location details on error
      setSelectedLocationDetails(null);
    }
  };

  return (
    <div className={cn("flex w-full flex-col gap-2 md:w-auto", className)}>
      <Modal open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <div className="relative w-full overflow-hidden rounded-lg md:w-[262px]">
          <div className="relative h-36 w-full">
            <MapContainer
              coordinates={currentCoords}
              className="h-full w-full rounded-t-lg"
              viewOnly
              markerIcon="/icons/location-management/marker-location.svg"
            />
          </div>
          <ModalTrigger asChild>
            <Button
              type="button"
              disabled={disabled}
              className="w-full rounded-none bg-primary-700 py-4 text-center font-sans text-neutral-50 transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-600"
            >
              Atur Pin Lokasi
            </Button>
          </ModalTrigger>
        </div>

        <ModalContent className="h-[421px] w-[922px]">
          <div className="flex gap-5 p-5">
            {/* Left Side - Map */}
            <div className="flex h-[379px] w-[604px] flex-shrink-0 flex-col items-start gap-[10px] rounded-[10px] p-0">
              <MapContainer
                coordinates={localCoordinates}
                className="h-full w-full rounded-[10px]"
                draggableMarker={true}
                onPositionChange={handleModalPositionChange}
                textLabel={`${localCoordinates.latitude.toFixed(4)}, ${localCoordinates.longitude.toFixed(4)}`}
                markerIcon="/icons/location-management/marker-location.svg"
              />
            </div>

            {/* Right Side - Search and Save */}
            <div className="flex w-full flex-col">
              <ModalTitle className="mb-5 flex items-center text-base font-semibold leading-[19px] text-neutral-900">
                Atur Pin Lokasi
              </ModalTitle>

              <div className="flex-1">
                <LocationFieldInput
                  placeholder="Cari lokasi..."
                  externalDropdownOpen={isModalDropdownOpen}
                  onDropdownOpenChange={setIsModalDropdownOpen}
                  externalSearchQuery={modalSearchQuery}
                  onSearchQueryChange={setModalSearchQuery}
                  externalSearchResults={modalSearchResults}
                  externalIsSearching={isSearching}
                  onLocationSelect={handleLocationSelect}
                />
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-center">
                <Button
                  onClick={handleSaveModal}
                  variant="muatparts-primary"
                  className="mb-4 h-8"
                >
                  Simpan Lokasi
                </Button>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>

      {error && (
        <span className="text-xs font-medium text-error-400">{error}</span>
      )}
    </div>
  );
};

export default LocationFieldPinPoint;
