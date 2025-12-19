import React, { useState, useCallback, useRef } from "react";

import LocationAPIAdapter from "../api-adapter";
import { Coordinates, AddressComponents as InternationalAddressComponents, LocationDetails } from "../types";

export interface UseModalReverseGeocodeReturn {
  fetchReverseGeocode: (coords: Coordinates) => Promise<void>;
  reverseGeocodedData: InternationalAddressComponents | null;
  isReverseGeocoding: boolean;
  reverseGeocodeError: string | null;
  clearReverseGeocodeData: () => void;
  // Place details from reverse geocode
  placeDetails: LocationDetails | null;
  isFetchingPlaceDetails: boolean;
  placeDetailsError: string | null;
}

/**
 * Hook for handling reverse geocoding in the modal
 * Provides debounced reverse geocoding with loading and error states
 */
export const useModalReverseGeocode = (): UseModalReverseGeocodeReturn => {
  const [reverseGeocodedData, setReverseGeocodedData] = useState<InternationalAddressComponents | null>(null);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [reverseGeocodeError, setReverseGeocodeError] = useState<string | null>(null);

  // Place details state
  const [placeDetails, setPlaceDetails] = useState<LocationDetails | null>(null);
  const [isFetchingPlaceDetails, setIsFetchingPlaceDetails] = useState(false);
  const [placeDetailsError, setPlaceDetailsError] = useState<string | null>(null);

  // Use ref to track and cancel in-flight requests
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchReverseGeocode = useCallback(async (coords: Coordinates) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Validate coordinates
    if (!coords.latitude || !coords.longitude) {
      console.warn("[USE_MODAL_REVERSE_GEOCODE] Invalid coordinates:", coords);
      return;
    }

    setIsReverseGeocoding(true);
    setReverseGeocodeError(null);

    try {
      console.log("[USE_MODAL_REVERSE_GEOCODE] Starting reverse geocode for:", coords);

      const result = await LocationAPIAdapter.reverseGeocode(
        coords.latitude,
        coords.longitude
      );

      // Check if request was aborted
      if (abortController.signal.aborted) {
        console.log("[USE_MODAL_REVERSE_GEOCODE] Request was aborted");
        return;
      }

      console.log("[USE_MODAL_REVERSE_GEOCODE] Reverse geocode result:", result);
      console.log("[USE_MODAL_REVERSE_GEOCODE] Result keys:", Object.keys(result));
      console.log("[USE_MODAL_REVERSE_GEOCODE] place_id:", result.placeId);
      setReverseGeocodedData(result);

      // Fetch place details using place_id if available
      if (result.placeId) {
        console.log("[USE_MODAL_REVERSE_GEOCODE] Fetching place details for place_id:", result.placeId);
        setIsFetchingPlaceDetails(true);
        setPlaceDetailsError(null);

        try {
          const placeDetailsResult = await LocationAPIAdapter.getPlaceDetails(result.placeId);

          // Check if request was aborted
          if (abortController.signal.aborted) {
            console.log("[USE_MODAL_REVERSE_GEOCODE] Place details request was aborted");
            return;
          }

          console.log("[USE_MODAL_REVERSE_GEOCODE] Place details result:", placeDetailsResult);
          setPlaceDetails(placeDetailsResult);
        } catch (placeDetailsError) {
          // Don't treat abort as an error
          if (abortController.signal.aborted) {
            console.log("[USE_MODAL_REVERSE_GEOCODE] Place details request was aborted");
            return;
          }

          const placeDetailsErrorMessage = placeDetailsError instanceof Error ? placeDetailsError.message : "Failed to fetch place details";
          console.error("[USE_MODAL_REVERSE_GEOCODE] Place details error:", placeDetailsError);
          setPlaceDetailsError(placeDetailsErrorMessage);
          // Don't throw - we still have reverse geocoded data
        } finally {
          // Only update state if this request wasn't aborted
          if (!abortController.signal.aborted) {
            setIsFetchingPlaceDetails(false);
          }
        }
      }
    } catch (error) {
      // Don't treat abort as an error
      if (abortController.signal.aborted) {
        console.log("[USE_MODAL_REVERSE_GEOCODE] Request was aborted");
        return;
      }

      const errorMessage = error instanceof Error ? error.message : "Failed to fetch address";
      console.error("[USE_MODAL_REVERSE_GEOCODE] Error:", error);
      setReverseGeocodeError(errorMessage);
    } finally {
      // Only update state if this request wasn't aborted
      if (!abortController.signal.aborted) {
        setIsReverseGeocoding(false);
      }
    }
  }, []);

  const clearReverseGeocodeData = useCallback(() => {
    setReverseGeocodedData(null);
    setReverseGeocodeError(null);
    setIsReverseGeocoding(false);
    // Clear place details as well
    setPlaceDetails(null);
    setPlaceDetailsError(null);
    setIsFetchingPlaceDetails(false);
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Add cleanup effect
  React.useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    fetchReverseGeocode,
    reverseGeocodedData,
    isReverseGeocoding,
    reverseGeocodeError,
    clearReverseGeocodeData,
    // Place details
    placeDetails,
    isFetchingPlaceDetails,
    placeDetailsError,
  };
};