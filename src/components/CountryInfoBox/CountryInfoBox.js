import React, { Fragment } from "react";
import "./CountryInfoBox.scss";
import { Grid } from "@material-ui/core";

import { prettyPrintStat } from "../../utils/utils";

function CountryInfoBox({data}) {
  let headerInfoBox;

  if (data.country === undefined) {
    headerInfoBox = (
      <Fragment>
        <img
          alt={"Worldwide flag"}
          src="https://i2x.ai/wp-content/uploads/2018/01/flag-global.jpg"
        />
        <h1>Worldwide</h1>
        <p>Population: {prettyPrintStat(data.population)}</p>
      </Fragment>
    );
  } else {
    headerInfoBox = (
      <Fragment>
        <img
          alt={data.country + "flag"}
          src={data.countryInfo?.flag}
        />
        <h1>
          {data.country} <span>({data.continent})</span>
        </h1>
        <p>Population: {prettyPrintStat(data.population)}</p>
      </Fragment>
    );
  }

  return (

      <Grid container spacing={3} className="CountryInfoBox">
        <Grid item xs={12} className="CountryInfoBox__header">
          {headerInfoBox}
        </Grid>

        <Grid item xs={6}  md={4}>
          <h3>Active Cases: </h3>
          <h2>{prettyPrintStat(data.active)}</h2>
        </Grid>

        <Grid item xs={6} md={4}>
          <h3>Critical cases:</h3>
          <h2> {prettyPrintStat(data.critical)}</h2>
        </Grid>

        <Grid item xs={6} md={4}>
          <h3>Cases per million:</h3>
          <h2> {prettyPrintStat(data.casesPerOneMillion)}</h2>
        </Grid>

        <Grid item xs={6} md={4}>
          <h3>Deaths per Million:</h3>
          <h2> {prettyPrintStat(data.deathsPerOneMillion)}</h2>
        </Grid>

        <Grid item xs={6} md={4}>
          <h3>Tests:</h3>
          <h2> {prettyPrintStat(data.tests)}</h2>
        </Grid>

        <Grid item xs={6} md={4}>
          <h3>Tests per Million:</h3>
          <h2>{prettyPrintStat(data.testsPerOneMillion)}</h2>
        </Grid>
      </Grid>
  
  );
}

export default CountryInfoBox;
