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
import { Coordinates, LocationDetails, LocationSuggestion, AddressComponents as InternationalAddressComponents } from "../types";
import { useModalReverseGeocode } from "../hooks/useModalReverseGeocode";
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
  const { coordinates, handleCoordinateChange, send } = stateMachine;
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

  // Track if user has actually dragged the marker (to prevent reverse geocoding on modal open)
  const [hasDraggedMarker, setHasDraggedMarker] = useState(false);

  // Integration with reverse geocoding hook for marker drag functionality
  const {
    fetchReverseGeocode,
    reverseGeocodedData,
    isReverseGeocoding,
    reverseGeocodeError,
    clearReverseGeocodeData,
    // Place details from reverse geocode
    placeDetails,
  } = useModalReverseGeocode();

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
    console.warn("🔍 PINPOINT_DEBUG - handleModalPositionChange called with:", position);
    // Mark that user has dragged the marker
    setHasDraggedMarker(true);
    // Clear selected location details when user drags marker to enable reverse geocoding
    setSelectedLocationDetails(null);
    setLocalCoordinates(position);
  };

  // Step 1: Fetch location by coordinates when marker is dragged
  const debouncedCoords = useDebounce(localCoordinates, 500);

  // Debug: Log when localCoordinates and debouncedCoords change
  useEffect(() => {
    console.warn("🔍 PINPOINT_DEBUG - localCoordinates updated:", localCoordinates);
  }, [localCoordinates]);

  useEffect(() => {
    console.warn("🔍 PINPOINT_DEBUG - debouncedCoords updated:", debouncedCoords);
  }, [debouncedCoords]);

  // Clear reverse geocode data when modal is closed or when search selection is made
  useEffect(() => {
    if (!isModalOpen || selectedLocationDetails) {
      clearReverseGeocodeData();
    }
  }, [isModalOpen, selectedLocationDetails, clearReverseGeocodeData]);

  // Trigger reverse geocoding when coordinates change (from marker drag)
  useEffect(() => {
    console.warn("🔍 PINPOINT_DEBUG - Reverse geocode useEffect triggered:", {
      isModalOpen,
      debouncedCoords,
      selectedLocationDetails: !!selectedLocationDetails,
      hasDraggedMarker,
    });

    if (
      isModalOpen &&
      debouncedCoords.latitude &&
      debouncedCoords.longitude &&
      !selectedLocationDetails && // Don't reverse geocode if user has already selected a location from search
      hasDraggedMarker // Only reverse geocode if user has actually dragged the marker
    ) {
      console.warn("🔍 PINPOINT_DEBUG - Calling fetchReverseGeocode with:", debouncedCoords);
      fetchReverseGeocode(debouncedCoords);
    } else {
      console.warn("🔍 PINPOINT_DEBUG - Skipping reverse geocode due to conditions:", {
        isModalOpen,
        hasLat: !!debouncedCoords.latitude,
        hasLng: !!debouncedCoords.longitude,
        hasSelectedLocation: !!selectedLocationDetails,
        hasDraggedMarker,
      });
    }
  }, [debouncedCoords, isModalOpen, fetchReverseGeocode, selectedLocationDetails, hasDraggedMarker]);

  // Update search query with formatted address when reverse geocode completes
  useEffect(() => {
    if (reverseGeocodedData?.formattedAddress && isModalOpen && !selectedLocationDetails) {
      setModalSearchQuery(reverseGeocodedData.formattedAddress);
    }
  }, [reverseGeocodedData, isModalOpen, selectedLocationDetails]);

  // Sync local coordinates with global coordinates ONLY when opening modal
  // We removed the live sync effect to ensure isolation

  // Helper function to convert reverse geocoded data to LocationDetails
  const createLocationDetailsFromReverseGeocode = (
    reverseGeocodedData: InternationalAddressComponents,
    coordinates: Coordinates
  ): LocationDetails => {
    return {
      coordinates: coordinates,
      info: {
        address: reverseGeocodedData.formattedAddress,
        city: reverseGeocodedData.city,
        country: reverseGeocodedData.country,
        postalCode: reverseGeocodedData.postalCode,
        coordinates: coordinates,
        countryCode: reverseGeocodedData.countryCode,
      },
    };
  };

  // Helper function to convert place details data to LocationDetails with proper coordinates
  const createLocationDetailsFromPlaceDetails = (
    placeDetailsData: LocationDetails,
    coordinates: Coordinates
  ): LocationDetails => {
    return {
      ...placeDetailsData,
      coordinates: coordinates, // Use actual coordinates from map
      info: {
        ...placeDetailsData.info,
        coordinates: coordinates, // Ensure coordinates are consistent
      },
    };
  };

  // Helper function to convert cityList to postalCodes format for context
  const convertCityListToPostalCodes = (cityList: Array<{cityName: string, postalCode: string}>): Array<{name: string, value: string}> => {
    return cityList.map(city => ({
      name: city.cityName,
      value: city.postalCode
    }));
  };

  // Helper function to ensure search selection has proper formatted address
  const ensureFormattedAddress = (locationDetails: LocationDetails): LocationDetails => {
    // If address is empty but we have searchTitle, use searchTitle as address
    if (!locationDetails.info.address && (locationDetails as any).searchTitle) {
      console.warn("🔍 PINPOINT_DEBUG - Using searchTitle as formattedAddress:", (locationDetails as any).searchTitle);
      return {
        ...locationDetails,
        info: {
          ...locationDetails.info,
          address: (locationDetails as any).searchTitle,
        },
      };
    }
    return locationDetails;
  };

  // Helper function to create minimal LocationDetails from coordinates only
  const createLocationDetailsFromCoordinates = (
    coordinates: Coordinates
  ): LocationDetails => {
    return {
      coordinates: coordinates,
      info: {
        address: `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`,
        city: "",
        country: "",
        postalCode: "",
        coordinates: coordinates,
      },
    };
  };

  const handleSaveModal = () => {
    console.warn("🔍 PINPOINT_DEBUG - SIMPAN_LOKASI_CLICKED: User clicked 'Simpan Lokasi' button");
    console.warn("🔍 PINPOINT_DEBUG - handleSaveModal called");
    console.warn("🔍 PINPOINT_DEBUG - selectedLocationDetails:", selectedLocationDetails);
    console.warn("🔍 PINPOINT_DEBUG - placeDetails:", placeDetails);
    console.warn("🔍 PINPOINT_DEBUG - reverseGeocodedData:", reverseGeocodedData);
    console.warn("🔍 PINPOINT_DEBUG - localCoordinates:", localCoordinates);

    // Update via onChange prop if provided (for form control)
    if (onChange) {
      console.warn("🔍 PINPOINT_DEBUG - Calling onChange with coordinates:", localCoordinates);
      onChange(localCoordinates);
    }

    // Priority order for location data:
    // 1. selectedLocationDetails (from search selection - highest priority)
    // 2. placeDetails (from reverse geocode + place details fetch)
    // 3. reverseGeocodedData (from marker drag only)
    // 4. coordinates only (fallback)
    let locationData: LocationDetails | null = null;
    let dataSource = "";
    let postalCodes: Array<{name: string, value: string}> = [];

    if (selectedLocationDetails) {
      console.warn("🔍 PINPOINT_DEBUG - Using location details from search selection");
      locationData = ensureFormattedAddress(selectedLocationDetails);
      dataSource = "search selection";
      // Extract postalCodes from search selection if available
      if (selectedLocationDetails.info.cityList) {
        postalCodes = convertCityListToPostalCodes(selectedLocationDetails.info.cityList);
        console.warn("🔍 PINPOINT_DEBUG - Extracted postalCodes from search selection:", postalCodes);
      }
    } else if (placeDetails) {
      console.warn("🔍 PINPOINT_DEBUG - Using location details from reverse geocode place details");
      locationData = createLocationDetailsFromPlaceDetails(placeDetails, localCoordinates);
      dataSource = "marker drag place details";
      // Extract postalCodes from place details
      if (placeDetails.info.cityList) {
        postalCodes = convertCityListToPostalCodes(placeDetails.info.cityList);
        console.warn("🔍 PINPOINT_DEBUG - Extracted postalCodes from place details:", postalCodes);
      }
    } else if (reverseGeocodedData) {
      console.warn("🔍 PINPOINT_DEBUG - Creating location details from reverse geocoded data");
      locationData = createLocationDetailsFromReverseGeocode(reverseGeocodedData, localCoordinates);
      dataSource = "marker drag reverse geocode";
      // No postalCodes available from reverse geocode alone
    } else {
      console.warn("🔍 PINPOINT_DEBUG - Creating minimal location details from coordinates only");
      locationData = createLocationDetailsFromCoordinates(localCoordinates);
      dataSource = "coordinates only";
    }

    if (locationData) {
      console.warn(`🔍 PINPOINT_DEBUG - Using location data from ${dataSource}:`, locationData);
      console.warn("🔍 PINPOINT_DEBUG - postalCodes to populate:", postalCodes);

      // Send PLACE_SUCCESS event to trigger onLocationChange with complete location data
      const eventData = {
        type: "PLACE_SUCCESS",
        placeDetail: locationData,
        postalCodes: postalCodes.length > 0 ? postalCodes : undefined // Include postalCodes if available
      } as any;
      console.warn("🔍 PINPOINT_DEBUG - Sending PLACE_SUCCESS event:", eventData);
      send(eventData);

      // Add a setTimeout to check if the event was processed
      setTimeout(() => {
        console.warn("🔍 PINPOINT_DEBUG - Checking if PLACE_SUCCESS was processed after timeout");
      }, 100);
    } else {
      console.warn("🔍 PINPOINT_DEBUG - No location data available, using coordinates only");
      // Fallback: Only update coordinates (no reverse geocoding)
      handleCoordinateChange(localCoordinates, false);
    }

    setIsModalOpen(false);
  };

  const handleModalOpenChange = (open: boolean) => {
    if (open) {
      // Reset drag flag when opening modal
      setHasDraggedMarker(false);

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
            <div className="relative flex h-[379px] w-[604px] flex-shrink-0 flex-col items-start gap-[10px] rounded-[10px] p-0">
              <MapContainer
                coordinates={localCoordinates}
                className="h-full w-full rounded-[10px]"
                draggableMarker={true}
                onPositionChange={handleModalPositionChange}
                textLabel={`${localCoordinates.latitude.toFixed(4)}, ${localCoordinates.longitude.toFixed(4)}`}
                markerIcon="/icons/location-management/marker-location.svg"
              />

              {/* Loading Overlay */}
              {isReverseGeocoding && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[10px] bg-white/60">
                  <div className="text-sm text-neutral-600">Mengambil alamat...</div>
                </div>
              )}
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
                  disabled={isReverseGeocoding}
                >
                  {isReverseGeocoding ? "Menunggu..." : "Simpan Lokasi"}
                </Button>
              </div>

              {/* Reverse Geocoding Loading Indicator */}
              {isReverseGeocoding && (
                <div className="mb-4 text-center text-sm text-neutral-500">
                  Sedang mengambil alamat...
                </div>
              )}

              {/* Reverse Geocoding Error */}
              {reverseGeocodeError && (
                <div className="mb-4 text-center text-sm text-error-400">
                  {reverseGeocodeError}
                </div>
              )}
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
