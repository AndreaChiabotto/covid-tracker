import React, { useState, useEffect } from "react";
import { Grid, Container } from "@material-ui/core";

import { sortData, prettyPrintStat } from "./utils/utils";

import Header from "./components/Header/Header";
import CountryInfoBox from "./components/CountryInfoBox/CountryInfoBox";
import Map from "./components/Map/Map";
import InfoTable from "./components/InfoTable/InfoTable";
import LineGraph from "./components/LineGraph/LineGraph";
import Infobox from "./components/CountryInfoBox/InfoBox/InfoBox";

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

  const onCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
  };

  const loadCountriesData = async (selectedCountry) => {
    console.log("loadCountriesData...");

    const url =
      selectedCountry === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}?yesterday=true`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.countryInfo) {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(6);
        } else {
          setMapCenter(worldWideLatLng);
          setMapZoom(worldWideZoom);
        }

        setCountryInfo(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setCasesTypeOnClick = (type) => {
    setCasesType(type);
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
              infoBoxClick={setCasesTypeOnClick}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Map
              casesType={casesType}
              countries={mapCountries}
              center={mapCenter}
              zoom={mapZoom}
            />
          </Grid>

          <Grid item xs={12} sm={7}>
            <CountryInfoBox
              data={countryInfo}
              setCasesType={setCasesTypeOnClick}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Infobox
                  active={casesType === "cases"}
                  onClick={() => setCasesTypeOnClick("cases")}
                  title="Cases"
                  cases={prettyPrintStat(countryInfo.todayCases)}
                  total={prettyPrintStat(countryInfo.cases)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Infobox
                  active={casesType === "recovered"}
                  onClick={() => setCasesTypeOnClick("recovered")}
                  title="Recovered"
                  cases={prettyPrintStat(countryInfo.todayRecovered)}
                  total={prettyPrintStat(countryInfo.recovered)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Infobox
                  active={casesType === "deaths"}
                  onClick={() => setCasesTypeOnClick("deaths")}
                  title="Deaths"
                  cases={prettyPrintStat(countryInfo.todayDeaths)}
                  total={prettyPrintStat(countryInfo.deaths)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={8} >
           
              <LineGraph
                countryName={countryInfo.country}
                countryCode={country}
                casesType={casesType}
              />
            
          </Grid>

          <Grid item xs={12}>
            <InfoTable countries={tableData} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
