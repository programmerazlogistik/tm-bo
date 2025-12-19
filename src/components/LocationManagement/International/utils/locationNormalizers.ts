import {
  AddressComponents,
  Coordinates,
  LocationDetails,
  LocationSuggestion,
  SelectedLocation,
} from "../types";

export const normalizeAutoCompleteToSelectedLocation = (
  street: LocationSuggestion,
  placeDetail?: LocationDetails
): Partial<SelectedLocation> => {
  if (!placeDetail) {
    return {
      address: street.title,
      placeId: street.id,
    };
  }

  return {
    address: street.title,
    city: placeDetail.info.city,
    country: placeDetail.info.country,
    postalCode: placeDetail.info.postalCode,
    placeId: street.id,
    coordinates: placeDetail.coordinates,
  };
};

export const normalizeCoordinatesToSelectedLocation = (
  data: AddressComponents
): Partial<SelectedLocation> => {
  return {
    address: data.formattedAddress,
    city: data.city,
    postalCode: data.postalCode,
    country: data.country || "Indonesia",
  };
};

export const formatCoordinatesForAPI = (
  coords: Coordinates
): { Lat: string; Long: string } => {
  return {
    Lat: String(coords.latitude),
    Long: String(coords.longitude),
  };
};

export const parseCoordinatesFromString = (
  latitude: string,
  longitude: string
): Coordinates => {
  return {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
};
