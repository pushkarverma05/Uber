"use client";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ pickupPos, destinationPos, routeCoords }) {
  return (
    <div style={{ width: "100%", height: "50vh" }}>
      <MapContainer
        center={pickupPos || [28.7041, 77.1025]} // default Delhi if no pickup
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Pickup marker */}
        {pickupPos && (
          <Marker position={pickupPos}>
            <Popup>Pickup</Popup>
          </Marker>
        )}

        {/* Destination marker */}
        {destinationPos && (
          <Marker position={destinationPos}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {/* Route polyline */}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" />
        )}
      </MapContainer>
    </div>
  );
}