"use client";

import { useState, useCallback } from "react";

export type GeoState = "idle" | "loading" | "success" | "error";

export function useGeolocation(onAddressResolved: (address: string) => void) {
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [geoError, setGeoError] = useState("");
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number } | null>(null);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        { headers: { "Accept-Language": "en" } }
      );
      if (res.ok) {
        const data = await res.json();
        return (data.display_name as string) || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      }
    } catch {
      // fall through
    }
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }, []);

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoState("error");
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }
    setGeoState("loading");
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setGeoCoords({ lat, lng });
        const address = await reverseGeocode(lat, lng);
        onAddressResolved(address);
        setGeoState("success");
      },
      (err) => {
        setGeoState("error");
        if (err.code === 1) setGeoError("Location access denied. Please allow location in your browser.");
        else if (err.code === 2) setGeoError("Location unavailable. Please enter it manually.");
        else setGeoError("Location request timed out. Please try again.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [reverseGeocode, onAddressResolved]);

  const resetGeoState = useCallback(() => {
    setGeoState("idle");
  }, []);

  return {
    geoState,
    geoError,
    geoCoords,
    handleDetectLocation,
    resetGeoState,
  };
}
