import { Control } from "react-hook-form";

// ==================== CLEAN CAMELCASE TYPES ====================
// These are the canonical types that should be used across the application

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationSuggestion {
  id: string;
  title: string;
  level: number;
}

export interface LocationInfo {
  address: string;
  city: string;
  cityId?: number;
  district?: string;
  districtId?: string | number;
  province: string;
  provinceId?: number;
  country: string;
  postalCode: string;
  coordinates: Coordinates;
  placeId?: string;
  cityList?: Array<{ cityName: string; postalCode: string }>;
}

export interface DistrictData {
  districtID: number;
  district: string;
  cityID: number;
  cityName: string;
  provinceID: number;
  provinceName: string;
  postalCodes: Array<{ id: string; postalCode: string; description: string }>;
}

// Enhanced types for postal code selection flow
export interface DistrictListItem {
  districtID: number;
  district: string;
  cityID?: number;
  cityName?: string;
  provinceID?: number;
  provinceName?: string;
}

export interface PostalCodeListItem {
  ID: string;
  PostalCode: string;
  Description: string;
}

export interface PostalCodeDistrictData {
  postalCodes: PostalCodeListItem[];
  districtsData: LocationDetails | null;
  districtList: DistrictListItem[];
  success: boolean;
  errors: {
    postalCode: string | null;
    district: string | null;
  };
}

// Add to LocationSuggestion type for postal codes
export interface PostalCodeSuggestion extends LocationSuggestion {
  postalCode?: string;
  description?: string;
}

export interface LocationDetails {
  coordinates: Coordinates;
  info: LocationInfo;
  districtsData?: DistrictData[]; // Store districts data for district select
}

export interface AddressComponents {
  village?: string;
  district?: string;
  city: string;
  province: string;
  postalCode: string;
  isInternationalPostal: boolean;
  country?: string;
  countryCode?: string;
  formattedAddress: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Legacy type alias for backward compatibility
export type AutoCompleteStreet = LocationSuggestion;

// Legacy type aliases for smooth migration
export type PlaceDetailLocationInfo = any; // Replaced by LocationDetails.info
export type PlaceDetailData = LocationDetails;
export type LocationByCoordinatesData = AddressComponents;
export type LocationsPagination = PaginationInfo;

// Combined location info type (legacy)
export interface SelectedLocation {
  address: string;
  addressDetail?: string;
  city: string;
  cityId?: number;
  district?: string;
  districtId?: number;
  province?: string;
  provinceId?: number;
  country: string;
  postalCode: string;
  placeId?: string;
  coordinates: Coordinates;
  formattedAddress?: string; // From search result (/v1/autocompleteStreet title)
}

export interface LocationFieldContextValue {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: LocationSuggestion[];
  isSearching: boolean;

  coordinates: Coordinates;
  setCoordinates: (coords: Coordinates) => void;

  selectedLocation: SelectedLocation | null;
  setSelectedLocation: (location: SelectedLocation | null) => void;

  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  isPostalModalOpen: boolean;
  setIsPostalModalOpen: (open: boolean) => void;
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (open: boolean) => void;
  isManagementModalOpen: boolean;
  setIsManagementModalOpen: (open: boolean) => void;

  recentLocations: LocationSuggestion[];

  handleSelectLocation: (location: LocationSuggestion) => void;
  handleGetCurrentLocation: () => void;
  handleCoordinateChange: (coords: Coordinates, shouldFetch?: boolean) => void;
  handlePostalCodeSelect: (postalCode: string) => void;

  errors: Record<string, string>;
  isSubmitting: boolean;

  control?: any;
  setValue?: any;
  watch?: any;
}

// ==================== LEGACY STATE MACHINE TYPES ====================
// These are maintained for backward compatibility with existing XState machine
// Consider migrating to the clean LocationEvent type from @muatmuat/lib/types

export type LocationStateMachineEvent =
  | { type: "SEARCH_START"; query: string }
  | { type: "SEARCH_SELECT"; location: LocationSuggestion }
  | { type: "SEARCH_CANCEL" }
  | { type: "GET_CURRENT_LOCATION" }
  | { type: "COORDINATES_CHANGE"; coordinates: Coordinates }
  | { type: "PLACE_SUCCESS"; placeDetail: LocationDetails }
  | { type: "PLACE_ERROR"; error: string }
  | { type: "LOCATION_SUCCESS"; coordinates: Coordinates }
  | { type: "LOCATION_ERROR"; error: string }
  | { type: "GEOCODE_SUCCESS"; locationData: AddressComponents }
  | { type: "GEOCODE_ERROR"; error: string }
  | { type: "RETRY" }
  | { type: "CLEAR_ERROR"; key: string }
  | { type: "OPEN_MODAL"; modal: "postal" | "detail" | "management" }
  | { type: "CLOSE_MODAL" }
  | { type: "SELECT_POSTAL_CODE"; postalCode: string }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_FAILURE"; error?: string }
  | { type: "RESET" }
  // Enhanced events for postal code search and fallback handling
  | { type: "SEARCH_POSTAL_CODES"; query: string }
  | { type: "POSTAL_CODES_SUCCESS"; results: LocationSuggestion[] }
  | { type: "POSTAL_CODES_ERROR"; error: string }
  | {
      type: "PLACE_DETAILS_FALLBACK";
      locationId: string;
      originalTitle: string;
    }
  | { type: "COORDINATE_LOOKUP"; coordinates: Coordinates }
  | { type: "COORDINATE_LOOKUP_SUCCESS"; locationDetails: LocationDetails }
  | { type: "COORDINATE_LOOKUP_ERROR"; error: string }
  | { type: "OPEN_POSTAL_MODAL_WITH_QUERY"; query: string };

export type LocationStateMachineState =
  | "idle"
  | "searching"
  | "loadingPlaceDetails"
  | "gettingCurrentLocation"
  | "reverseGeocoding"
  | "modalOpen"
  | "error"
  | "submitting"
  // Enhanced states for postal code search and fallback handling
  | "searchingPostalCodes"
  | "gettingPlaceDetailsWithFallback"
  | "gettingLocationByCoordinates";

export interface LocationStateMachineContext {
  // Search state
  searchQuery: string;
  searchResults: LocationSuggestion[];
  debouncedQuery: string;

  // Location state
  coordinates: Coordinates;
  selectedLocation: SelectedLocation | null;
  placeDetail: LocationDetails | null;
  locationByCoordinatesData: AddressComponents | null;

  // UI state
  isDropdownOpen: boolean;
  activeModal: "postal" | "detail" | "management" | null;

  // Data state
  recentLocations: LocationSuggestion[];
  postalCodes: Array<{ value: string; name: string }>;

  // Enhanced data state for postal code search
  postalCodeResults: LocationSuggestion[];
  isSearchingPostalCodes: boolean;
  placeDetailsFallbackData: LocationDetails | null;

  // Status state
  errors: Record<string, string>;
  isSubmitting: boolean;
  isGettingLocation: boolean;

  // Form integration
  formMethods: {
    control?: any;
    setValue?: any;
    watch?: any;
  };

  // Configuration
  defaultCoordinates: Coordinates;

  // Retry state
  retryCount: number;

  // Temporary storage for event data
  locationId?: string;
  tempLocationTitle?: string;
}

export interface LocationStateMachineValue {
  value: LocationStateMachineState;
  context: LocationStateMachineContext;
  nextEvents: string[];
}

// Data passed to onLocationChange callback
export interface LocationChangeData {
  city?: string;
  cityId?: number;
  district?: string;
  districtId?: number;
  province?: string;
  provinceId?: number;
  country?: string;
  postalCode?: string;
  address?: string;
  formattedAddress?: string;
  coordinates?: Coordinates;
}

// ==================== RHF INTEGRATED TYPES ====================
// New types for React Hook Form integration

export interface RHFLocationData {
  addressDetail: string;
  addressFormatted: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  city: {
    cityId: number;
    cityName: string;
  };
  province: {
    provinceId: number;
    provinceName: string;
  };
  district: {
    districtId: number;
    districtName: string;
  };
  postalCode: string;
}

export interface LocationFieldProviderProps {
  children: React.ReactNode;
  control: Control<any>; // RHF control object
  defaultCoordinates?: Coordinates;
  initialLocationData?: any; // For pre-populating location data in edit mode
  // Remove onLocationChange callback and name prop - defaults to "location"
}

export interface LocationFieldProps {
  children?: React.ReactNode;
  defaultCoordinates?: Coordinates;
  /** Called when location data changes (from place selection or reverse geocoding) */
  onLocationChange?: (data: LocationChangeData) => void;
}

// Field name constants for RHF integration
export const LOCATION_FIELD_NAMES = {
  ADDRESS_DETAIL: "location.addressDetail",
  ADDRESS_FORMATTED: "location.addressFormatted",
  LATITUDE: "location.coordinates.latitude",
  LONGITUDE: "location.coordinates.longitude",
  CITY_ID: "location.city.cityId",
  CITY_NAME: "location.city.cityName",
  PROVINCE_ID: "location.province.provinceId",
  PROVINCE_NAME: "location.province.provinceName",
  DISTRICT_ID: "location.district.districtId",
  DISTRICT_NAME: "location.district.districtName",
  POSTAL_CODE: "location.postalCode",
} as const;

// Enhanced error response types
export interface APIErrorResponse {
  Data?: {
    Message?: string;
    lat?: number;
    lng?: number;
    Data?: {
      lat?: number;
      lng?: number;
    };
  };
}

// Fallback location data structure
export interface FallbackLocationData {
  place_id?: string;
  address?: string;
  postal?: string;
  lat?: number;
  lng?: number;
}
