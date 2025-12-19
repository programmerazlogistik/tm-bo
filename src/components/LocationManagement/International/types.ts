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
  country: string;
  postalCode: string;
  coordinates: Coordinates;
  placeId?: string;
  cityList?: Array<{ cityName: string; postalCode: string }>;
  countryCode?: string;
}

export interface LocationDetails {
  coordinates: Coordinates;
  info: LocationInfo;
  searchTitle?: string;
}

export interface AddressComponents {
  city: string;
  postalCode: string;
  isInternationalPostal: boolean;
  country: string;
  countryCode: string;
  formattedAddress: string;
  placeId?: string;
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
  country: string;
  postalCode: string;
  placeId?: string;
  coordinates: Coordinates;
  countryCode?: string;
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
  | { type: "RESET" };

export type LocationStateMachineState =
  | "idle"
  | "searching"
  | "loadingPlaceDetails"
  | "gettingCurrentLocation"
  | "reverseGeocoding"
  | "modalOpen"
  | "error"
  | "submitting";

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
}

export interface LocationStateMachineValue {
  value: LocationStateMachineState;
  context: LocationStateMachineContext;
  nextEvents: string[];
}

// Data passed to onLocationChange callback
export interface LocationChangeData {
  city?: string;
  country?: string;
  countryCode?: string;
  postalCode?: string;
  address?: string;
  formattedAddress?: string;
  coordinates?: Coordinates;
}

export interface LocationFieldProps {
  children?: React.ReactNode;
  defaultCoordinates?: Coordinates;
  /** Called when location data changes (from place selection or reverse geocoding) */
  onLocationChange?: (data: LocationChangeData) => void;
}
