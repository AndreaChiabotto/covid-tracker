import React, { useState, useEffect } from "react";
import { Grid, Container } from "@material-ui/core";

import { sortData, prettyPrintStat } from "./utils/utils";

import Header from "./components/Header/Header";
import CountryInfoBox from "./components/CountryInfoBox/CountryInfoBox";
import Map from "./components/Map/Map";
import LineGraph from "./components/LineGraph/LineGraph";
import Infobox from "./components/InfoBox/InfoBox";
import TopCountries from "./components/TopCountries/TopCountries";

import "./App.scss";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const worldWideLatLng = { lat: 34.80746, lng: -40.4796 };
  const worldWideZoom = 2;
  const [mapCenter, setMapCenter] = useState(worldWideLatLng);
  const [mapZoom, setMapZoom] = useState(worldWideZoom);
  const [mapCountries, setMapCountries] = useState([]);

  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const loadCountriesData = async (selectedCountry) => {
      console.log("loadCountriesData...");

      const url =
        selectedCountry === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("loadCountriesData..." + data);

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

    loadCountriesData(country);
  }, [country]);

  useEffect(() => {
    const getCountriesByData = async () => {
      console.log("getCountriesByData...");

      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const fetchedCountries = data.map((fetchedCountry) => ({
            name: fetchedCountry.country,
            value: fetchedCountry.countryInfo.iso2,
          }));

          setMapCountries(data);
          setCountries(fetchedCountries);
          setLoading(false);

          console.log("fetchedCountries is successful...");
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

  const setCasesTypeOnClick = (type) => {
    setCasesType(type);
  };

  const selectCountryOnClickHandler = (selectedCountry) => {
    setCountry(selectedCountry);
  };

  if (loading) {
    return (
      <div className="app">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Loading...</h2>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="app">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Header
                country={country}
                countries={countries}
                onCountryChange={(e) => onCountryChange(e)}
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

            <Grid item xs={12} sm={12} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={12}>
                  <Infobox
                    active={casesType === "cases"}
                    onClick={() => setCasesTypeOnClick("cases")}
                    title="New cases"
                    cases={prettyPrintStat(countryInfo.todayCases)}
                    total={prettyPrintStat(countryInfo.cases)}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={12}>
                  <Infobox
                    active={casesType === "recovered"}
                    onClick={() => setCasesTypeOnClick("recovered")}
                    title="Recovered"
                    cases={prettyPrintStat(countryInfo.todayRecovered)}
                    total={prettyPrintStat(countryInfo.recovered)}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={12}>
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

            <Grid item xs={12} sm={12} md={8}>
              <LineGraph
                countryName={countryInfo.country}
                countryCode={country}
                casesType={casesType}
              />
            </Grid>

            <Grid item xs={12}>
              <TopCountries
                title="Country with most new cases"
                sortedData={sortData(mapCountries, "todayCases", 9)}
                sortingType="todayCases"
                loadCountryOnClick={selectCountryOnClickHandler}
              />

              <TopCountries
                title="Country with most deaths:"
                sortedData={sortData(mapCountries, "todayDeaths", 9)}
                sortingType="todayDeaths"
                loadCountryOnClick={selectCountryOnClickHandler}
              />

              <TopCountries
                title="Country with most cases per million:"
                sortedData={sortData(mapCountries, "casesPerOneMillion", 9)}
                sortingType="casesPerOneMillion"
                loadCountryOnClick={selectCountryOnClickHandler}
              />

              <TopCountries
                title="Country with most activecases per million:"
                sortedData={sortData(mapCountries, "activePerOneMillion", 9)}
                sortingType="activePerOneMillion"
                loadCountryOnClick={selectCountryOnClickHandler}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
