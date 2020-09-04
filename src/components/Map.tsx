import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

interface Props {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const Map: React.FC<Props> = ({ center, zoom }) => {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </LeafletMap>
    </div>
  );
};

export default Map;
