import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases : {
    hex: "#cc1034",
    multiplier: 800
  },
  recovered : {
    hex: "#7dd71d",
    multiplier: 800
  },
  deaths : {
    hex: "#fb4443",
    multiplier: 2000
  },
}

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `${numeral(stat).format("0.0a")}` : "0";

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="country-popup">
          <div
            className="country-popup__flag"
          >
            <img src={`${country.countryInfo.flag}`} alt={`${country.country} Flag`}/>
          </div>
          <h2 className="country-popup__name">{country.country}</h2>
          <p className="country-popup__confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </p>
          <p className="country-popup__recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </p>
          <p className="country-popup__deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </p>
        </div>
      </Popup>
    </Circle>
  ));

