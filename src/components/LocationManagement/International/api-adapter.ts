/**
 * Location API Adapter - Clean Type Mapping
 *
 * Pattern:
 * - Direct fetch calls instead of SWR hooks
 * - State machine handles caching and loading states
 * - Maps raw API responses to clean camelCase types
 * - Uses consistent camelCase naming throughout
 */
import { fetcherMPPInter } from "@/lib/axios";

import type {
  AddressComponents as InternationalAddressComponents,
  LocationDetails,
  LocationSuggestion,
} from "./types";

// Raw API response types for mapping (these match actual API responses)
interface RawAutoCompleteStreet {
  ID: string;
  Title: string;
  Lev: number;
}

interface RawPlaceDetailLocationInfo {
  lat?: number | null;
  lng?: number | null; // API returns "lng" in locationInfo
  long?: number | null; // API also returns "long"
  city?: string | null;
  country?: string | null;
  postal?: string | null;
  code?: number | null;
  countryCode?: string | null;
  rawCity?: string | null;
  rawPostal?: string | null;
}

interface RawPlaceDetailData {
  ID?: string;
  lat: number; // API returns lowercase "lat"
  long: number; // API returns "long" at top level
  locationInfo: RawPlaceDetailLocationInfo;
  cityList?: Array<{ cityName: string; postalCode: string }>;
}

interface RawLocationByCoordinatesData {
  formatted_address: string;
  place_id: string;
  city: string;
  postal: string;
  int_postal: boolean;
  description: string;
  country: string;
  countryCode: string;
}

// Raw API response wrapper for reverse geocoding
interface RawLocationByCoordinatesResponse {
  Message: {
    Code: number;
    Text: string;
  };
  Data: RawLocationByCoordinatesData;
  Type: string;
}

// Raw API response for postal codes by country
interface RawPostalCodeByCountry {
  ID: string;
  PostalCode: string;
  Description: string;
}

interface RawPostalCodeByCountryResponse {
  Message: {
    Code: number;
    Text: string;
  };
  Data: RawPostalCodeByCountry[];
  Type: string;
}

// ==================== MAPPING UTILITIES ====================

/**
 * Maps raw API response to clean LocationSuggestion type
 */
const mapToLocationSuggestion = (
  raw: RawAutoCompleteStreet
): LocationSuggestion => ({
  id: raw.ID,
  title: raw.Title,
  level: raw.Lev,
});

/**
 * Maps raw place detail response to clean LocationDetails type
 */
const mapToLocationDetails = (raw: RawPlaceDetailData): LocationDetails => {
  const mapped = {
    coordinates: {
      latitude: raw.lat,
      longitude: raw.long || 0, // Fallback to 0 if longitude is missing
    },
    info: {
      address: "", // Will be populated by reverse geocoding (or Title)
      city: raw.locationInfo.city,
      country: raw.locationInfo.country,
      postalCode: raw.locationInfo.postal,
      coordinates: {
        latitude: raw.locationInfo.lat || 0,
        longitude: raw.locationInfo.lng || raw.locationInfo.long || 0, // Fallback to 0
      },
      cityList: raw.cityList,
      countryCode: raw.locationInfo.countryCode,
    },
  };

  console.error("[POSTAL_DEBUG] API adapter mapping:", {
    rawLocationInfo: raw.locationInfo,
    mappedInfo: mapped.info,
    rawCityList: raw.cityList,
  });

  return mapped;
};

/**
 * Maps raw reverse geocode response to clean AddressComponents type
 */
const mapToAddressComponents = (
  raw: RawLocationByCoordinatesData
): InternationalAddressComponents => ({
  formattedAddress: raw.formatted_address,
  city: raw.city,
  postalCode: raw.postal,
  isInternationalPostal: raw.int_postal,
  country: raw.country,
  countryCode: raw.countryCode,
  placeId: raw.place_id,
});

/**
 * Location API Adapter - Direct fetch functions for useStateMachine
 */
const LocationAPIAdapter = {
  // ==================== SEARCH OPERATIONS ====================

  /**
   * Search street autocomplete suggestions
   * Usage: await LocationAPIAdapter.searchLocations(query)
   */
  searchLocations: async (query: string): Promise<LocationSuggestion[]> => {
    if (!query || query.length < 3) return [];

    try {
      const params = new URLSearchParams();
      params.append("phrase", query);

      const response = await fetcherMPPInter.post(
        "/v1/international/seller/locations/autocomplete-street",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );

      // Map raw API response to clean types
      const rawData: RawAutoCompleteStreet[] = response.data || [];
      return rawData.map(mapToLocationSuggestion);
    } catch (error) {
      throw new Error(`Failed to search locations: ${error.message}`);
    }
  },

  /**
   * Get place details by place ID
   * Usage: await LocationAPIAdapter.getPlaceDetails(placeId)
   */
  getPlaceDetails: async (placeId: string): Promise<LocationDetails> => {
    if (!placeId) {
      throw new Error("placeId is required");
    }

    try {
      const response = await fetcherMPPInter.post(
        "/v1/international/seller/locations/place-detail",
        { placeId }
      );
      const rawData: RawPlaceDetailData = response.data.Data;
      return mapToLocationDetails(rawData);
    } catch (error) {
      throw new Error(`Failed to get place details: ${error.message}`);
    }
  },

  /**
   * Reverse geocode coordinates to address
   * Usage: await LocationAPIAdapter.reverseGeocode(lat, lng)
   */
  reverseGeocode: async (
    latitude: number,
    longitude: number
  ): Promise<InternationalAddressComponents> => {
    try {
      const response: { data: RawLocationByCoordinatesResponse } = await fetcherMPPInter.post(
        "/v1/international/seller/locations/location_by_lat_long",
        { Lat: latitude, Long: longitude }
      );
      const rawData: RawLocationByCoordinatesData = response.data.Data;
      return mapToAddressComponents(rawData);
    } catch (error) {
      throw new Error(`Failed to reverse geocode: ${error.message}`);
    }
  },

  /**
   * Get postal codes by country code
   * Usage: await LocationAPIAdapter.getPostalCodesByCountry(countryCode)
   * API: GET /v1/international/seller/locations/postal-codes/:countryCode
   */
  getPostalCodesByCountry: async (
    countryCode: string
  ): Promise<RawPostalCodeByCountry[]> => {
    if (!countryCode) {
      throw new Error("countryCode is required");
    }

    try {
      const response = await fetcherMPPInter.get(
        `/v1/international/seller/locations/postal-codes/${countryCode}`
      );
      const rawData: RawPostalCodeByCountryResponse = response.data;

      // Return the Data array containing postal codes
      return rawData.Data || [];
    } catch (error) {
      throw new Error(
        `Failed to get postal codes by country: ${error.message}`
      );
    }
  },
};

export default LocationAPIAdapter;
