import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";

import Infobox from "./components/infoBox";
import Map from "./components/Map";

import "./App.scss";

function App() {
  const [countries, setCountries] = useState(["A", "B", "C"]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    loadCountriesData(country);
  }, [country]);

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

    setCountry(selectedCountry);
    loadCountriesData(selectedCountry)
  };

  const loadCountriesData = async (selectedCountry) => {
    const url =
      selectedCountry === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  };

  return (
    <div className="app">
   
      <div className="app__header">
        <h1>Covid-19 World Tracker</h1>

        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCOuntryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country, i) => (
              <MenuItem key={"country nr " + i} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>{" "}
      <div className="app__hero">
        <Map />
      </div>
      <div className="app__container">
        <div className="app__mainbar">
          <div className="app__stats">
           {/* <h3>{country}</h3>  */}
            <Infobox title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
            <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
            <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
          </div>
        </div>

        <Card className="app__sidebar">
          <CardContent>
            <h3>Live cases by Country</h3>
            {/* Table */}
            <h3>Worldwide new cases</h3>
            {/* Graph */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
