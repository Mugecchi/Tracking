import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import data from "../data/Isabela.geojson"; // Importing GeoJSON data

const MapComponent = () => {
  return (
    <MapContainer
      center={[37.7749, -122.4194]}
      zoom={10}
      style={{ height: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={data} />
    </MapContainer>
  );
};

export default MapComponent;
