// Default coordinate constants for vendor registration
// Used across all components to ensure consistency

export const DEFAULT_SURABAYA_COORDINATES = {
  latitude: -7.2575,
  longitude: 112.7521,
} as const;

export const DEFAULT_LONDON_COORDINATES = {
  latitude: 51.5074,
  longitude: -0.1278,
} as const;

// Coordinate validation bounds for Indonesia (rough approximation)
export const INDONESIA_COORDINATE_BOUNDS = {
  minLatitude: -11.0,
  maxLatitude: 6.0,
  minLongitude: 95.0,
  maxLongitude: 141.0,
} as const;

// Helper function to validate coordinates are within reasonable bounds
export const validateCoordinates = (
  latitude: number,
  longitude: number
): boolean => {
  return (
    latitude >= INDONESIA_COORDINATE_BOUNDS.minLatitude &&
    latitude <= INDONESIA_COORDINATE_BOUNDS.maxLatitude &&
    longitude >= INDONESIA_COORDINATE_BOUNDS.minLongitude &&
    longitude <= INDONESIA_COORDINATE_BOUNDS.maxLongitude
  );
};

// Helper function to format coordinates for display
export const formatCoordinates = (
  latitude: number,
  longitude: number
): string => {
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};
