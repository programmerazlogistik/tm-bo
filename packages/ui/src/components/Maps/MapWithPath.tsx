import { useEffect, useMemo } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { ImageComponent } from "@muatmuat/ui/ImageComponent";
import {
  GoogleMap,
  Marker,
  OverlayView,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";

import { getAssetPath } from "../../lib/asset-path";

declare global {
  interface Window {
    google: any;
  }
}

interface LocationMarker {
  position: any;
  title: string;
  type: "pickup" | "dropoff";
  icon: string;
  onClick?: (marker: LocationMarker) => void;
  showLabel?: boolean;
}

interface ProcessedLocationMarker {
  position: any;
  title: string;
  type: "pickup" | "dropoff";
  icon: {
    url: string;
    scaledSize: any;
    anchor: any;
  };
  onClick?: (marker: LocationMarker) => void;
  showLabel: boolean;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface MapWithPathProps {
  apiKey?: string;
  mapContainerStyle?: any;
  center?: LatLng;
  zoom?: number;
  locationMarkers?: LocationMarker[];
  locationPolyline?: any[];
  encodedTruckPolyline?: string;
  pathOptions?: any;
  truckPathOptions?: any;
  mapOptions?: any;
  showTruck?: boolean;
  truckIcon?: string;
}

// Remove unused imports and code
const defaultMapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: -7.2575, lng: 112.7521 }; // Default to Surabaya
const defaultZoom = 13;
const defaultPathOptions = {
  strokeColor: "#DD7B02",
  strokeOpacity: 1,
  strokeWeight: 6,
};
const defaultTruckPathOptions = {
  strokeColor: "#DD7B02",
  strokeOpacity: 1,
  strokeWeight: 6,
  strokeDashArray: "10,5", // Dashed line to differentiate
};

const defaultMapOptions = {
  disableDefaultUI: false,
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  cameraControl: false,
  fullscreenControl: false,
};

// Function to calculate bearing between two points
const calculateBearing = (start: any, end: any) => {
  const startLat = start.lat * (Math.PI / 180);
  const startLng = start.lng * (Math.PI / 180);
  const endLat = end.lat * (Math.PI / 180);
  const endLng = end.lng * (Math.PI / 180);

  const dLng = endLng - startLng;
  const y = Math.sin(dLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

  const bearing = Math.atan2(y, x) * (180 / Math.PI);
  const result = (bearing + 360) % 360;
  return result; // Normalize to 0-360 degrees
};

/**
 * Advanced Google Maps component with path visualization, multiple markers, and animated truck tracking.
 * Perfect for logistics, delivery tracking, and route optimization interfaces.
 */
export const MapWithPath = ({
  apiKey = "AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU",
  mapContainerStyle = defaultMapContainerStyle,
  center = defaultCenter,
  zoom = defaultZoom,
  locationMarkers = [],
  locationPolyline = [], // Regular waypoints for connecting locations
  encodedTruckPolyline = "", // Separate truck waypoints from backend
  pathOptions = defaultPathOptions,
  truckPathOptions = defaultTruckPathOptions,
  mapOptions = {},
  showTruck = true,
  truckIcon = "/icons/truck-icon.svg", // Path to truck icon
}: MapWithPathProps) => {
  pathOptions = { ...defaultPathOptions, ...pathOptions };
  truckPathOptions = { ...defaultTruckPathOptions, ...truckPathOptions };
  const { isMobile } = useDevice();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places", "geometry"],
  });

  const truckPolyline = useMemo(() => {
    if (!encodedTruckPolyline || !isLoaded) {
      return [];
    }
    return window.google.maps.geometry.encoding.decodePath(
      encodedTruckPolyline
    );
  }, [encodedTruckPolyline, isLoaded]);

  // Calculate truck position and rotation based on truck waypoints
  const truckMarker = useMemo(() => {
    if (!truckPolyline || truckPolyline.length < 2 || !showTruck || !isLoaded) {
      return null;
    }

    const lastPoint = truckPolyline[truckPolyline.length - 1];
    const secondLastPoint = truckPolyline[truckPolyline.length - 2];

    const startCoords = {
      lat: secondLastPoint.lat(),
      lng: secondLastPoint.lng(),
    };
    const endCoords = { lat: lastPoint.lat(), lng: lastPoint.lng() };

    const bearing = calculateBearing(startCoords, endCoords);

    return {
      position: lastPoint,
      rotation: bearing,
    };
  }, [truckPolyline, showTruck, isLoaded]);

  // Process markers with proper icons when Google Maps is loaded
  const processedMarkers = useMemo((): ProcessedLocationMarker[] => {
    if (!isLoaded || !window.google) return [];

    // Track pickup and dropoff counters for proper indexing
    let pickupCounter = 0;
    let dropoffCounter = 0;

    // First pass: count pickups and dropoffs
    locationMarkers.forEach((marker) => {
      if (marker.type === "pickup") {
        pickupCounter++;
      } else if (marker.type === "dropoff") {
        dropoffCounter++;
      }
    });

    // Reset counters for second pass
    pickupCounter = 0;
    dropoffCounter = 0;

    return locationMarkers.map((marker): ProcessedLocationMarker => {
      let title = marker.title;
      const showLabel = pickupCounter > 1 || dropoffCounter > 1;

      if (isMobile) {
        // Group indices by type: pickup or dropoff
        if (marker.type === "pickup") {
          pickupCounter++;
          title = pickupCounter.toString();
        } else if (marker.type === "dropoff") {
          dropoffCounter++;
          title = dropoffCounter.toString();
        } else {
          title = "?";
        }
      } else {
        // Show full title when not mobile
        title = marker.title;
      }

      return {
        ...marker,
        title,
        showLabel,
        icon: {
          url: getAssetPath(marker.icon),

          scaledSize: new window.google.maps.Size(45, 58),
          anchor: new window.google.maps.Point(22.5, 48), // Center bottom of the marker
        },
      };
    });
  }, [locationMarkers, isLoaded, isMobile]);

  // Add styles for marker labels
  useEffect(() => {
    // Add CSS for marker labels
    const style = document.createElement("style");
    if (isMobile) {
      style.textContent = `
      .marker-label {
        position: relative;
        background: #EE4343;
        color: white;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        font-size: text-xs;
        font-weight: bold;
        white-space: nowrap;
        transform: translate(11px, -22px);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    `;
    } else {
      style.textContent = `
      .marker-label {
        position: relative;
        background: black;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: text-xs;
        font-weight: bold;
        white-space: nowrap;
        transform: translateY(-38px);
      }
    `;
    }
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [isMobile]);

  const combinedMapOptions = useMemo(
    () => ({
      ...defaultMapOptions,
      ...mapOptions,
    }),
    [mapOptions]
  );

  if (loadError) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-red-300 bg-red-50">
        <div className="text-center">
          <p className="mb-2 text-red-600">Error loading Google Maps</p>
          <p className="text-sm text-red-500">{(loadError as any).message}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <span className="text-gray-700">Loading maps...</span>
        </div>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
        <div className="text-center">
          <p className="mb-2 text-gray-600">Google Maps API Key Required</p>
          <p className="text-sm text-gray-500">
            Please provide a valid Google Maps API key
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={combinedMapOptions}
      >
        {/* Render path between waypoints (location connections) */}
        {locationPolyline.length >= 2 && (
          <Polyline path={locationPolyline} options={pathOptions} />
        )}

        {/* Render truck path (separate from location connections) */}
        {truckPolyline.length >= 2 && (
          <Polyline
            path={truckPolyline}
            options={{ ...truckPathOptions, strokeColor: "#FFC217" }}
          />
        )}

        {/* Render custom markers */}
        {processedMarkers.map((marker, index) => (
          <Marker
            key={marker.title}
            position={marker.position}
            icon={marker.icon}
            onClick={() =>
              marker.onClick?.(marker as unknown as LocationMarker)
            }
            label={
              marker.showLabel
                ? {
                    text: marker.title,
                    className: "marker-label",
                    color: "white",
                  }
                : undefined
            }
          />
        ))}

        {/* Render truck marker at the end of the path */}
        {truckMarker && (
          <OverlayView
            position={truckMarker.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <div
              style={{
                transform: `rotate(${truckMarker.rotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              <ImageComponent
                src={truckIcon}
                alt="Truck"
                width={30}
                className="translate-x-[5px] object-contain"
              />
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  );
};
