import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { getAssetPath } from "../../lib/asset-path";

declare global {
  interface Window {
    google: any;
  }
}

interface MapContainerProps {
  coordinates: { latitude: number; longitude: number };
  className?: string;
  viewOnly?: boolean;
  textLabel?: string;
  draggableMarker?: boolean;
  onPositionChange?: (position: {
    latitude: number;
    longitude: number;
  }) => void;
  markerIcon?: string;
  size?: {
    width: number;
    height: number;
    widthUnit?: string;
    heightUnit?: string;
  };
  anchor?: {
    x: number;
    y: number;
  };
}

/**
 * An interactive Google Maps container with marker placement and location selection capabilities.
 * Perfect for address selection, location picking, and coordinate management interfaces.
 */
export const MapContainer = ({
  coordinates,
  className,
  viewOnly,
  textLabel,
  draggableMarker = true,
  onPositionChange = (_position: { latitude: number; longitude: number }) => {},
  markerIcon = "/icons/marker-lokasi-muat.svg",
  size,
  anchor,
}: MapContainerProps) => {
  const [map, setMap] = useState<any>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  // Ref to track if marker was just clicked
  const justClickedMarkerRef = useRef(false);
  const kuningMarkerRef = useRef<any>(null);

  // When lat/lng changes, optionally pan the map
  useEffect(() => {
    if (map) {
      map.panTo(
        new window.google.maps.LatLng(
          coordinates.latitude,
          coordinates.longitude
        )
      );
    }
  }, [coordinates, map]);

  const onLoad = useCallback(
    (mapInstance: any) => {
      mapInstance.setCenter(
        new window.google.maps.LatLng(
          coordinates.latitude,
          coordinates.longitude
        )
      );
      mapInstance.setZoom(15);
      setMap(mapInstance);
    },
    [coordinates]
  );

  // Handle map click to set marker position, unless marker was just clicked
  const handleMapClick = useCallback(
    (e: any) => {
      if (viewOnly) return;
      if (justClickedMarkerRef.current) {
        justClickedMarkerRef.current = false;
        return;
      }
      if (e && e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        onPositionChange({ latitude: lat, longitude: lng });
      }
      // Close InfoWindow if open (even if not setting position)
      if (infoWindow) {
        infoWindow.close();
        setInfoWindow(null);
      }
    },
    [viewOnly, infoWindow, onPositionChange]
  );

  // Handle marker drag end
  const handleMarkerDragEnd = useCallback(
    (e: any) => {
      if (e && e.latLng) {
        onPositionChange({
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        });
        // Close InfoWindow if open
        if (infoWindow) {
          infoWindow.close();
          setInfoWindow(null);
        }
      }
    },
    [infoWindow, onPositionChange]
  );

  // Handle marker click
  const handleMarkerClick = useCallback(
    (_e: any, markerInstance: any) => {
      if (
        kuningMarkerRef.current &&
        markerInstance === kuningMarkerRef.current
      ) {
        // Don't open InfoWindow for this marker
        return;
      }
      justClickedMarkerRef.current = true;
      if (infoWindow) {
        infoWindow.close();
      }
      const newInfoWindow = new window.google.maps.InfoWindow({
        content: textLabel
          ? `<div style="font-weight:500;font-size: text-sm;margin:0;padding:0;line-height:1.2;">${textLabel}</div>`
          : "",
        position: {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        },
        disableAutoPan: false,
      });
      newInfoWindow.open(map);
      setInfoWindow(newInfoWindow);
    },
    [coordinates, infoWindow, map, textLabel]
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API || "",
  });

  // Loading placeholder
  if (!isLoaded) {
    return (
      <div
        className={cn(
          "h-[200px] w-[200px] animate-pulse overflow-hidden rounded-md bg-gray-400",
          className
        )}
      ></div>
    );
  }

  return (
    <div
      className={cn(
        "h-[200px] w-[200px] overflow-hidden rounded-md",
        className
      )}
    >
      <GoogleMap
        center={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={onLoad}
        onUnmount={() => setMap(null)}
        onClick={handleMapClick}
        options={{
          // 24. THP 2 - MOD001 - MP - 012 - QC Plan - Web - Muatparts - Paket 005 A - Daftar Sebagai Seller Muatparts - LB - 0310
          draggable: !viewOnly,
          scrollwheel: !viewOnly,
          streetViewControl: false,
          mapTypeControl: false,
          cameraControl: false,
          fullscreenControl: false,
        }}
        zoom={15}
      >
        <Marker
          ref={kuningMarkerRef}
          position={{
            lat: coordinates.latitude,
            lng: coordinates.longitude,
          }}
          draggable={!viewOnly && draggableMarker}
          onDragEnd={handleMarkerDragEnd}
          icon={{
            url: getAssetPath(markerIcon),
            scaledSize: new window.google.maps.Size(
              size?.width || 45,
              size?.height || 58,
              size?.widthUnit,
              size?.heightUnit
            ),
            anchor: new window.google.maps.Point(
              anchor?.x || 22.5,
              anchor?.y || 29
            ),
          }}
          onClick={(e) => handleMarkerClick(e, kuningMarkerRef.current)}
        />
      </GoogleMap>
    </div>
  );
};
