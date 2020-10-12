import React from "react";
import { Map as LeafletMap, GeoJSON } from "react-leaflet";
import data1 from "./data.js";

import { Card, CardContent } from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

function Map({ countries, casesType, center, zoom }) {
  let sortData = () => {};

  if (countries.length > 0) {
    sortData = (country) => {
      let number = countries.filter(function (e) {
        return e.countryInfo.iso2 === country;
      });

      if (number[0] === undefined) {
        return 0;
      }
      return number[0][casesType];
    };
  }

  const getColor = (d) => {
    return d > 120000
      ? "#123456"
      : d > 128000
      ? "#BD0026"
      : d > 64000
      ? "#E31A1C"
      : d > 32000
      ? "#ffcc00"
      : d > 16000
      ? "#FD8D3C"
      : d > 2000
      ? "#cccccc"
      : d > 500
      ? "#FED976"
      : "#ffffff";
  };

  const style = (feature) => {
    return {
      fillColor: getColor(sortData(feature.properties.iso_a2)),
      weight: 2,
      opacity: 0.6,
      color: "#35393e",
      dashArray: "1",
      fillOpacity: 0.7,
    };
  };

  return (
    <Card>
      <CardContent className="Map">
        <LeafletMap center={center} zoom={zoom}>
          <GeoJSON
            data={data1}
            style={style}
            /* 
           onEachFeature={(feature, layer) => {

              layer.bindPopup(
                "<h2>" + feature.properties.name + "</h2>" 
                   +
                  "<h4>" +
                  sortData(feature.properties.iso_a2) + ' ' + {casesType} +
                  " today </p>"
              );
            }}
            */
          />
        </LeafletMap>
      </CardContent>
    </Card>
  );
}

export default Map;
