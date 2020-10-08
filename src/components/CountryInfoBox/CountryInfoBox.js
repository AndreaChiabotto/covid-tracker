import React from "react";
import "./CountryInfoBox.scss";
import { Card, CardContent, Grid } from "@material-ui/core";

import {prettyPrintStat} from '../../utils/utils'

function CountryInfoBox({ data }) {
  console.log(data);

  return (
    <Card className="CountryInfoBox">
      <CardContent>
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <img alt={data.country + "flag"} />
        <h1>
          {data.country} <span>({data.continent})</span>
        </h1>
        <p>Population: {prettyPrintStat(data.population)}</p>
        </Grid>

        <Grid item xs={4}>
          <h3>Cases active: </h3>
        <h2>{prettyPrintStat(data.active)}</h2>
        </Grid>
        <Grid item xs={4}>
        <h2>Cases critical: {prettyPrintStat(data.critical)}</h2>
        </Grid>
        <Grid item xs={4}>
        <h2>Tests done: {prettyPrintStat(data.tests)}</h2>
        </Grid>
        <Grid item xs={4}>
        <h3>Cases per Million: {prettyPrintStat(data.casesPerOneMillion)}</h3>
        </Grid>
        <Grid item xs={4}>
        <h3>Deaths per Million: {prettyPrintStat(data.deathsPerOneMillion)}</h3>
        </Grid>
        <Grid item xs={4}>
        <h3>Tests per Million:{prettyPrintStat(data.testsPerOneMillion)}</h3>
        </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CountryInfoBox;
