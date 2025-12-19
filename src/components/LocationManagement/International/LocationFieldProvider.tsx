import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useDebounceCallback } from "@muatmuat/hooks/use-debounce-callback";
import { useMachine } from "@xstate/react";
import { assign, fromPromise, setup } from "xstate";

import LocationAPIAdapter from "./api-adapter";
import LocationDetailModal from "./modals/LocationDetailModal";
import PostalCodeModal from "./modals/PostalCodeModal";
import type {
  AutoCompleteStreet,
  Coordinates,
  LocationByCoordinatesData,
  LocationFieldProps,
  PlaceDetailData,
  SelectedLocation,
} from "./types";

// ==================== XSTATE MACHINE ====================

// Type definitions for XState machine
interface LocationContext {
  // Search state
  searchQuery: string;
  searchResults: AutoCompleteStreet[];

  // Location state
  coordinates: Coordinates;
  selectedLocation: SelectedLocation | null;
  placeDetail: PlaceDetailData | null;
  locationByCoordinatesData: LocationByCoordinatesData | null;

  // UI state
  isDropdownOpen: boolean;
  activeModal: "postal" | "detail" | "management" | null;

  // Status state
  errors: Record<string, string>;
  isGettingLocation: boolean;

  // Temporary storage for event data
  locationId?: string;
  tempLocationTitle?: string; // Stores the title from autocomplete selection

  // Postal code options from country-based API
  postalCodes: Array<{
    id: string;
    postalCode: string;
    description: string;
    value: string; // For compatibility with existing components
    name: string; // For compatibility with existing components
  }>;
}

type LocationEvent =
  | { type: "SEARCH_START"; query: string }
  | { type: "SEARCH_SELECT"; location: AutoCompleteStreet }
  | { type: "SEARCH_CANCEL" }
  | { type: "GET_CURRENT_LOCATION" }
  | {
      type: "COORDINATES_CHANGE";
      coordinates: Coordinates;
      shouldFetch?: boolean;
    }
  | { type: "PLACE_SUCCESS"; placeDetail: PlaceDetailData; postalCodes?: Array<{name: string, value: string}> }
  | { type: "PLACE_ERROR"; error: string }
  | { type: "LOCATION_SUCCESS"; coordinates: Coordinates }
  | { type: "LOCATION_ERROR"; error: string }
  | { type: "GEOCODE_SUCCESS"; locationData: LocationByCoordinatesData }
  | { type: "GEOCODE_ERROR"; error: string }
  | { type: "RETRY" }
  | { type: "CLEAR_ERROR"; key: string }
  | { type: "OPEN_MODAL"; modal: "postal" | "detail" | "management" }
  | { type: "CLOSE_MODAL" }
  | { type: "SET_DROPDOWN_OPEN"; open: boolean }
  | { type: "SELECT_POSTAL_CODE"; postalCode: string; city?: string }
  | { type: "FETCH_POSTAL_CODES_BY_COUNTRY"; countryCode: string }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_FAILURE"; error?: string }
  | { type: "RESET" };

// Actors for async operations
const locationMachineSetup = setup({
  types: {
    context: {} as LocationContext,
    events: {} as LocationEvent,
    input: {} as { defaultCoordinates?: Coordinates } | undefined,
  },
  actors: {
    searchLocations: fromPromise(
      async ({ input }: { input: { query: string } }) => {
        if (!input.query || input.query.length < 3) {
          return [];
        }
        return await LocationAPIAdapter.searchLocations(input.query);
      }
    ),
    getCurrentLocation: fromPromise(async () => {
      return new Promise<Coordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          (error) => reject(new Error(error.message)),
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000, // 5 minutes
          }
        );
      });
    }),
    reverseGeocode: fromPromise(async ({ input }: { input: Coordinates }) => {
      return await LocationAPIAdapter.reverseGeocode(
        input.latitude,
        input.longitude
      );
    }),
    getPlaceDetails: fromPromise(
      async ({ input }: { input: { locationId: string } }) => {
        return await LocationAPIAdapter.getPlaceDetails(input.locationId);
      }
    ),
    getPostalCodesByCountry: fromPromise(
      async ({ input }: { input: { countryCode: string } }) => {
        return await LocationAPIAdapter.getPostalCodesByCountry(
          input.countryCode
        );
      }
    ),
  },
});

// Main location machine - pragmatic solution for XState v5 compatibility
export const locationMachine: any = locationMachineSetup.createMachine({
  // Final pragmatic approach: Use 'any' to resolve complex XState v5 type inference conflicts
  // We maintain type safety through our setup types while avoiding TS2742 and action type conflicts
  id: "locationField",
  initial: "idle",

  context: {
    // Search state
    searchQuery: "",
    searchResults: [],

    // Location state
    coordinates: { latitude: -6.2088, longitude: 106.8456 }, // Default: Jakarta
    selectedLocation: null,
    placeDetail: null,
    locationByCoordinatesData: null,

    // UI state
    isDropdownOpen: false,
    activeModal: null,

    // Status state
    errors: {},
    isGettingLocation: false,

    // Temporary storage for event data
    locationId: undefined,

    // Postal code options
    postalCodes: [],
  },

  states: {
    idle: {
      on: {
        SEARCH_START: {
          target: "searching",
          actions: assign({
            searchQuery: ({ event }) => event.query,
            errors: ({ context }) => ({ ...context.errors, search: "" }),
          }),
        },
        GET_CURRENT_LOCATION: "gettingCurrentLocation",
        COORDINATES_CHANGE: [
          {
            guard: ({ event }) => event.shouldFetch === false,
            actions: assign({
              coordinates: ({ event }) => event.coordinates,
              errors: ({ context }) => ({ ...context.errors, geocode: "" }),
            }),
          },
          {
            target: "reverseGeocoding",
            actions: assign({
              coordinates: ({ event }) => event.coordinates,
              errors: ({ context }) => ({ ...context.errors, geocode: "" }),
            }),
          },
        ],
        PLACE_SUCCESS: [
          {
            guard: ({ event }) => {
              if (event.type === "PLACE_SUCCESS") {
                const city = event.placeDetail.info.city;
                const postalCode = event.placeDetail.info.postalCode;
                console.log("[POSTAL_DEBUG] PLACE_SUCCESS guard check:", {
                  city,
                  postalCode,
                  shouldOpenModal: !city,
                  placeDetail: event.placeDetail.info,
                });
                return !city; // Open modal when city is falsy
              }
              return false;
            },
            target: "modalOpen",
            actions: assign({
              placeDetail: ({ event }) => {
                console.log(
                  "[POSTAL_DEBUG] PLACE_SUCCESS modal branch - setting placeDetail:",
                  event.placeDetail
                );
                return event.placeDetail;
              },
              coordinates: ({ event }) => event.placeDetail.coordinates,
              selectedLocation: ({ context, event }) => {
                const { info } = event.placeDetail;
                // Use tempLocationTitle from context (the original autocomplete title)
                const addressToUse = context.tempLocationTitle || info.address || "";
                const selectedLocation = {
                  address: addressToUse,
                  city: info.city,
                  country: info.country,
                  postalCode: info.postalCode,
                  coordinates: info.coordinates,
                  placeId: info.placeId || "",
                  countryCode: info.countryCode,
                };
                console.log(
                  "[POSTAL_DEBUG] PLACE_SUCCESS modal branch - setting selectedLocation:",
                  selectedLocation
                );
                console.log(
                  "[POSTAL_DEBUG] tempLocationTitle from context:",
                  context.tempLocationTitle
                );
                return selectedLocation;
              },
              postalCodes: ({ event }) => {
                // If postalCodes are provided in the event (from reverse geocode), use them
                if (event.postalCodes && event.postalCodes.length > 0) {
                  console.warn("[POSTAL_DEBUG] PLACE_SUCCESS using postalCodes from event:", event.postalCodes);
                  return event.postalCodes.map((item) => ({
                    id: item.value,
                    postalCode: item.value,
                    description: `${item.name} - ${item.value}`,
                    value: item.value,
                    name: item.name,
                  }));
                }

                // Otherwise, use cityList from placeDetail (existing logic)
                const cityList = event.placeDetail.info.cityList || [];
                const uniquePostalCodes = Array.from(
                  new Map(
                    cityList.map((item: any) => [item.postalCode, item])
                  ).values()
                ) as Array<{ cityName: string; postalCode: string }>;

                return uniquePostalCodes.map((item) => ({
                  id: item.postalCode,
                  postalCode: item.postalCode,
                  description: `${item.cityName} - ${item.postalCode}`,
                  value: item.postalCode,
                  name: item.cityName,
                }));
              },
              activeModal: "postal",
              errors: ({ context }) => ({ ...context.errors, place: "" }),
            }),
          },
          {
            target: "idle",
            actions: assign({
              placeDetail: ({ event }) => {
                console.log(
                  "[POSTAL_DEBUG] PLACE_SUCCESS idle branch - setting placeDetail:",
                  event.placeDetail
                );
                return event.placeDetail;
              },
              coordinates: ({ event }) => event.placeDetail.coordinates,
              selectedLocation: ({ context, event }) => {
                const { info } = event.placeDetail;
                // Use tempLocationTitle from context (the original autocomplete title)
                const addressToUse = context.tempLocationTitle || info.address || "";
                const selectedLocation = {
                  address: addressToUse,
                  city: info.city,
                  country: info.country,
                  postalCode: info.postalCode,
                  coordinates: info.coordinates,
                  placeId: info.placeId || "",
                  countryCode: info.countryCode,
                };
                console.log(
                  "[POSTAL_DEBUG] PLACE_SUCCESS idle branch - setting selectedLocation:",
                  selectedLocation
                );
                console.log(
                  "[POSTAL_DEBUG] tempLocationTitle from context:",
                  context.tempLocationTitle
                );
                return selectedLocation;
              },
              postalCodes: ({ event }) => {
                // If postalCodes are provided in the event (from reverse geocode), use them
                if (event.postalCodes && event.postalCodes.length > 0) {
                  console.warn("[POSTAL_DEBUG] PLACE_SUCCESS using postalCodes from event:", event.postalCodes);
                  return event.postalCodes.map((item) => ({
                    id: item.value,
                    postalCode: item.value,
                    description: `${item.name} - ${item.value}`,
                    value: item.value,
                    name: item.name,
                  }));
                }

                // Otherwise, use cityList from placeDetail (existing logic)
                const cityList = event.placeDetail.info.cityList || [];
                const uniquePostalCodes = Array.from(
                  new Map(
                    cityList.map((item: any) => [item.postalCode, item])
                  ).values()
                ) as Array<{ cityName: string; postalCode: string }>;

                return uniquePostalCodes.map((item) => ({
                  id: item.postalCode,
                  postalCode: item.postalCode,
                  description: `${item.cityName} - ${item.postalCode}`,
                  value: item.postalCode,
                  name: item.cityName,
                }));
              },
              errors: ({ context }) => ({ ...context.errors, place: "" }),
            }),
          },
        ],
        OPEN_MODAL: {
          target: "modalOpen",
          actions: assign({
            activeModal: ({ event }) => event.modal,
            errors: ({ context }) => ({ ...context.errors, modal: "" }),
          }),
        },
        SET_DROPDOWN_OPEN: {
          actions: assign({
            isDropdownOpen: ({ event }) => event.open,
          }),
        },
        CLEAR_ERROR: {
          actions: assign(({ context, event }) => {
            if (event.type === "CLEAR_ERROR") {
              return {
                errors: { ...context.errors, [event.key]: "" },
              };
            }
            return {};
          }),
        },
      },
    },

    searching: {
      invoke: {
        src: "searchLocations",
        input: ({ context }) => ({ query: context.searchQuery }),
        onDone: {
          target: "idle",
          actions: assign({
            searchResults: ({ event }) => event.output,
          }),
        },
        onError: {
          target: "idle",
          actions: assign(({ context, event }) => ({
            errors: {
              ...context.errors,
              search:
                (event.error as Error)?.message || "Failed to search locations",
            },
          })),
        },
      },
      on: {
        SEARCH_CANCEL: {
          target: "idle",
          actions: assign({
            searchResults: [], // Clear results when search is cancelled
          }),
        },
        SEARCH_START: {
          actions: assign({
            searchQuery: ({ event }) => event.query,
          }),
        },
        SET_DROPDOWN_OPEN: {
          actions: assign({
            isDropdownOpen: ({ event }) => event.open,
          }),
        },
      },
    },

    gettingCurrentLocation: {
      invoke: {
        src: "getCurrentLocation",
        onDone: {
          target: "reverseGeocoding",
          actions: assign({
            coordinates: ({ event }) => event.output,
            isGettingLocation: false,
          }),
        },
        onError: {
          target: "idle",
          actions: assign(({ context, event }) => ({
            errors: {
              ...context.errors,
              location:
                (event.error as Error)?.message ||
                "Failed to get current location",
            },
            isGettingLocation: false,
          })),
        },
      },
      entry: assign({
        isGettingLocation: true,
        errors: ({ context }) => ({ ...context.errors, location: "" }),
      }),
    },

    reverseGeocoding: {
      invoke: {
        src: "reverseGeocode",
        input: ({ context }) => context.coordinates,
        onDone: {
          target: "idle",
          actions: assign({
            locationByCoordinatesData: ({ event }) => event.output,
          }),
        },
        onError: {
          target: "idle",
          actions: assign(({ context, event }) => ({
            errors: {
              ...context.errors,
              geocode:
                (event.error as Error)?.message ||
                "Failed to get address from coordinates",
            },
          })),
        },
      },
    },

    loadingPlaceDetails: {
      invoke: {
        src: "getPlaceDetails",
        input: ({ context }) => {
          // Get the location ID from the stored event or context
          return { locationId: context.locationId || "" };
        },
        onDone: {
          target: "idle",
          actions: [
            assign({
              placeDetail: ({ event }) => event.output,
              coordinates: ({ event }) => event.output.coordinates,
              selectedLocation: ({ event, context }) => {
                // Use the tempLocationTitle from context (the original autocomplete title)
                const address = context.tempLocationTitle || event.output.info.address || "";

                console.log(
                  "[POSTAL_DEBUG] loadingPlaceDetails - tempLocationTitle:",
                  context.tempLocationTitle
                );
                console.log(
                  "[POSTAL_DEBUG] loadingPlaceDetails - fallback address:",
                  event.output.info.address
                );

                return {
                  address: address, // Use actual Title from autocomplete
                  city: event.output.info.city,
                  country: event.output.info.country,
                  postalCode: event.output.info.postalCode,
                  coordinates: event.output.info.coordinates,
                  placeId: event.output.info.placeId || "",
                  countryCode: event.output.info.countryCode,
                };
              },
              // Map and deduplicate postal codes from cityList
              postalCodes: ({ event }) => {
                const cityList = event.output.info.cityList || [];
                // Deduplicate by postalCode
                const uniquePostalCodes = Array.from(
                  new Map(
                    cityList.map((item: any) => [item.postalCode, item])
                  ).values()
                ) as Array<{ cityName: string; postalCode: string }>;

                return uniquePostalCodes.map((item) => ({
                  id: item.postalCode,
                  postalCode: item.postalCode,
                  description: `${item.cityName} - ${item.postalCode}`,
                  value: item.postalCode,
                  name: item.cityName,
                }));
              },
              errors: ({ context }) => ({ ...context.errors, place: "" }),
            }),
            ({ context, event, self }) => {
              self.send({
                type: "PLACE_SUCCESS",
                placeDetail: {
                  ...event.output,
                } as PlaceDetailData & { searchTitle?: string },
              });
            },
          ],
        },
        onError: {
          target: "idle",
          actions: assign(({ context, event }) => ({
            errors: {
              ...context.errors,
              place:
                (event.error as Error)?.message ||
                "Failed to get place details",
            },
          })),
        },
      },
      entry: assign(({ event }) => {
        // Store the location ID and Title from the triggering event
        if (event.type === "SEARCH_SELECT") {
          return {
            locationId: event.location.id,
            tempLocationTitle: event.location.title,
          };
        }
        return {};
      }),
    },

    modalOpen: {
      on: {
        CLOSE_MODAL: {
          target: "idle",
          actions: assign({
            activeModal: null,
          }),
        },
        SET_DROPDOWN_OPEN: {
          actions: assign({
            isDropdownOpen: ({ event }) => event.open,
          }),
        },
        SELECT_POSTAL_CODE: {
          actions: assign({
            selectedLocation: ({ context, event }) =>
              context.selectedLocation
                ? {
                    ...context.selectedLocation,
                    postalCode: event.postalCode,
                    city: event.city || context.selectedLocation.city,
                  }
                : null,
          }),
        },
        FETCH_POSTAL_CODES_BY_COUNTRY: {
          target: "fetchingPostalCodesByCountry",
          actions: assign({
            errors: ({ context }) => ({ ...context.errors, postalCodes: "" }),
          }),
        },
      },
    },

    fetchingPostalCodesByCountry: {
      invoke: {
        src: "getPostalCodesByCountry",
        input: ({ context }) => ({
          countryCode:
            context.selectedLocation?.countryCode ||
            context.placeDetail?.info?.countryCode ||
            "",
        }),
        onDone: {
          target: "modalOpen",
          actions: assign({
            postalCodes: ({ event }) =>
              event.output.map((item: any) => ({
                id: item.ID,
                postalCode: item.PostalCode,
                description: item.Description,
                value: item.PostalCode,
                name: item.Description,
              })),
            errors: ({ context }) => ({ ...context.errors, postalCodes: "" }),
          }),
        },
        onError: {
          target: "modalOpen",
          actions: assign({
            errors: ({ context, event }) => ({
              ...context.errors,
              postalCodes:
                (event.error as Error)?.message ||
                "Failed to fetch postal codes by country",
            }),
          }),
        },
      },
    },
  },

  on: {
    RESET: {
      target: ".idle",
      actions: assign(() => ({
        searchQuery: "",
        searchResults: [],
        selectedLocation: null,
        placeDetail: null,
        locationByCoordinatesData: null,
        isDropdownOpen: false,
        activeModal: null,
        errors: {},
        isGettingLocation: false,
      })),
    },
    SEARCH_SELECT: {
      target: ".loadingPlaceDetails",
      actions: assign({
        searchQuery: "",
        searchResults: [],
        isDropdownOpen: false,
      }),
    },
  },
});

// ==================== REACT HOOK ====================

// Type for the hook return value
export type UseLocationMachineReturn = {
  // State access
  state: any; // Using any temporarily to avoid XState type conflicts
  send: any; // Using any temporarily to avoid XState type conflicts

  // Search state
  searchQuery: string;
  searchResults: AutoCompleteStreet[];
  isSearching: boolean;
  postalCodes: Array<{
    id: string;
    postalCode: string;
    description: string;
    value: string; // For compatibility
    name: string; // For compatibility
  }>;
  setSearchQuery: (query: string) => void;
  handleSelectLocation: (location: AutoCompleteStreet) => void;

  // Location state
  coordinates: Coordinates;
  selectedLocation: SelectedLocation | null;
  placeDetail: PlaceDetailData | null;
  locationByCoordinatesData: LocationByCoordinatesData | null;
  handleGetCurrentLocation: () => void;
  isGettingLocation: boolean;
  handleCoordinateChange: (coords: Coordinates, shouldFetch?: boolean) => void;
  handleFetchPostalCodesByCountry: (countryCode: string) => void;

  // Modal state
  isDropdownOpen: boolean;
  activeModal: "postal" | "detail" | "management" | null;
  isPostalModalOpen: boolean;
  isDetailModalOpen: boolean;
  isManagementModalOpen: boolean;
  openModal: (modal: "postal" | "detail" | "management") => void;
  closeModal: () => void;
  setIsDropdownOpen: (open: boolean) => void;

  // Operations
  handlePostalCodeSelect: (postalCode: string, city?: string) => void;

  // Error handling
  errors: Record<string, string>;
  isSubmitting: boolean; // Added to fix type error
  hasError: boolean;
  clearError: (key: string) => void;
  retry: () => void;
  reset: () => void;

  // Status
  isLoading: boolean;
};

/**
 * React hook wrapper for the XState location machine
 * Provides form integration and maintains the same API as the original useLocationFieldStateMachine
 */
export const useLocationMachine = (
  props: LocationFieldProps
): UseLocationMachineReturn => {
  // Destructure props for useCallback dependencies
  const { defaultCoordinates, onLocationChange } = props;

  // Initialize the XState machine
  const [state, send] = useMachine(locationMachine, {
    input: {
      defaultCoordinates: defaultCoordinates || {
        latitude: -6.2088,
        longitude: 106.8456,
      },
    },
  });

  // Computed state for easy access (MOVED UP)
  const stateValue = state.value!; // Non-null assertion for XState
  const isLoading =
    stateValue === "gettingCurrentLocation" ||
    stateValue === "loadingPlaceDetails" ||
    stateValue === "reverseGeocoding";

  console.log("[POSTAL_DEBUG] State machine status:", {
    stateValue,
    isLoading,
    activeModal: state.context.activeModal,
    hasPlaceDetail: !!state.context.placeDetail,
    hasSelectedLocation: !!state.context.selectedLocation,
  });

  // Store onLocationChange in a ref to avoid infinite loops in effects
  const onLocationChangeRef = useRef(onLocationChange);
  useEffect(() => {
    onLocationChangeRef.current = onLocationChange;
  }, [onLocationChange]);

  // Call onLocationChange callback when place details are loaded
  useEffect(() => {
    console.log("[POSTAL_DEBUG] Callback effect check:", {
      hasPlaceDetail: !!state.context.placeDetail,
      hasCallback: !!onLocationChangeRef.current,
      isLoading,
      stateValue: state.value,
    });

    if (
      state.context.placeDetail &&
      onLocationChangeRef.current &&
      !isLoading
    ) {
      console.log(
        "[POSTAL_DEBUG] placeDetail context updated:",
        state.context.placeDetail
      );
      const { info, coordinates } = state.context.placeDetail;
      // prioritize the address from selectedLocation which should contain the search title
      const addressToUse =
        state.context.selectedLocation?.address || info.address || "";

      const locationData = {
        city: state.context.selectedLocation?.city || info.city,
        country: info.country,
        countryCode: info.countryCode,
        postalCode:
          state.context.selectedLocation?.postalCode || info.postalCode,
        address: addressToUse,
        formattedAddress:
          addressToUse ||
          `${state.context.selectedLocation?.city || info.city}, ${info.country}`,
        coordinates,
      };
      console.log(
        "[POSTAL_DEBUG] addressToUse for formattedAddress:",
        addressToUse
      );
      console.log(
        "[POSTAL_DEBUG] Calling onLocationChange with data:",
        locationData
      );
      onLocationChangeRef.current(locationData);
    } else {
      console.log(
        "[POSTAL_DEBUG] Callback not executed - missing requirements"
      );
    }
  }, [state.context.placeDetail, state.context.selectedLocation, isLoading]);

  // Call onLocationChange callback when reverse geocoding completes
  useEffect(() => {
    // console.log("[DEBUG_LOC] checking reverse geo effect", {
    //   data: state.context.locationByCoordinatesData,
    //   isLoading
    // });

    if (
      state.context.locationByCoordinatesData &&
      onLocationChangeRef.current &&
      !isLoading
    ) {
      const data = state.context.locationByCoordinatesData;
      console.warn("[DEBUG_LOC] reverse geocode update", data);

      onLocationChangeRef.current({
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
        address: data.formattedAddress,
        formattedAddress: data.formattedAddress,
        coordinates: state.context.coordinates,
      });
    }
  }, [
    state.context.locationByCoordinatesData,
    state.context.coordinates,
    isLoading,
  ]);

  // Local state for immediate UI updates (search query shown in input)
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  // Stable callback for the debounced search - won't change between renders
  const triggerSearch = useCallback(
    (query: string) => {
      if (query.length >= 3) {
        send({ type: "SEARCH_START", query } as LocationEvent);
      } else {
        send({ type: "SEARCH_CANCEL" } as LocationEvent);
      }
    },
    [send]
  );

  // Debounced search function - only triggers API after 300ms of no typing
  const debouncedSearch = useDebounceCallback(triggerSearch, 300);

  // Handle search query change with debouncing
  const setSearchQuery = useCallback(
    (query: string) => {
      // Update local state immediately for responsive UI
      setLocalSearchQuery(query);

      // Trigger debounced search
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  // Handle location selection from search results
  const handleSelectLocation = useCallback(
    (location: AutoCompleteStreet) => {
      setLocalSearchQuery(location.title); // Set query to selected title
      send({ type: "SEARCH_SELECT", location } as LocationEvent);
    },
    [send]
  );

  // Handle getting current GPS location
  const handleGetCurrentLocation = useCallback(() => {
    send({ type: "GET_CURRENT_LOCATION" } as LocationEvent);
  }, [send]);

  // Handle coordinate changes (e.g., from map interaction)
  // Handle coordinate changes (e.g., from map interaction)
  const handleCoordinateChange = useCallback(
    (coords: Coordinates, shouldFetch = true) => {
      send({
        type: "COORDINATES_CHANGE",
        coordinates: coords,
        shouldFetch,
      } as LocationEvent);
    },
    [send]
  );

  // Handle modal management
  const openModal = useCallback(
    (modal: "postal" | "detail" | "management") => {
      send({ type: "OPEN_MODAL", modal } as LocationEvent);
    },
    [send]
  );

  const closeModal = useCallback(() => {
    send({ type: "CLOSE_MODAL" } as LocationEvent);
  }, [send]);

  // Handle dropdown state
  const setIsDropdownOpen = useCallback(
    (open: boolean) => {
      send({ type: "SET_DROPDOWN_OPEN", open } as LocationEvent);
    },
    [send]
  );

  // Handle postal code selection
  const handlePostalCodeSelect = useCallback(
    (postalCode: string, city?: string) => {
      send({
        type: "SELECT_POSTAL_CODE",
        postalCode,
        city,
      } as LocationEvent);
    },
    [send]
  );

  // Handle fetching postal codes by country
  const handleFetchPostalCodesByCountry = useCallback(
    (countryCode: string) => {
      send({
        type: "FETCH_POSTAL_CODES_BY_COUNTRY",
        countryCode,
      } as LocationEvent);
    },
    [send]
  );

  // Handle error management
  const clearError = useCallback(
    (key: string) => {
      send({ type: "CLEAR_ERROR", key } as LocationEvent);
    },
    [send]
  );

  const retry = useCallback(() => {
    send({ type: "RETRY" } as LocationEvent);
  }, [send]);

  const reset = useCallback(() => {
    setLocalSearchQuery(""); // Clear local query on reset
    send({ type: "RESET" } as LocationEvent);
  }, [send]);

  const isSearching = stateValue === "searching";
  const hasError = Object.keys(state.context.errors).length > 0;
  const isGettingLocation = stateValue === "gettingCurrentLocation";

  // Modal states
  const isPostalModalOpen = state.context.activeModal === "postal";
  const isDetailModalOpen = state.context.activeModal === "detail";
  const isManagementModalOpen = state.context.activeModal === "management";

  console.log("[POSTAL_DEBUG] Modal states:", {
    activeModal: state.context.activeModal,
    isPostalModalOpen,
    isDetailModalOpen,
    isManagementModalOpen,
  });

  // Public API - maintains compatibility with existing useLocationFieldStateMachine
  return {
    // State access
    state,
    send,

    // Search state
    searchQuery: localSearchQuery,
    searchResults: state.context.searchResults,
    isSearching,
    postalCodes: state.context.postalCodes,
    setSearchQuery,
    handleSelectLocation,

    // Location state
    coordinates: state.context.coordinates,
    selectedLocation: state.context.selectedLocation,
    placeDetail: state.context.placeDetail,
    locationByCoordinatesData: state.context.locationByCoordinatesData,
    handleGetCurrentLocation,
    isGettingLocation,
    handleCoordinateChange,

    // Modal state
    isDropdownOpen: state.context.isDropdownOpen,
    activeModal: state.context.activeModal,
    isPostalModalOpen,
    isDetailModalOpen,
    isManagementModalOpen,
    openModal,
    closeModal,
    setIsDropdownOpen,

    // Operations
    handlePostalCodeSelect,
    handleFetchPostalCodesByCountry,

    // Error handling
    errors: state.context.errors,
    isSubmitting: isLoading, // Added to fix type error, aliased to isLoading
    hasError,
    clearError,
    retry,
    reset,

    // Status
    isLoading,
  };
};

// ==================== REACT PROVIDER ====================

// Context for state machine value
const LocationFieldContext = createContext<{
  machine: UseLocationMachineReturn;
} | null>(null);

export const useLocationFieldContext = () => {
  const context = useContext(LocationFieldContext);
  if (!context) {
    throw new Error(
      "useLocationFieldContext must be used within LocationFieldProvider"
    );
  }
  return context.machine;
};

// Backward compatibility alias
export const useLocationFieldStateMachineContext = useLocationFieldContext;

// Provider component that wraps children with state machine
export const LocationFieldProvider: React.FC<LocationFieldProps> = ({
  children,
  defaultCoordinates,
  onLocationChange,
}) => {
  const machine = useLocationMachine({
    defaultCoordinates,
    onLocationChange,
  });

  return (
    <LocationFieldContext.Provider value={{ machine }}>
      {children}
      {/* Modals are included automatically for all LocationField instances */}
      <PostalCodeModal />
      <LocationDetailModal />
    </LocationFieldContext.Provider>
  );
};

export default LocationFieldProvider;
