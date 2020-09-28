import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {showDataOnMap} from "../../utils/utils"

import "./Map.scss";



function Map({countries, casesType, center, zoom}) {


  return (
    <div className="Map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
       
       {/*
      {showDataOnMap(countries, casesType)}
      */}

      </LeafletMap>
    </div>
  );
}

export default Map;
