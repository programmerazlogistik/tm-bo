/**
 * Location API Adapter - Clean Type Mapping
 *
 * Pattern:
 * - Direct fetch calls instead of SWR hooks
 * - State machine handles caching and loading states
 * - Maps raw API responses to clean camelCase types
 * - Uses consistent camelCase naming throughout
 */
import { fetcherMPPInter, fetcherMuatparts } from "@/lib/axios";

import type {
  AddressComponents,
  Coordinates,
  LocationDetails,
  LocationSuggestion,
} from "./types";

// Raw API response types for mapping (these match actual API responses)
interface RawAutoCompleteStreet {
  ID: string;
  Title: string;
  Lev: number;
}

interface RawPostalCode {
  ID: string;
  PostalCode: string;
  Description: string;
}

interface RawDistrict {
  DistrictID: number;
  District: string;
  CityID: number;
  CityName: string;
  ProvinceID: number;
  ProvinceName: string;
  PostalCodes: RawPostalCode[];
}

interface RawCompleteLocation {
  lat: number;
  lng: number;
  district: string;
  city: string;
  cityid: number;
  province: string;
  provinceid: number;
  postal: string;
  int_postal: boolean;
  Code: number;
}

interface RawPlaceDetailData {
  Lat: number; // API returns uppercase "Lat"
  Long: number; // API returns uppercase "Long"
  Districts: RawDistrict[];
  CompleteLocation: RawCompleteLocation;
}

interface RawLocationByCoordinatesData {
  formatted_address: string;
  place_id: string;
  village: string;
  district: string;
  city: string;
  province: string;
  postal: string;
  int_postal: boolean;
  description: string;
  country?: string;
  countryCode?: string;
}

// Raw API response for postal code autocomplete
interface RawAutoCompleteStreetLocal {
  Description: string;
  ProvinceID: number;
  ProvinceName: string;
  CityID: number;
  CityName: string;
  DistrictID: string;
  DistrictName: string;
  PostalCode: string;
}

interface RawPostalCodeByDistrict {
  ID: string;
  PostalCode: string;
  Description: string;
}

interface RawPostalCodeByDistrictResponse {
  Message: {
    Code: number;
    Text: string;
  };
  Data: RawPostalCodeByDistrict[];
  Type: string;
}

// Request payload for district by token local
interface DistrictByTokenLocalRequest {
  ProvinceID: number;
  CityID: number;
  DistrictID: string;
  PostalCode: string;
}

// Response district list item
interface DistrictListItem {
  DistrictID: string;
  District: string;
}

// Enhanced district with postal codes
interface DistrictWithPostalCodes {
  DistrictID: number;
  District: string;
  CityID: number;
  CityName: string;
  ProvinceID: number;
  ProvinceName: string;
  PostalCodes: RawPostalCodeByDistrict[];
  DistrictList: DistrictListItem[];
}

// Complete location info for local district lookup
interface LocalCompleteLocation {
  lat: number;
  lng: number;
  district: string;
  city: string;
  cityid: number;
  province: string;
  provinceid: number;
  postal: string;
  int_postal: boolean;
  Code: number;
}

// Response data for district by token local
interface DistrictByTokenLocalData {
  Lat: number;
  Long: number;
  Districts: DistrictWithPostalCodes[];
  CompleteLocation: LocalCompleteLocation;
}

// Full response for district by token local
interface DistrictByTokenLocalResponse {
  Message: {
    Code: number;
    Text: string;
  };
  Data: DistrictByTokenLocalData;
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
  console.warn("🏘️ DISTRICT_DEBUG: Raw API response:", raw);

  // Use CompleteLocation for detailed info, fallback to top-level coordinates
  const completeLocation = raw.CompleteLocation;
  const firstDistrict = raw.Districts?.[0];

  console.warn("🏘️ DISTRICT_DEBUG: CompleteLocation:", completeLocation);
  console.warn("🏘️ DISTRICT_DEBUG: Raw Districts:", raw.Districts);

  // Map districts data for district select component - define locally to avoid import issues
  const districtsData =
    raw.Districts?.map((district) => {
      console.warn("🏘️ DISTRICT_DEBUG: Processing raw district:", district);
      return {
        districtID: district.DistrictID,
        district: district.District,
        cityID: district.CityID,
        cityName: district.CityName,
        provinceID: district.ProvinceID,
        provinceName: district.ProvinceName,
        postalCodes:
          (district.PostalCodes || [])?.map((postal) => ({
            id: postal.ID,
            postalCode: postal.PostalCode,
            description: postal.Description,
          })) || [],
      };
    }) || [];

  console.warn("🏘️ DISTRICT_DEBUG: Mapped districtsData:", districtsData);

  const finalLocationDetails = {
    coordinates: {
      latitude: raw.Lat,
      longitude: raw.Long,
    },
    info: {
      address: "", // Will be populated by reverse geocoding (or Title)
      city: completeLocation?.city || firstDistrict?.CityName || "",
      cityId: completeLocation?.cityid || firstDistrict?.CityID,
      district: completeLocation?.district || firstDistrict?.District || "",
      districtId: completeLocation?.district || firstDistrict?.DistrictID, // Use district name as ID since numeric ID not available in CompleteLocation
      province: completeLocation?.province || firstDistrict?.ProvinceName || "",
      provinceId: completeLocation?.provinceid || firstDistrict?.ProvinceID,
      country: "Indonesia", // Assuming domestic locations are in Indonesia
      postalCode: completeLocation?.postal || "",
      coordinates: {
        latitude: completeLocation?.lat || raw.Lat,
        longitude: completeLocation?.lng || raw.Long,
      },
      cityList:
        raw.Districts?.map((district) => ({
          cityName: district.CityName,
          postalCode: district.PostalCodes?.[0]?.PostalCode || "",
        })) || [],
    },
    // Store districts data as a custom property to avoid type conflicts
    ...(districtsData.length > 0 && { districtsData }),
  };

  console.warn(
    "🏘️ DISTRICT_DEBUG: Final locationDetails:",
    finalLocationDetails
  );
  return finalLocationDetails;
};

/**
 * Maps raw reverse geocode response to clean AddressComponents type
 */
const mapToAddressComponents = (
  raw: RawLocationByCoordinatesData
): AddressComponents => ({
  formattedAddress: raw.formatted_address,
  village: raw.village,
  district: raw.district,
  city: raw.city,
  province: raw.province,
  postalCode: raw.postal,
  isInternationalPostal: raw.int_postal,
  country: raw.country,
  countryCode: raw.countryCode,
});

/**
 * Maps postal code API response to LocationSuggestion with full location data
 */
const mapPostalCodeToSuggestion = (
  raw: RawAutoCompleteStreetLocal
): LocationSuggestion & {
  districtName?: string;
  cityName?: string;
  provinceName?: string;
  description?: string;
  provinceID?: number;
  cityID?: number;
  districtID?: string;
  postalCode?: string;
} => ({
  id: raw.DistrictID,
  title: raw.PostalCode,
  level: 0, // Postal codes don't have levels
  // Include full location data for better display
  districtName: raw.DistrictName,
  cityName: raw.CityName,
  provinceName: raw.ProvinceName,
  description: raw.Description,
  // Include the API identifiers needed for district lookup
  provinceID: raw.ProvinceID,
  cityID: raw.CityID,
  districtID: raw.DistrictID,
  postalCode: raw.PostalCode,
});

/**
 * Maps district by token local response to clean LocationDetails type
 */
const mapDistrictByTokenLocalToLocationDetails = (
  raw: DistrictByTokenLocalData
): LocationDetails => {
  console.warn("🏘️ DISTRICT_LOCAL_DEBUG: Raw API response:", raw);

  const completeLocation = raw.CompleteLocation;
  const firstDistrict = raw.Districts?.[0];

  console.warn("🏘️ DISTRICT_LOCAL_DEBUG: CompleteLocation:", completeLocation);
  console.warn("🏘️ DISTRICT_LOCAL_DEBUG: Raw Districts:", raw.Districts);

  // Map districts data with enhanced structure
  const districtsData =
    raw.Districts?.map((district) => {
      console.warn(
        "🏘️ DISTRICT_LOCAL_DEBUG: Processing raw district:",
        district
      );
      return {
        districtID: district.DistrictID,
        district: district.District,
        cityID: district.CityID,
        cityName: district.CityName,
        provinceID: district.ProvinceID,
        provinceName: district.ProvinceName,
        postalCodes:
          (district.PostalCodes || [])?.map((postal) => ({
            id: postal.ID,
            postalCode: postal.PostalCode,
            description: postal.Description,
          })) || [],
        // Include district list for additional district options in the same city
        districtList:
          district.DistrictList?.map((districtItem) => ({
            districtID: districtItem.DistrictID, // Already a number from API
            district: districtItem.District,
            cityID: district.CityID, // Already a number from API
            cityName: district.CityName,
            provinceID: district.ProvinceID, // Already a number from API
            provinceName: district.ProvinceName,
          })) || [],
      };
    }) || [];

  console.warn("🏘️ DISTRICT_LOCAL_DEBUG: Mapped districtsData:", districtsData);

  const finalLocationDetails = {
    coordinates: {
      latitude: raw.Lat,
      longitude: raw.Long,
    },
    info: {
      address: "", // Will be populated by reverse geocoding if needed
      city: completeLocation?.city || firstDistrict?.CityName || "",
      country: "Indonesia", // Domestic locations are in Indonesia
      province: completeLocation?.province || firstDistrict?.ProvinceName || "",
      postalCode: completeLocation?.postal || "",
      district: completeLocation?.district || firstDistrict?.District || "",
      coordinates: {
        latitude: completeLocation?.lat || raw.Lat,
        longitude: completeLocation?.lng || raw.Long,
      },
      cityList:
        raw.Districts?.map((district) => ({
          cityName: district.CityName,
          postalCode: district.PostalCodes?.[0]?.PostalCode || "",
        })) || [],
    },
    // Store enhanced districts data
    ...(districtsData.length > 0 && { districtsData }),
  };

  console.warn(
    "🏘️ DISTRICT_LOCAL_DEBUG: Final locationDetails:",
    finalLocationDetails
  );
  return finalLocationDetails;
};

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

      const response = await fetcherMuatparts.post(
        "/v1/autocompleteStreet",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );

      // Map raw API response to clean types
      const rawData: RawAutoCompleteStreet[] = response.data || [];
      const mappedResults = rawData.map(mapToLocationSuggestion);

      // Limit to 3 results like the old implementation
      return mappedResults.slice(0, 3);
    } catch (error) {
      throw new Error(`Failed to search locations: ${error.message}`);
    }
  },

  /**
   * Search postal codes for autocomplete
   * Replaces: useGetAutoCompleteByPostalCode
   * API: POST /v1/autocompleteStreetLocal
   */
  searchPostalCodes: async (query: string): Promise<LocationSuggestion[]> => {
    if (!query || query.length < 3) return [];

    try {
      const params = new URLSearchParams();
      params.append("phrase", query);

      const response = await fetcherMuatparts.post(
        "/v1/autocompleteStreetLocal",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );

      // Handle correct data structure: res.data.Data.data.Data (based on actual API response)
      const rawData = response.data?.Data?.data?.Data || [];
      console.warn("🏘️ API_DEBUG: Raw postal code response:", rawData);
      const mappedResults = rawData.map(mapPostalCodeToSuggestion);
      console.warn("🏘️ API_DEBUG: Mapped postal code results:", mappedResults);

      // Limit to 3 results like the old implementation
      return mappedResults.slice(0, 3);
    } catch (error) {
      throw new Error(`Failed to search postal codes: ${error.message}`);
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
      const response = await fetcherMuatparts.post("/v1/district_by_token", {
        placeId,
      });
      const rawData: RawPlaceDetailData = response.data.Data;

      // Check if API returned an error message (location not found)
      if (
        response.data?.Data?.Message?.Message?.includes(
          "Maaf! Lokasi tidak ditemukan!"
        )
      ) {
        // Location not found, trigger postal code fallback
        const error = new Error("No district data found");
        (error as any).response = {
          data: {
            Data: rawData,
          },
        };
        throw error;
      }

      // Check if districts data exists
      if (!rawData?.Districts?.[0]) {
        // No district data found, throw specific error for fallback
        const error = new Error("No district data found");
        (error as any).response = {
          data: {
            Data: rawData, // Pass along the data for fallback
          },
        };
        throw error;
      }

      return mapToLocationDetails(rawData);
    } catch (error) {
      // Check if this is a "no district data" error
      if (error.message === "No district data found") {
        throw error; // Re-throw for fallback handling
      }
      throw new Error(`Failed to get place details: ${error.message}`);
    }
  },

  /**
   * Get location by coordinates with district lookup
   * Replaces: getLocationByLatLong
   * API: POST /v1/location_by_lat_long → POST /v1/district_by_token
   */
  getLocationByCoordinates: async (
    coordinates: Coordinates
  ): Promise<LocationDetails> => {
    try {
      // Step 1: Get basic location info
      const locationResponse = await fetcherMuatparts.post(
        "/v1/location_by_lat_long",
        {
          Lat: coordinates.latitude,
          Long: coordinates.longitude,
        }
      );
      const locationData = locationResponse.data.Data;

      // Step 2: Get district information
      const districtResponse = await fetcherMuatparts.post(
        "/v1/district_by_token",
        new URLSearchParams({ placeId: locationData.place_id })
      );
      const districtData = districtResponse.data.Data;

      // Check if district data exists
      if (districtData?.Districts?.[0]) {
        // We have district data, return complete location details
        return mapToLocationDetails({
          ...districtData,
          Lat: coordinates.latitude,
          Long: coordinates.longitude,
          CompleteLocation: locationData,
        });
      } else {
        // No district data, return partial location info
        return {
          coordinates,
          info: {
            address: locationData.address || "",
            city: "",
            country: "Indonesia",
            province: "",
            postalCode: locationData.postal || "",
            coordinates,
          },
        };
      }
    } catch (error) {
      throw new Error(
        `Failed to get location by coordinates: ${error.message}`
      );
    }
  },

  /**
   * Extract coordinates from various API response formats
   */
  extractCoordinatesFromPlaceId: (_placeId: string): Coordinates | null => {
    // This is a placeholder implementation
    // In the old system, coordinates might be extracted from error responses
    // For now, return null to indicate we need coordinates from elsewhere
    return null;
  },

  /**
   * Reverse geocode coordinates to address
   * Usage: await LocationAPIAdapter.reverseGeocode(lat, lng)
   */
  reverseGeocode: async (
    latitude: number,
    longitude: number
  ): Promise<AddressComponents> => {
    try {
      const response = await fetcherMPPInter.post(
        "/v1/international/seller/locations/by-coordinates",
        { latitude, longitude }
      );
      const rawData: RawLocationByCoordinatesData = response.data.Data;
      return mapToAddressComponents(rawData);
    } catch (error) {
      throw new Error(`Failed to reverse geocode: ${error.message}`);
    }
  },

  /**
   * Get postal codes by district code
   * Usage: await LocationAPIAdapter.getPostalCodesByDistrict(districtCode)
   * API: GET /v1/postalcode_by_district/:districtCode
   */
  getPostalCodesByDistrict: async (
    districtCode: string
  ): Promise<RawPostalCodeByDistrict[]> => {
    if (!districtCode) {
      throw new Error("districtCode is required");
    }

    try {
      const response = await fetcherMuatparts.get(
        `/v1/postalcode_by_district/${districtCode}`
      );
      const rawData: RawPostalCodeByDistrictResponse = response.data;

      // Return the Data array containing postal codes
      return rawData.Data || [];
    } catch (error) {
      throw new Error(
        `Failed to get postal codes by district: ${error.message}`
      );
    }
  },

  /**
   * Get district details by token with local data
   * Usage: await LocationAPIAdapter.getDistrictByTokenLocal(payload)
   * API: POST /v1/district_by_token_local
   */
  getDistrictByTokenLocal: async (
    payload: DistrictByTokenLocalRequest
  ): Promise<LocationDetails> => {
    if (
      !payload.ProvinceID ||
      !payload.CityID ||
      !payload.DistrictID ||
      !payload.PostalCode
    ) {
      throw new Error(
        "ProvinceID, CityID, DistrictID, and PostalCode are required"
      );
    }

    try {
      const response = await fetcherMuatparts.post(
        "/v1/district_by_token_local",
        payload
      );
      const rawData: DistrictByTokenLocalResponse = response.data;

      // Check if API returned an error message
      if (rawData.Message?.Code !== 200) {
        throw new Error(rawData.Message?.Text || "API returned non-200 status");
      }

      // Check if districts data exists
      if (!rawData?.Data?.Districts?.[0]) {
        // No district data found, throw specific error for fallback handling
        const error = new Error("No district data found");
        (error as any).response = {
          data: {
            Data: rawData.Data, // Pass along the data for fallback
          },
        };
        throw error;
      }

      return mapDistrictByTokenLocalToLocationDetails(rawData.Data);
    } catch (error) {
      // Check if this is a "no district data" error
      if (error.message === "No district data found") {
        throw error; // Re-throw for fallback handling
      }
      throw new Error(
        `Failed to get district details by token local: ${error.message}`
      );
    }
  },

  /**
   * Combined postal code and district data fetch
   * Uses smart fallback strategy when district data is unavailable
   * Usage: await LocationAPIAdapter.fetchPostalCodeAndDistrictData(postalCode)
   */
  fetchPostalCodeAndDistrictData: async (
    postalCode: string,
    searchResult?: any
  ) => {
    console.warn(
      "🏘️ POSTAL_DEBUG: Fetching postal code and district data for:",
      postalCode
    );
    console.warn(
      "🏘️ POSTAL_DEBUG: Search result with identifiers:",
      searchResult
    );

    const startTime = performance.now();

    try {
      console.warn("🏘️ POSTAL_DEBUG: Starting with postal code fetch...");

      // Step 1: Always fetch postal codes first (this should work)
      const postalDataResult =
        await LocationAPIAdapter.getPostalCodesByDistrict(postalCode);
      console.warn(
        "🏘️ POSTAL_DEBUG: Postal codes fetched successfully:",
        postalDataResult
      );

      // Step 2: Try to fetch district data only if we have valid identifiers
      // Since we only have postal code, we'll try different strategies
      let districtsData = null;
      let districtError = null;

      try {
        // Strategy 1: Use proper identifiers from search result if available
        if (searchResult && searchResult.provinceID && searchResult.cityID) {
          console.warn(
            "🏘️ POSTAL_DEBUG: Using search result identifiers for district API call"
          );

          const districtPayload: DistrictByTokenLocalRequest = {
            ProvinceID: searchResult.provinceID,
            CityID: searchResult.cityID,
            DistrictID: searchResult.districtID || postalCode,
            PostalCode: searchResult.postalCode || postalCode,
          };

          console.warn(
            "🏘️ POSTAL_DEBUG: District payload with proper identifiers:",
            districtPayload
          );

          districtsData =
            await LocationAPIAdapter.getDistrictByTokenLocal(districtPayload);
          console.warn(
            "🏘️ POSTAL_DEBUG: District data fetched successfully with proper identifiers:",
            districtsData
          );
        } else {
          // Strategy 2: Fallback - try using postal code as district identifier
          console.warn(
            "🏘️ POSTAL_DEBUG: No search result identifiers, attempting district data fetch with postal code as district..."
          );

          const districtPayload: DistrictByTokenLocalRequest = {
            ProvinceID: 0, // These might be optional in the API
            CityID: 0, // We'll try with zeros first
            DistrictID: postalCode,
            PostalCode: postalCode,
          };

          districtsData =
            await LocationAPIAdapter.getDistrictByTokenLocal(districtPayload);
          console.warn(
            "🏘️ POSTAL_DEBUG: District data fetched successfully with fallback:",
            districtsData
          );
        }
      } catch (districtFetchError) {
        districtError = (districtFetchError as Error)?.message;
        console.warn(
          "🏘️ POSTAL_DEBUG: District fetch failed, this is expected for some postal codes:",
          districtError
        );

        // This is not a critical failure - we can work with just postal codes
        districtsData = null;
      }

      const endTime = performance.now();
      console.warn(
        `🏘️ POSTAL_DEBUG: API calls completed in ${endTime - startTime}ms`
      );

      // Extract district list from districts data if available
      const districtList =
        districtsData?.districtsData?.map((district: any) => ({
          districtID: district.districtID,
          district: district.district,
          cityID: district.cityID,
          cityName: district.cityName,
          provinceID: district.provinceID,
          provinceName: district.provinceName,
        })) || [];

      console.warn("🏘️ POSTAL_DEBUG: Final results:", {
        postalCodesCount: postalDataResult.length,
        districtsAvailable: !!districtsData,
        districtListCount: districtList.length,
      });

      return {
        postalCodes: postalDataResult,
        districtsData,
        districtList,
        success: true, // Success if we got postal codes, district data is optional
        errors: {
          postalCode: null, // No postal code errors
          district: districtError, // May contain district fetch error (not critical)
        },
      };
    } catch (error) {
      const endTime = performance.now();
      console.error(
        `🏘️ POSTAL_DEBUG: Critical API failure after ${endTime - startTime}ms:`,
        error
      );

      return {
        postalCodes: [], // Even postal codes failed - this is a critical issue
        districtsData: null,
        districtList: [],
        success: false,
        errors: {
          postalCode:
            (error as Error)?.message || "Failed to fetch postal codes",
          district: (error as Error)?.message || "District fetch failed",
        },
      };
    }
  },
};

export default LocationAPIAdapter;
