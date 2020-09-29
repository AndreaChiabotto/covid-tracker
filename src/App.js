import React, { useState, useEffect } from "react";
import { Grid, Container } from "@material-ui/core";

import { sortData, prettyPrintStat } from "./utils/utils";

import Header from "./components/Header/Header";
import Infobox from "./components/InfoBox/infoBox";
import Map from "./components/Map/Map";
import InfoTable from "./components/InfoTable/InfoTable";
import LineGraph from "./components/LineGraph/LineGraph";

import "./App.scss";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const worldWideLatLng = { lat: 34.80746, lng: -40.4796 };
  const worldWideZoom = 2;
  const [mapCenter, setMapCenter] = useState(worldWideLatLng);
  const [mapZoom, setMapZoom] = useState(worldWideZoom);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    //  console.log('app is starting...');
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

          // console.log(data);

          const sortedData = sortData(data);

          setTableData(sortedData);
          setMapCountries(data);
          setCountries(fetchedCountries);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    getCountriesByData();
  }, []);

  const onCountryChange = async (event) => {
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
        } else {
          setMapCenter(worldWideLatLng);
          setMapZoom(worldWideZoom);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="app">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header
              country={country}
              onCountryChange={(e) => onCountryChange(e)}
              countries={countries}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <Infobox
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <Infobox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <Infobox
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Map
              casesType={casesType}
              countries={mapCountries}
              center={mapCenter}
              zoom={mapZoom}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LineGraph
              countryName={countryInfo.country}
              countryCode={country}
              casesType={casesType}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoTable countries={tableData} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
