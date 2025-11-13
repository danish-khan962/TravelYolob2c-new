"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker icon images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet’s default marker paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface DayLocation {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
}

export default function LeafletMap({ slug }: { slug: string }) {
  const [locations, setLocations] = useState<DayLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchLocations = async () => {
      try {
        const res = await fetch(`/api/packages/${slug}/itinerary-days`);
        if (!res.ok) throw new Error("Failed to fetch itinerary days");

        const data = await res.json();
        console.log("Fetched itinerary coordinates:", data);

        // Filter only valid lat/lng points
        const validPoints = data.filter(
          (loc: any) =>
            loc.latitude !== null &&
            loc.longitude !== null &&
            !isNaN(loc.latitude) &&
            !isNaN(loc.longitude)
        );
        console.log("Valid location points after filtering:", validPoints);
        console.log("Total days fetched:", data.length, "Valid locations:", validPoints.length);
        setLocations(validPoints);
      } catch (err) {
        console.error("Error fetching itinerary map data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500 italic">
        Loading map...
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500 italic">
        No location data available
      </div>
    );
  }

  // Default center (first day’s coordinates)
  const defaultCenter: LatLngExpression = [
    locations[0].latitude,
    locations[0].longitude,
  ];

  // Create path connecting all points
  const routePoints = locations.map(
    (loc) => [loc.latitude, loc.longitude] as LatLngExpression
  );

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      style={{ width: "100%", height: "100%", borderRadius: "16px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {/* Plot all itinerary-day markers */}
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.latitude, loc.longitude] as LatLngExpression}
        >
          <Popup>
            <b>{loc.title}</b>
            <br />
            Day ID: {loc.id}
          </Popup>
        </Marker>
      ))}

      {/* Optional — draw route line */}
      {routePoints.length > 1 && (
        <Polyline
          positions={routePoints}
          pathOptions={{ color: "#6C3B3F", weight: 4, opacity: 0.7 }}
        />
      )}
    </MapContainer>
  );
}
