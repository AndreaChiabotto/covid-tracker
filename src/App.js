import React, { useState, useEffect } from "react";
import { Grid, FormControl, Select, MenuItem } from "@material-ui/core";

import { sortData , prettyPrintStat} from "./utils/utils";

import Infobox from "./components/InfoBox/infoBox";
import Map from "./components/Map/Map";
import InfoTable from "./components/InfoTable/InfoTable";
import LineGraph from "./components/LineGraph/LineGraph";

import "leaflet/dist/leaflet.css";

import "./App.scss";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const worldWideLatLng = {lat: 34.80746, lng: -40.4796};
  const worldWideZoom = 2;
  const [mapCenter, setMapCenter] = useState(worldWideLatLng);
  const [mapZoom, setMapZoom] = useState(worldWideZoom);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  
  useEffect(() => {
    loadCountriesData(country);
  }, []);

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
          setMapCountries(data);
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
        if (data.countryInfo) {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(6);
        }
        else{
          setMapCenter(worldWideLatLng);
          setMapZoom(worldWideZoom);
        }
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

       
        <Grid container item xs={6} spacing={2}>

          <Grid item xs={4}>
            {/* <h3>{country.name}</h3>   */}
            <Infobox
            active={casesType === 'cases'}
            onClick={ (e) => setCasesType('cases')}
              title="Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
          </Grid>
         
          <Grid item xs={4}>

            <Infobox
             active={casesType === 'recovered'}
            onClick={ (e) => setCasesType('recovered')}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
          </Grid>
         
          <Grid item xs={4}>
            <Infobox
             active={casesType === 'deaths'}
            onClick={ (e) => setCasesType('deaths')}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </Grid>

          <Grid item xs={12}>
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
        </Grid>

        </Grid>

        <Grid item xs={6}>
          <LineGraph casesType={casesType}/>

          <InfoTable countries={tableData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
