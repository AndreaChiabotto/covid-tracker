import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";

import Infobox from "./components/infoBox";
import Map from "./components/Map";

import "./App.scss";

function App() {
  const [countries, setCountries] = useState(["A", "B", "C"]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesByData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const fetchedCountries = data.map((fetchedCountry) => ({
            name: fetchedCountry.country,
            value: fetchedCountry.countryInfo.iso2,
          }));

          setCountries(fetchedCountries);
        });
    };

    getCountriesByData();
  }, []);

  const onCOuntryChange = async (event) => {
    const selectedCountry = event.target.value;

    setCountry(selectedCountry)
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19 World Tracker</h1>

        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCOuntryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem
                key={"country item " + country.value}
                value={country.value}
              >
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

<Map/>

      <div className="app__stats">
        <Infobox title="Infected" cases="100" total="1000" />
        <Infobox title="Recovered" cases="100" total="1000" />
        <Infobox title="Deaths" cases="100" total="1000" />
      </div>

      {/* Infobox */}
      {/* Infobox */}
      {/* Infobox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
