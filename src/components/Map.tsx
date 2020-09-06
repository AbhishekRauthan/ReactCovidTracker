import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { Countries } from "../interfaces/result.interface";

const caseTypeColor = {
  cases: {
    hex: "#CC1034",
    multipiler: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multipiler: 1200,
  },
  deaths: {
    hex: "#fb444b",
    multipiler: 2000,
  },
};

interface Props {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  countries?: Countries[];
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
