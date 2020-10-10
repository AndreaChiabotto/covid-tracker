import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#cc1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 800,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

// load a language
numeral.register('locale', 'de', {
  delimiters: {
      thousands: '.',
      decimal: ','
  },
  abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
  }
});

// switch between languages
// numeral.locale('de');

export const sortData = (data,type="cases",max=10) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => (a[type] > b[type] ? -1 : 1));
  return sortedData.slice(0, max)
};

export const prettyPrintStat = (stat) => {
  if (stat !== undefined) {
    return stat ? `${numeral(stat).format("0,0")}` : "0";
  }
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      key={country.country + "_" + casesType}
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
          <div className="country-popup__flag">
            <img
              src={`${country.countryInfo.flag}`}
              alt={`${country.country} Flag`}
            />
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
