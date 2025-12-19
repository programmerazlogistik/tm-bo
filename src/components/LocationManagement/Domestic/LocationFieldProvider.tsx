import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDebounceCallback } from "@muatmuat/hooks/use-debounce-callback";
import { useMachine } from "@xstate/react";
import { useController } from "react-hook-form";
import { assign, fromPromise, setup } from "xstate";

// ==================== REACT PROVIDER ====================

// Import context and hooks from the separate file to avoid circular dependencies
import {
  LocationFieldContext,
  useLocationFieldContext,
  useLocationFieldStateMachineContext,
} from "./LocationFieldContext";
import LocationAPIAdapter from "./api-adapter";
import LocationHiddenFields from "./components/LocationHiddenFields";
import LocationDetailModal from "./modals/LocationDetailModal";
import PostalCodeModal from "./modals/PostalCodeModal";
import type {
  AutoCompleteStreet,
  Coordinates,
  DistrictListItem,
  LocationByCoordinatesData,
  LocationFieldProps,
  LocationFieldProviderProps,
  PlaceDetailData,
  PostalCodeDistrictData,
  PostalCodeListItem,
  RHFLocationData,
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

  // Postal code options derived from place details
  postalCodes: Array<{
    value: string;
    name: string;
    description: string;
  }>;

  // Enhanced data state for postal code search
  postalCodeResults: AutoCompleteStreet[];
  isSearchingPostalCodes: boolean;
  placeDetailsFallbackData: PlaceDetailData | null;

  // Enhanced postal code selection state
  selectedPostalCode: string;
  originalSearchTitle: string; // Original title from autocomplete for formatted address
  originalSearchResult?: any; // Original search result with provinceID, cityID, districtID for API calls
  selectedLocationData?: {
    districtName?: string;
    cityName?: string;
    provinceName?: string;
    description?: string;
  }; // Location data from search result
  districtList: DistrictListItem[];
  postalCodeList: PostalCodeListItem[];
  isLoadingPostalCodeDetails: boolean;
  postalCodeDistrictData: PostalCodeDistrictData | null;
}

type LocationEvent =
  | { type: "SEARCH_START"; query: string }
  | { type: "SEARCH_SELECT"; location: AutoCompleteStreet }
  | { type: "SEARCH_CANCEL" }
  | { type: "GET_CURRENT_LOCATION" }
  | { type: "SET_ORIGINAL_SEARCH_TITLE"; originalSearchTitle: string }
  | {
      type: "COORDINATES_CHANGE";
      coordinates: Coordinates;
      shouldFetch?: boolean;
    }
  | { type: "PLACE_SUCCESS"; placeDetail: PlaceDetailData }
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
  | { type: "SELECT_POSTAL_CODE"; postalCode: string }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_FAILURE"; error?: string }
  | { type: "RESET" }
  // Enhanced events for postal code search and fallback handling
  | { type: "SEARCH_POSTAL_CODES"; query: string }
  | { type: "POSTAL_CODES_SUCCESS"; results: AutoCompleteStreet[] }
  | { type: "POSTAL_CODES_ERROR"; error: string }
  | {
      type: "PLACE_DETAILS_FALLBACK";
      locationId: string;
      originalTitle: string;
    }
  | { type: "COORDINATE_LOOKUP"; coordinates: Coordinates }
  | { type: "COORDINATE_LOOKUP_SUCCESS"; locationDetails: PlaceDetailData }
  | { type: "COORDINATE_LOOKUP_ERROR"; error: string }
  | { type: "OPEN_POSTAL_MODAL_WITH_QUERY"; query: string }
  // Enhanced events for postal code selection flow
  | {
      type: "SELECT_POSTAL_CODE_ENHANCED";
      postalCode: string;
      originalTitle: string;
      originalSearchResult?: any;
      locationData?: {
        districtName?: string;
        cityName?: string;
        provinceName?: string;
        description?: string;
      };
    }
  | { type: "POSTAL_CODE_DETAILS_SUCCESS"; data: PostalCodeDistrictData }
  | { type: "POSTAL_CODE_DETAILS_ERROR"; error: string }
  | { type: "RETRY_POSTAL_CODE_DETAILS" };

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

    // Enhanced actors for postal code search and fallback handling
    searchPostalCodes: fromPromise(
      async ({ input }: { input: { query: string } }) => {
        return await LocationAPIAdapter.searchPostalCodes(input.query);
      }
    ),

    getLocationByCoordinates: fromPromise(
      async ({ input }: { input: { coordinates: Coordinates } }) => {
        return await LocationAPIAdapter.getLocationByCoordinates(
          input.coordinates
        );
      }
    ),

    // Enhanced actor for combined postal code and district data fetching
    fetchPostalCodeAndDistrictData: fromPromise(
      async ({
        input,
      }: {
        input: { postalCode: string; searchResult?: any };
      }) => {
        return await LocationAPIAdapter.fetchPostalCodeAndDistrictData(
          input.postalCode,
          input.searchResult
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
    tempLocationTitle: undefined,

    // Postal code options
    postalCodes: [],

    // Enhanced data state for postal code search
    postalCodeResults: [],
    isSearchingPostalCodes: false,
    placeDetailsFallbackData: null,

    // Enhanced postal code selection state
    selectedPostalCode: "",
    originalSearchTitle: "",
    selectedLocationData: undefined,
    districtList: [],
    postalCodeList: [],
    isLoadingPostalCodeDetails: false,
    postalCodeDistrictData: null,
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
        PLACE_SUCCESS: {
          actions: assign({
            placeDetail: ({ event }) => {
              if (event.type === "PLACE_SUCCESS") {
                return event.placeDetail;
              }
              return null;
            },
            coordinates: ({ event }) => {
              if (event.type === "PLACE_SUCCESS" && event.placeDetail?.coordinates) {
                return event.placeDetail.coordinates;
              }
              return { latitude: -6.2088, longitude: 106.8456 }; // Default coordinates
            },
            selectedLocation: ({ event, context }) => {
              if (event.type === "PLACE_SUCCESS" && event.placeDetail) {
                // Create selectedLocation object from placeDetail
                const { info } = event.placeDetail;
                // Get the search title for formattedAddress
                const searchTitle = (
                  event.placeDetail as PlaceDetailData & {
                    searchTitle?: string;
                  }
                ).searchTitle;

                console.warn(
                  "🏘️ LOCATION_CHANGE_DEBUG: PLACE_SUCCESS - creating selectedLocation from placeDetail:",
                  {
                    info_city: info.city,
                    info_cityId: info.cityId,
                    info_province: info.province,
                    info_provinceId: info.provinceId,
                    info_country: info.country,
                    formattedAddress:
                      context.originalSearchTitle ||
                      searchTitle ||
                      `${info.city}, ${info.country}`,
                  }
                );

                return {
                  address: "", // Empty - user must fill this manually
                  city: info.city,
                  cityId: info.cityId,
                  district: info.district,
                  districtId: Number(info.districtId) || 0, // Convert to number
                  province: info.province,
                  provinceId: info.provinceId,
                  country: info.country,
                  postalCode: info.postalCode,
                  coordinates: info.coordinates,
                  placeId: info.placeId || "",
                  // Priority: originalSearchTitle > searchTitle > fallback
                  formattedAddress:
                    context.originalSearchTitle ||
                    searchTitle ||
                    `${info.city}, ${info.country}`,
                };
              }
              return null;
            },
            // Map and deduplicate postal codes from cityList
            postalCodes: ({ event }) => {
              if (event.type === "PLACE_SUCCESS") {
                const cityList = event.placeDetail.info.cityList || [];
                // Deduplicate by postalCode
                const uniquePostalCodes = Array.from(
                  new Map(
                    cityList.map((item: any) => [item.postalCode, item])
                  ).values()
                ) as Array<{ cityName: string; postalCode: string }>;

                return uniquePostalCodes.map((item) => ({
                  value: item.postalCode,
                  name: item.cityName,
                  description: `${item.cityName} - ${item.postalCode}`,
                }));
              }
              return [];
            },
            errors: ({ context }) => ({ ...context.errors, place: "" }),
          }),
        },
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
        SET_ORIGINAL_SEARCH_TITLE: {
          actions: assign({
            originalSearchTitle: ({ event }) => event.originalSearchTitle,
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
          actions: assign({
            placeDetail: ({ event }) => event.output,
            coordinates: ({ event }) => event.output.coordinates,
            selectedLocation: ({ event, context }) => {
              // Use the Title from the autocomplete event context if available
              // Priority: originalSearchTitle > tempLocationTitle > address > fallback
              const formattedAddress =
                context.originalSearchTitle ||
                context.tempLocationTitle ||
                event.output.info.address ||
                `${event.output.info.city}, ${event.output.info.country}`;

              console.warn(
                "🏘️ LOCATION_CHANGE_DEBUG: gettingPlaceDetailsWithFallback.onDone - creating selectedLocation:",
                {
                  info_city: event.output.info.city,
                  info_cityId: event.output.info.cityId,
                  info_province: event.output.info.province,
                  info_provinceId: event.output.info.provinceId,
                  info_country: event.output.info.country,
                  formattedAddress: formattedAddress,
                }
              );

              return {
                address: "", // Empty - user must fill this manually
                city: event.output.info.city,
                cityId: event.output.info.cityId,
                district: event.output.info.district,
                districtId: Number(event.output.info.districtId) || 0, // Convert to number
                province: event.output.info.province,
                provinceId: event.output.info.provinceId,
                country: event.output.info.country,
                postalCode: event.output.info.postalCode,
                coordinates: event.output.info.coordinates,
                placeId: event.output.info.placeId || "",
                formattedAddress: formattedAddress,
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
                value: item.postalCode,
                name: item.cityName,
                description: `${item.cityName} - ${item.postalCode}`,
              }));
            },
            // Check if we have district data and automatically open postal modal if needed
            activeModal: ({ context, event }) => {
              // Check if we have districts data
              if (!event.output.districtsData?.length) {
                return "postal"; // Open postal modal if no district data
              }
              return context.activeModal; // Keep existing modal state
            },
            errors: ({ context }) => ({ ...context.errors, place: "" }),
          }),
        },
        onError: {
          target: "idle",
          actions: assign(({ context, event }) => {
            // Check if this is a "no district data found" error and open postal modal
            const error = event.error as Error;
            const shouldOpenPostalModal =
              error.message === "No district data found";

            return {
              errors: {
                ...context.errors,
                place: error.message || "Failed to get place details",
              },
              // Open postal modal for fallback when no district data found
              activeModal: shouldOpenPostalModal
                ? "postal"
                : context.activeModal,
            };
          }),
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
            selectedLocation: ({ context, event }) => {
              console.warn(
                "🏘️ POSTAL_DEBUG: SELECT_POSTAL_CODE event:",
                event.postalCode
              );
              console.warn(
                "🏘️ POSTAL_DEBUG: current selectedLocation:",
                context.selectedLocation
              );

              if (context.selectedLocation) {
                // Update existing location with new postal code
                const updated = {
                  ...context.selectedLocation,
                  postalCode: event.postalCode,
                };
                console.warn(
                  "🏘️ POSTAL_DEBUG: Updated existing location:",
                  updated
                );
                return updated;
              } else {
                // Create a minimal location object with just the postal code
                const newLocation = {
                  address: "",
                  city: "",
                  country: "Indonesia",
                  postalCode: event.postalCode,
                  coordinates: { latitude: -6.2088, longitude: 106.8456 }, // Default to Jakarta
                  placeId: "",
                  formattedAddress:
                    context.originalSearchTitle ||
                    context.tempLocationTitle ||
                    event.postalCode,
                };
                console.warn(
                  "🏘️ POSTAL_DEBUG: Created new location:",
                  newLocation
                );
                return newLocation;
              }
            },
          }),
        },

        // Enhanced postal code selection event that triggers API calls
        SELECT_POSTAL_CODE_ENHANCED: {
          target: "loadingPostalCodeDetails",
          actions: assign(({ context, event }) => {
            console.warn(
              "🏘️ POSTAL_DEBUG: SELECT_POSTAL_CODE_ENHANCED - Setting originalSearchTitle:",
              event.originalTitle
            );
            console.warn(
              "🏘️ POSTAL_DEBUG: Location data from search result:",
              event.locationData
            );
            console.warn(
              "🏘️ POSTAL_DEBUG: Original search result with IDs:",
              event.originalSearchResult
            );
            console.warn(
              "🏘️ POSTAL_DEBUG: Current context.originalSearchTitle before:",
              context.originalSearchTitle
            );

            return {
              selectedPostalCode: event.postalCode,
              originalSearchTitle: event.originalTitle,
              originalSearchResult: event.originalSearchResult,
              selectedLocationData: event.locationData,
              activeModal: null, // Close modal immediately when starting enhanced flow
              errors: { ...context.errors, postalCode: "" },
            };
          }),
        },
      },
    },

    // Enhanced states for postal code search and fallback handling
    searchingPostalCodes: {
      invoke: {
        src: "searchPostalCodes",
        input: ({ context }) => ({ query: context.searchQuery }),
        onDone: {
          target: "modalOpen",
          actions: assign({
            postalCodeResults: ({ event }) => event.output,
            activeModal: "postal",
            errors: ({ context }) => ({ ...context.errors, postalCode: "" }),
          }),
        },
        onError: {
          target: "idle",
          actions: assign(({ context, event }) => ({
            errors: {
              ...context.errors,
              postalCode:
                (event.error as Error)?.message ||
                "Failed to search postal codes",
            },
          })),
        },
      },
      entry: assign({
        isSearchingPostalCodes: true,
        errors: ({ context }) => ({ ...context.errors, postalCode: "" }),
      }),
      exit: assign({
        isSearchingPostalCodes: false,
      }),
    },

    gettingLocationByCoordinates: {
      invoke: {
        src: "getLocationByCoordinates",
        input: ({ context }) => ({ coordinates: context.coordinates }),
        onDone: {
          target: "idle",
          actions: assign({
            placeDetail: ({ event }) => event.output,
            locationByCoordinatesData: ({ event }) => ({
              formattedAddress: event.output.info.address || "",
              city: event.output.info.city,
              province: event.output.info.city, // Using city as province since we don't have province data
              postalCode: event.output.info.postalCode,
              isInternationalPostal: false,
              country: event.output.info.country,
              countryCode: undefined,
            }),
            errors: ({ context }) => ({ ...context.errors, geocode: "" }),
          }),
        },
        onError: {
          target: "idle",
          actions: assign(({ context, event }) => ({
            errors: {
              ...context.errors,
              geocode:
                (event.error as Error)?.message ||
                "Failed to get location by coordinates",
            },
          })),
        },
      },
    },

    // Enhanced state for postal code and district data loading
    loadingPostalCodeDetails: {
      invoke: {
        src: "fetchPostalCodeAndDistrictData",
        input: ({ context }) => ({
          postalCode: context.selectedPostalCode,
          searchResult: context.originalSearchResult,
        }),
        onDone: {
          target: "idle",
          actions: assign(({ context, event }) => {
            console.warn(
              "🏘️ POSTAL_DEBUG: Postal code details loaded successfully:",
              event.output
            );
            console.warn(
              "🏘️ POSTAL_DEBUG: context.originalSearchTitle at success:",
              context.originalSearchTitle
            );
            console.warn(
              "🏘️ POSTAL_DEBUG: context.selectedLocationData:",
              context.selectedLocationData
            );

            const data = event.output;
            const districtsData = data.districtsData;
            const locationData = context.selectedLocationData;

            // Extract district and province info from district list or search result
            const getDistrictInfo = () => {
              // First try to get from search result (has exact IDs)
              if (context.originalSearchResult) {
                return {
                  districtId:
                    Number(context.originalSearchResult.districtID) || 0,
                  provinceId:
                    Number(context.originalSearchResult.provinceID) || 0,
                  cityId: Number(context.originalSearchResult.cityID) || 0,
                };
              }

              // Then try to get from district list
              if (data.districtList?.length > 0) {
                const districtInfo = data.districtList[0]; // Use first district as default
                return {
                  districtId: Number(districtInfo.districtID) || 0,
                  provinceId: Number(districtInfo.provinceID) || 0,
                  cityId: Number(districtInfo.cityID) || 0,
                };
              }

              return {};
            };

            const districtInfo = getDistrictInfo();

            // Update selectedLocation - prioritize search result data over district API data
            const updatedSelectedLocation = {
              // Start with existing location or create new one
              ...(context.selectedLocation || {
                address: "",
                city: "",
                country: "Indonesia",
                placeId: "",
                coordinates: { latitude: -6.2088, longitude: 106.8456 },
              }),
              // Always update these fields
              postalCode: context.selectedPostalCode,
              formattedAddress: (() => {
                const titleToUse =
                  context.originalSearchTitle ||
                  context.selectedLocation?.formattedAddress ||
                  "";
                console.warn(
                  "🏘️ POSTAL_DEBUG: Setting formattedAddress with:",
                  {
                    originalSearchTitle: context.originalSearchTitle,
                    currentFormattedAddress:
                      context.selectedLocation?.formattedAddress,
                    finalChoice: titleToUse,
                  }
                );
                return titleToUse;
              })(),

              // Use search result location data if available (more reliable than district API)
              city:
                locationData?.cityName ||
                districtsData?.info?.city ||
                context.selectedLocation?.city ||
                "",
              cityId:
                districtInfo.cityId ||
                Number(context.selectedLocation?.cityId) ||
                0,
              district:
                locationData?.districtName ||
                data.districtList?.[0]?.district ||
                context.selectedLocation?.district,
              districtId:
                districtInfo.districtId ||
                Number(context.selectedLocation?.districtId) ||
                0,
              province:
                locationData?.provinceName ||
                data.districtList?.[0]?.provinceName ||
                context.selectedLocation?.province,
              provinceId:
                districtInfo.provinceId ||
                Number(context.selectedLocation?.provinceId) ||
                0,
              country: "Indonesia", // Always Indonesia for domestic postal codes
              // Only use district API coordinates if search data doesn't have them
              coordinates: districtsData?.coordinates ||
                context.selectedLocation?.coordinates || {
                  latitude: -6.2088,
                  longitude: 106.8456,
                },
            };

            console.warn(
              "🏘️ LOCATION_CHANGE_DEBUG: Created updatedSelectedLocation:",
              updatedSelectedLocation
            );
            console.warn("🏘️ LOCATION_CHANGE_DEBUG: Province data sources:", {
              locationData_provinceName: locationData?.provinceName,
              districtList_provinceName: data.districtList?.[0]?.provinceName,
              context_province: context.selectedLocation?.province,
              districtInfo_provinceId: districtInfo.provinceId,
            });

            // Update postal codes dropdown options
            const updatedPostalCodes = data.postalCodes.map(
              (postal: PostalCodeListItem) => ({
                value: postal.PostalCode,
                name: postal.Description,
                description: `${postal.Description} - ${postal.PostalCode}`,
              })
            );

            return {
              postalCodeDistrictData: data,
              districtList: data.districtList,
              postalCodeList: data.postalCodes,
              postalCodes: updatedPostalCodes,
              selectedLocation: updatedSelectedLocation,
              // Update placeDetail if we have districts data
              ...(districtsData && {
                placeDetail: {
                  ...districtsData,
                  searchTitle: context.originalSearchTitle,
                },
              }),
              isLoadingPostalCodeDetails: false,
              errors: {
                ...context.errors,
                postalCode: "",
              },
            };
          }),
        },
        onError: [
          {
            // Check if this is a critical postal code API failure
            guard: ({ event }) => {
              const errorMessage = (event.error as Error)?.message || "";
              return (
                errorMessage.includes("postal code") ||
                errorMessage.includes("critical")
              );
            },
            target: "modalOpen",
            actions: assign(({ context, event }) => {
              console.warn(
                "🏘️ POSTAL_DEBUG: Critical postal code API failure:",
                event.error
              );

              const errorMessage =
                (event.error as Error)?.message ||
                "Failed to load postal code details";
              const userFriendlyMessage = errorMessage.includes("404")
                ? "Kode pos tidak ditemukan. Silakan coba lagi."
                : errorMessage.includes("network")
                  ? "Koneksi gagal. Silakan periksa internet Anda."
                  : `Gagal memuat data: ${errorMessage}`;

              return {
                isLoadingPostalCodeDetails: false,
                activeModal: "postal", // Reopen modal on critical error
                errors: {
                  ...context.errors,
                  postalCode: userFriendlyMessage,
                },
              };
            }),
          },
          {
            // Non-critical failures (like district fetch issues) - continue to idle
            target: "idle",
            actions: assign(({ context, event }) => {
              console.warn(
                "🏘️ POSTAL_DEBUG: Non-critical failure, continuing with available data:",
                event.error
              );

              // Create a basic selectedLocation with just the original search title
              const basicSelectedLocation = {
                ...(context.selectedLocation || {
                  address: "",
                  city: "",
                  country: "Indonesia",
                  placeId: "",
                  coordinates: { latitude: -6.2088, longitude: 106.8456 },
                }),
                postalCode: context.selectedPostalCode,
                formattedAddress: context.originalSearchTitle || "",
              };

              console.warn(
                "🏘️ POSTAL_DEBUG: Created basicSelectedLocation due to non-critical error:",
                basicSelectedLocation
              );

              return {
                selectedLocation: basicSelectedLocation,
                isLoadingPostalCodeDetails: false,
                // Don't set error since we're continuing
                errors: {
                  ...context.errors,
                  postalCode: "", // Clear any previous postal code error
                },
              };
            }),
          },
        ],
      },
      entry: assign({
        isLoadingPostalCodeDetails: true,
        errors: ({ context }) => ({ ...context.errors, postalCode: "" }),
      }),
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
        postalCodeResults: [],
        isSearchingPostalCodes: false,
        placeDetailsFallbackData: null,
        // Reset enhanced postal code selection state
        selectedPostalCode: "",
        originalSearchTitle: "",
        selectedLocationData: undefined,
        districtList: [],
        postalCodeList: [],
        isLoadingPostalCodeDetails: false,
        postalCodeDistrictData: null,
      })),
    },
    SEARCH_SELECT: {
      target: ".loadingPlaceDetails",
      actions: assign({
        searchQuery: "",
        searchResults: [],
        isDropdownOpen: false,
        originalSearchTitle: "", // Reset strict title priority on new selection
      }),
    },

    // Enhanced event handlers for postal code search and fallback handling
    SEARCH_POSTAL_CODES: {
      target: ".searchingPostalCodes",
      actions: assign({
        searchQuery: ({ event }) => event.query,
        errors: ({ context }) => ({ ...context.errors, postalCode: "" }),
      }),
    },

    OPEN_POSTAL_MODAL_WITH_QUERY: {
      target: ".searchingPostalCodes",
      actions: assign({
        searchQuery: ({ event }) => event.query,
        errors: ({ context }) => ({ ...context.errors, postalCode: "" }),
      }),
    },

    COORDINATE_LOOKUP: {
      target: ".gettingLocationByCoordinates",
      actions: assign({
        coordinates: ({ event }) => event.coordinates,
        errors: ({ context }) => ({ ...context.errors, geocode: "" }),
      }),
    },

    // Global event handler for enhanced postal code selection
    SELECT_POSTAL_CODE_ENHANCED: {
      target: ".loadingPostalCodeDetails",
      actions: assign({
        selectedPostalCode: ({ event }) => event.postalCode,
        originalSearchTitle: ({ event }) => event.originalTitle,
        activeModal: null, // Close modal immediately when starting enhanced flow
        errors: ({ context }) => ({ ...context.errors, postalCode: "" }),
      }),
    },

    RETRY_POSTAL_CODE_DETAILS: {
      target: ".loadingPostalCodeDetails",
      actions: assign({
        errors: ({ context }) => ({ ...context.errors, postalCode: "" }),
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
  postalCodes: Array<{ value: string; name: string; description: string }>;
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
  handlePostalCodeSelect: (postalCode: string) => void;

  // Enhanced operations for postal code search and fallback handling
  postalCodeResults: AutoCompleteStreet[];
  isSearchingPostalCodes: boolean;
  searchPostalCodes: (query: string) => void;
  getLocationByCoordinates: (coordinates: Coordinates) => void;

  // Enhanced postal code selection flow
  selectedPostalCode: string;
  originalSearchTitle: string;
  selectedLocationData?: {
    districtName?: string;
    cityName?: string;
    provinceName?: string;
    description?: string;
  };
  districtList: DistrictListItem[];
  postalCodeList: PostalCodeListItem[];
  isLoadingPostalCodeDetails: boolean;
  postalCodeDistrictData: PostalCodeDistrictData | null;
  handleEnhancedPostalCodeSelect: (
    postalCode: string,
    originalTitle: string,
    locationData?: {
      districtName?: string;
      cityName?: string;
      provinceName?: string;
      description?: string;
    },
    originalSearchResult?: any
  ) => void;

  // RHF integration
  updateLocationField?: (fieldName: string, value: any) => void;
  registerUpdater: (fn: (fieldName: string, value: any) => void) => void;
  retryPostalCodeDetails: () => void;

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
  props: LocationFieldProps | LocationFieldProviderProps
): UseLocationMachineReturn => {
  // Destructure props for useCallback dependencies
  const { defaultCoordinates, onLocationChange, control } = props as any;

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
    stateValue === "reverseGeocoding" ||
    stateValue === "loadingPostalCodeDetails";

  // Store onLocationChange in a ref to avoid infinite loops in effects
  const onLocationChangeRef = useRef(onLocationChange);
  useEffect(() => {
    onLocationChangeRef.current = onLocationChange;
  }, [onLocationChange]);

  // RHF integration - create updateLocationField function
  // We use a Ref to allow external components to register the updater function
  // while maintaining a stable function reference for internal effects
  const updateLocationFieldRef = useRef<
    ((fieldName: string, value: any) => void) | null
  >(null);

  const registerUpdater = useCallback(
    (fn: (fieldName: string, value: any) => void) => {
      updateLocationFieldRef.current = fn;
    },
    []
  );

  const updateLocationField = useCallback((fieldName: string, value: any) => {
    if (updateLocationFieldRef.current) {
      updateLocationFieldRef.current(fieldName, value);
    } else {
      console.warn(
        "[LocationFieldProvider] No updater registered for:",
        fieldName,
        value
      );
    }
  }, []);

  // Call onLocationChange callback when place details are loaded
  useEffect(() => {
    if (state.context.placeDetail && !isLoading) {
      console.warn(
        "[PINPOINT_DEBUG] placeDetail context updated:",
        state.context.placeDetail
      );
      const { info, coordinates } = state.context.placeDetail;

      // Enhanced formatted address logic with priority order
      const formattedAddressToUse =
        state.context.originalSearchTitle || // Original search title from enhanced flow
        state.context.selectedLocation?.formattedAddress || // Selected location title
        (state.context.placeDetail as any)?.searchTitle || // Place detail search title
        `${info.city}, ${info.country}`; // Fallback

      console.warn(
        "[SYNC_DEBUG_V2] formattedAddressToUse calculated:",
        formattedAddressToUse,
        {
          originalSearchTitle: state.context.originalSearchTitle,
          tempLocationTitle: state.context.tempLocationTitle,
          placeDetailSearchTitle: (state.context.placeDetail as any)
            ?.searchTitle,
          fallback: `${info.city}, ${info.country}`,
        }
      );

      console.warn(
        "🏘️ LOCATION_CHANGE_DEBUG: formattedAddressToUse:",
        formattedAddressToUse
      );
      console.warn(
        "🏘️ LOCATION_CHANGE_DEBUG: state.context.originalSearchTitle:",
        state.context.originalSearchTitle
      );
      console.warn(
        "🏘️ LOCATION_CHANGE_DEBUG: state.context.selectedLocation?.formattedAddress:",
        state.context.selectedLocation?.formattedAddress
      );
      console.warn(
        "🏘️ LOCATION_CHANGE_DEBUG: info.city, info.country:",
        `${info.city}, ${info.country}`
      );

      // Get detailed location info from selectedLocation
      const selectedLocation = state.context.selectedLocation;

      const locationData = {
        city: info.city,
        cityId: selectedLocation?.cityId,
        district: selectedLocation?.district,
        districtId: selectedLocation?.districtId,
        province: selectedLocation?.province,
        provinceId: selectedLocation?.provinceId,
        country: info.country,
        postalCode: state.context.selectedPostalCode || info.postalCode,
        address: "", // Empty - user must fill this manually
        formattedAddress: formattedAddressToUse,
        coordinates,
        // Enhanced data for consuming components
        districtList: state.context.districtList,
        postalCodeList: state.context.postalCodeList,
        postalCodeDistrictData: state.context.postalCodeDistrictData,
      };

      // RHF Integration - update form fields directly if control is available
      if (control) {
        // DON'T update addressDetail automatically
        // This preserves user input when they select a location
        // The field should only be cleared explicitly by the user
        // updateLocationField("addressDetail", ""); // REMOVED: Don't auto-clear user input

        updateLocationField("addressFormatted", formattedAddressToUse);
        updateLocationField("coordinates.latitude", coordinates.latitude);
        updateLocationField("coordinates.longitude", coordinates.longitude);
        updateLocationField("city.cityId", selectedLocation?.cityId || 0);
        updateLocationField("city.cityName", info.city || "");
        updateLocationField(
          "province.provinceId",
          selectedLocation?.provinceId || 0
        );
        updateLocationField(
          "province.provinceName",
          selectedLocation?.province || ""
        );
        updateLocationField(
          "district.districtId",
          selectedLocation?.districtId || 0
        );
        updateLocationField(
          "district.districtName",
          selectedLocation?.district || ""
        );
        updateLocationField(
          "postalCode",
          state.context.selectedPostalCode || info.postalCode || ""
        );
      }

      // Call legacy callback if available
      if (onLocationChangeRef.current) {
        console.warn(
          "[PINPOINT_DEBUG] Address left empty for manual user input"
        );
        console.warn(
          "🏘️ LOCATION_CHANGE_DEBUG: Calling onLocationChange with data:",
          locationData
        );
        onLocationChangeRef.current(locationData);
      }
    }
  }, [
    state.context.placeDetail,
    state.context.selectedLocation,
    state.context.selectedPostalCode,
    state.context.originalSearchTitle,
    state.context.tempLocationTitle,
    state.context.districtList,
    state.context.postalCodeList,
    state.context.postalCodeDistrictData,
    isLoading,
    control,
    updateLocationField,
  ]);

  // Enhanced effect for postal code selection flow (handles case where placeDetail might be null)
  useEffect(() => {
    if (
      !isLoading &&
      state.context.selectedPostalCode &&
      state.context.originalSearchTitle &&
      // Trigger when we have postal code data but no placeDetail (typical for enhanced flow)
      !state.context.placeDetail
    ) {
      console.warn(
        "🏘️ POSTAL_DEBUG: Enhanced postal code selection effect triggered"
      );

      const locationData = {
        city:
          state.context.selectedLocationData?.cityName ||
          state.context.selectedLocation?.city ||
          "",
        country: "Indonesia", // Always Indonesia for domestic postal codes
        postalCode: state.context.selectedPostalCode,
        address: "", // Empty - user must fill this manually
        formattedAddress: state.context.originalSearchTitle,
        coordinates: state.context.selectedLocation?.coordinates || {
          latitude: -6.2088,
          longitude: 106.8456,
        },
        // Enhanced data for consuming components
        districtList: state.context.districtList,
        postalCodeList: state.context.postalCodeList,
        postalCodeDistrictData: state.context.postalCodeDistrictData,
        // Include rich location data from search results
        ...(state.context.selectedLocationData && {
          locationInfo: {
            districtName: state.context.selectedLocationData.districtName,
            cityName: state.context.selectedLocationData.cityName,
            provinceName: state.context.selectedLocationData.provinceName,
            description: state.context.selectedLocationData.description,
          },
        }),
      };

      // RHF Integration - update form fields directly if control is available
      if (control) {
        const selectedLocationData = state.context.selectedLocationData;
        const selectedLocation = state.context.selectedLocation;

        // DON'T update addressDetail automatically
        // updateLocationField("addressDetail", ""); // REMOVED: Don't auto-clear user input

        updateLocationField(
          "addressFormatted",
          state.context.originalSearchTitle
        );
        updateLocationField(
          "coordinates.latitude",
          locationData.coordinates.latitude
        );
        updateLocationField(
          "coordinates.longitude",
          locationData.coordinates.longitude
        );
        updateLocationField("city.cityId", 0); // Not available in postal code flow
        updateLocationField(
          "city.cityName",
          selectedLocationData?.cityName || selectedLocation?.city || ""
        );
        updateLocationField("province.provinceId", 0); // Not available in postal code flow
        updateLocationField(
          "province.provinceName",
          selectedLocationData?.provinceName || selectedLocation?.province || ""
        );
        updateLocationField("district.districtId", 0); // Not available in postal code flow
        updateLocationField(
          "district.districtName",
          selectedLocationData?.districtName || selectedLocation?.district || ""
        );
        updateLocationField("postalCode", state.context.selectedPostalCode);
      }

      // Call legacy callback if available
      if (onLocationChangeRef.current) {
        console.warn(
          "🏘️ POSTAL_DEBUG: Calling onLocationChange with enhanced postal code data:",
          locationData
        );
        onLocationChangeRef.current(locationData);
      }
    }
  }, [
    state.context.placeDetail,
    state.context.selectedPostalCode,
    state.context.originalSearchTitle,
    state.context.selectedLocation,
    state.context.selectedLocationData,
    state.context.districtList,
    state.context.postalCodeList,
    state.context.postalCodeDistrictData,
    stateValue,
    isLoading,
    control,
    updateLocationField,
  ]);

  // Call onLocationChange callback when reverse geocoding completes
  useEffect(() => {
    // console.log("[DEBUG_LOC] checking reverse geo effect", {
    //   data: state.context.locationByCoordinatesData,
    //   isLoading
    // });

    if (state.context.locationByCoordinatesData && !isLoading) {
      const data = state.context.locationByCoordinatesData;
      console.warn("[DEBUG_LOC] reverse geocode update", data);

      // RHF Integration - update form fields directly if control is available
      if (control) {
        // DON'T update addressDetail automatically
        // updateLocationField("addressDetail", ""); // REMOVED: Don't auto-clear user input

        updateLocationField("addressFormatted", data.formattedAddress);
        updateLocationField(
          "coordinates.latitude",
          state.context.coordinates.latitude
        );
        updateLocationField(
          "coordinates.longitude",
          state.context.coordinates.longitude
        );
        updateLocationField("city.cityId", 0); // Not available from reverse geocoding
        updateLocationField("city.cityName", data.city || "");
        updateLocationField("province.provinceId", 0); // Not available from reverse geocoding
        updateLocationField("province.provinceName", data.city || ""); // Using city as province fallback
        updateLocationField("district.districtId", 0); // Not available from reverse geocoding
        updateLocationField("district.districtName", ""); // Not available from reverse geocoding
        updateLocationField("postalCode", data.postalCode || "");
      }

      // Call legacy callback if available
      if (onLocationChangeRef.current) {
        onLocationChangeRef.current({
          city: data.city,
          country: data.country,
          postalCode: data.postalCode,
          address: data.formattedAddress,
          formattedAddress: data.formattedAddress,
          coordinates: state.context.coordinates,
        });
      }
    }
  }, [
    state.context.locationByCoordinatesData,
    state.context.coordinates,
    isLoading,
    control,
    updateLocationField,
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
      console.warn(
        "[SYNC_DEBUG_V2] handleSelectLocation called with:",
        location
      );
      // Don't setLocalSearchQuery here - let it update via RHF prop sync to avoid race conditions
      // setLocalSearchQuery(location.title);
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
    (postalCode: string) => {
      send({ type: "SELECT_POSTAL_CODE", postalCode } as LocationEvent);
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

  // Add missing methods for postal code search and fallback handling
  const searchPostalCodes = useCallback(
    (query: string) => {
      send({ type: "SEARCH_POSTAL_CODES", query } as LocationEvent);
    },
    [send]
  );

  const getLocationByCoordinates = useCallback(
    (coordinates: Coordinates) => {
      send({ type: "COORDINATE_LOOKUP", coordinates } as LocationEvent);
    },
    [send]
  );

  // Enhanced postal code selection methods
  const handleEnhancedPostalCodeSelect = useCallback(
    (
      postalCode: string,
      originalTitle: string,
      locationData?: {
        districtName?: string;
        cityName?: string;
        provinceName?: string;
        description?: string;
      },
      originalSearchResult?: any
    ) => {
      send({
        type: "SELECT_POSTAL_CODE_ENHANCED",
        postalCode,
        originalTitle,
        locationData,
        originalSearchResult,
      } as LocationEvent);
    },
    [send]
  );

  const retryPostalCodeDetails = useCallback(() => {
    send({ type: "RETRY_POSTAL_CODE_DETAILS" } as LocationEvent);
  }, [send]);

  const isSearching = stateValue === "searching";
  const hasError = Object.keys(state.context.errors).length > 0;
  const isGettingLocation = stateValue === "gettingCurrentLocation";

  // Modal states
  const isPostalModalOpen = state.context.activeModal === "postal";
  const isDetailModalOpen = state.context.activeModal === "detail";
  const isManagementModalOpen = state.context.activeModal === "management";

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
    registerUpdater,

    // Enhanced operations for postal code search and fallback handling
    postalCodeResults: state.context.postalCodeResults,
    isSearchingPostalCodes: stateValue === "searchingPostalCodes",
    searchPostalCodes,
    getLocationByCoordinates,

    // Enhanced postal code selection flow
    selectedPostalCode: state.context.selectedPostalCode,
    originalSearchTitle: state.context.originalSearchTitle,
    selectedLocationData: state.context.selectedLocationData,
    districtList: state.context.districtList,
    postalCodeList: state.context.postalCodeList,
    isLoadingPostalCodeDetails: state.context.isLoadingPostalCodeDetails,
    postalCodeDistrictData: state.context.postalCodeDistrictData,
    handleEnhancedPostalCodeSelect,
    retryPostalCodeDetails,

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

// Re-export for backward compatibility
export { useLocationFieldContext, useLocationFieldStateMachineContext };

// Provider component that wraps children with state machine (legacy version)
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

// New RHF-integrated provider component
export const RHFLocationFieldProvider: React.FC<
  LocationFieldProviderProps & {
    initialLocationData?: RHFLocationData;
  }
> = ({ children, control, defaultCoordinates, initialLocationData }) => {
  // Store pending updates to be processed by LocationFieldUpdater components
  const [pendingUpdates, setPendingUpdates] = useState<Record<string, any>>({});

  const machine = useLocationMachine({
    control,
    defaultCoordinates,
  });

  // Track if we've already initialized to prevent re-initialization on navigation
  const hasInitialized = React.useRef(false);

  // Reset initialization flag when initialLocationData changes
  React.useEffect(() => {
    if (initialLocationData) {
      console.warn("🗺️ FORM_DEBUG - Resetting hasInitialized flag due to new initialLocationData");
      hasInitialized.current = false;
    }
  }, [initialLocationData]);

  // Initialize with existing location data if provided
  React.useEffect(() => {
    if (initialLocationData && machine.send && !hasInitialized.current) {
      console.warn(
        "🗺️ FORM_DEBUG - Starting initialization with initialLocationData:",
        initialLocationData
      );

      // Mark as initialized to prevent re-initialization
      hasInitialized.current = true;

      // First, set the originalSearchTitle in context
      if (initialLocationData.addressFormatted) {
        machine.send({
          type: "SET_ORIGINAL_SEARCH_TITLE",
          originalSearchTitle: initialLocationData.addressFormatted
        });
      }

      // Set the location data directly in the form using assign action
      const locationUpdates: any = {};

      console.warn("🗺️ FORM_DEBUG - Checking initialLocationData for addressDetail:", {
        addressDetail: initialLocationData.addressDetail,
        addressDetailType: typeof initialLocationData.addressDetail,
        addressDetailLength: initialLocationData.addressDetail?.length,
      });

      // Always set addressDetail, even if empty (it might be intentionally empty)
      if (initialLocationData.addressDetail !== undefined) {
        locationUpdates.addressDetail = initialLocationData.addressDetail;
      }
      if (initialLocationData.addressFormatted) {
        locationUpdates.addressFormatted = initialLocationData.addressFormatted;
      }
      if (initialLocationData.coordinates) {
        locationUpdates["coordinates.latitude"] =
          initialLocationData.coordinates.latitude;
        locationUpdates["coordinates.longitude"] =
          initialLocationData.coordinates.longitude;
      }
      if (initialLocationData.city) {
        locationUpdates["city.cityId"] = initialLocationData.city.cityId;
        locationUpdates["city.cityName"] = initialLocationData.city.cityName;
      }
      if (initialLocationData.province) {
        locationUpdates["province.provinceId"] =
          initialLocationData.province.provinceId;
        locationUpdates["province.provinceName"] =
          initialLocationData.province.provinceName;
      }
      if (initialLocationData.district) {
        locationUpdates["district.districtId"] =
          initialLocationData.district.districtId;
        locationUpdates["district.districtName"] =
          initialLocationData.district.districtName;
      }
      if (initialLocationData.postalCode) {
        locationUpdates.postalCode = initialLocationData.postalCode;
      }

      console.warn(
        "🗺️ FORM_DEBUG - Applying location updates:",
        locationUpdates
      );
      // Apply all updates at once
      if (Object.keys(locationUpdates).length > 0) {
        machine.send({ type: "BULK_UPDATE", updates: locationUpdates });
      }

      // Create districts data from initial location data
      const districtsData = initialLocationData.district
        ? [
            {
              district: initialLocationData.district.districtName,
              districtID: initialLocationData.district.districtId,
              cityName: initialLocationData.city?.cityName || "",
              cityID: initialLocationData.city?.cityId || 0,
              provinceName: initialLocationData.province?.provinceName || "",
              provinceID: initialLocationData.province?.provinceId || 0,
              postalCodes: initialLocationData.postalCode
                ? [
                    {
                      postalCode: initialLocationData.postalCode,
                      description: `${initialLocationData.district.districtName}, ${initialLocationData.city?.cityName || ""}`,
                    },
                  ]
                : [],
            },
          ]
        : [];

      // Also trigger place detail loading to populate district options
      const placeDetailData = {
        coordinates: initialLocationData.coordinates || {
          latitude: -6.2088,
          longitude: 106.8456,
        },
        info: {
          city: initialLocationData.city?.cityName || "",
          cityId: initialLocationData.city?.cityId || 0,
          district: initialLocationData.district?.districtName || "",
          districtId: initialLocationData.district?.districtId || 0,
          province: initialLocationData.province?.provinceName || "",
          provinceId: initialLocationData.province?.provinceId || 0,
          country: "Indonesia",
          postalCode: initialLocationData.postalCode || "",
          address: initialLocationData.addressDetail || "",
          coordinates: initialLocationData.coordinates || {
            latitude: -6.2088,
            longitude: 106.8456,
          },
        },
        districtsData: districtsData, // Use created districts data
        // Include the original formatted address
        searchTitle: initialLocationData.addressFormatted || `${initialLocationData.city?.cityName || ""}, Indonesia`,
      };

      console.warn(
        "🗺️ FORM_DEBUG - Sending PLACE_SUCCESS with districts data:",
        districtsData
      );
      machine.send({
        type: "PLACE_SUCCESS",
        placeDetail: placeDetailData,
      });
    } else {
      console.warn(
        "🗺️ FORM_DEBUG - Skipping initialization, conditions:",
        {
          hasInitialData: !!initialLocationData,
          hasMachineSend: !!machine?.send,
          alreadyInitialized: hasInitialized.current,
        }
      );
    }
  }, [initialLocationData, machine.send]);

  // Override updateLocationField to use our state management
  React.useEffect(() => {
    // Register our updater function with the machine
    // This allows the machine to update RHF state without closure issues
    machine.registerUpdater((fieldName: string, value: any) => {
      // Store the update in state for LocationFieldUpdater to process
      setPendingUpdates((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    });
  }, [machine, machine.registerUpdater]);

  // Component that uses useController to update form fields
  const LocationFieldUpdater = ({ fieldName }: { fieldName: string }) => {
    const { field } = useController({
      name: `location.${fieldName}`,
      control,
    });

    React.useEffect(() => {
      if (pendingUpdates[fieldName] !== undefined) {
        console.warn(
          "🗺️ FORM_DEBUG - Updating field:",
          fieldName,
          pendingUpdates[fieldName]
        );
        field.onChange(pendingUpdates[fieldName]);
        // Clear the pending update
        setPendingUpdates((prev) => {
          const newUpdates = { ...prev };
          delete newUpdates[fieldName];
          return newUpdates;
        });
      }
    }, [field, fieldName, pendingUpdates[fieldName]]);

    return null;
  };

  // Convert machine state to RHF-compatible format
  const locationData: RHFLocationData | null = useMemo(() => {
    if (!machine.selectedLocation) return null;

    return {
      addressDetail: "", // Always empty for manual fill
      addressFormatted: machine.selectedLocation.formattedAddress || "",
      coordinates: {
        latitude: machine.selectedLocation.coordinates.latitude,
        longitude: machine.selectedLocation.coordinates.longitude,
      },
      city: {
        cityId: machine.selectedLocation.cityId || 0,
        cityName: machine.selectedLocation.city || "",
      },
      province: {
        provinceId: machine.selectedLocation.provinceId || 0,
        provinceName: machine.selectedLocation.province || "",
      },
      district: {
        districtId: machine.selectedLocation.districtId || 0,
        districtName: machine.selectedLocation.district || "",
      },
      postalCode: machine.selectedLocation.postalCode || "",
    };
  }, [machine.selectedLocation]);

  return (
    <LocationFieldContext.Provider value={{ machine }}>
      {children}
      {/* Hidden inputs for RHF integration - using Controller components */}
      <LocationHiddenFields control={control} locationData={locationData} />
      {/* Location field updaters for dynamic field updates */}
      <LocationFieldUpdater fieldName="addressDetail" />
      <LocationFieldUpdater fieldName="addressFormatted" />
      <LocationFieldUpdater fieldName="coordinates.latitude" />
      <LocationFieldUpdater fieldName="coordinates.longitude" />
      <LocationFieldUpdater fieldName="city.cityId" />
      <LocationFieldUpdater fieldName="city.cityName" />
      <LocationFieldUpdater fieldName="province.provinceId" />
      <LocationFieldUpdater fieldName="province.provinceName" />
      <LocationFieldUpdater fieldName="district.districtId" />
      <LocationFieldUpdater fieldName="district.districtName" />
      <LocationFieldUpdater fieldName="postalCode" />
      {/* Modals remain the same */}
      <PostalCodeModal />
      <LocationDetailModal />
    </LocationFieldContext.Provider>
  );
};

export default LocationFieldProvider;
