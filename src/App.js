import React, { useState, useEffect } from "react";
import { Grid, FormControl, Select, MenuItem } from "@material-ui/core";

import { sortData } from "./utils/utils";

import Infobox from "./components/InfoBox/infoBox";
import Map from "./components/Map/Map";
import InfoTable from "./components/InfoTable/InfoTable";
import LineGraph from "./components/LineGraph/LineGraph";

import "./App.scss";

function App() {
  const [countries, setCountries] = useState(["A", "B", "C"]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

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

          const sortedData = sortData(data);

          setTableData(sortedData);
          setCountries(fetchedCountries);
        });
    };

    getCountriesByData();
  }, []);

  const onCOuntryChange = async (event) => {
    const selectedCountry = event.target.value;

    setCountry(selectedCountry);
    loadCountriesData(selectedCountry);
  };

  const loadCountriesData = async (selectedCountry) => {
    const url =
      selectedCountry === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Covid-19 World Tracker</h1>

          <FormControl>
            <Select
              variant="outlined"
              onChange={onCOuntryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, i) => (
                <MenuItem key={"country nr " + i} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Map />
        </Grid>
        <Grid container item xs={7} spacing={2}>
            <Grid item xs={4} >
              {/* <h3>{country.name}</h3>   */}
              <Infobox
                title="Cases"
                cases={countryInfo.todayCases}
                total={countryInfo.cases}
              />
            </Grid>
            <Grid item xs={4} >
              <Infobox
                title="Recovered"
                cases={countryInfo.todayRecovered}
                total={countryInfo.recovered}
              />
            </Grid>
            <Grid item xs={4} >
              <Infobox
                title="Deaths"
                cases={countryInfo.todayDeaths}
                total={countryInfo.deaths}
              />
            </Grid>
        </Grid>

        <Grid item xs={5}>
          <LineGraph />

          <InfoTable countries={tableData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
