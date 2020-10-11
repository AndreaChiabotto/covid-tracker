//import React from "react";
import numeral from "numeral";
//import { Circle, Popup } from "react-leaflet";

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

