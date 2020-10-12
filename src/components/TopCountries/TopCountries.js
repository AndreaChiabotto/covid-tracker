import React from "react";
import "./TopCountries.scss";
import { Grid, Card, CardContent } from "@material-ui/core";
import { prettyPrintStat } from "../../utils/utils";

function TopCountries({ title, sortedData, sortingType, loadCountryOnClick }) {
  // console.log(sortingType);

  return (
    <Grid container spacing={3} className="TopCountries">
      <Grid item xs={12}>
        <h3>{title}</h3>

        {sortedData.map((country) => {
          return (
            <Card
              onClick={() => loadCountryOnClick(country.countryInfo.iso2)}
              className="TopCountries__Button"
              key={title + "-" + country.country}
            >
              <CardContent>
                <h2>{country.country}</h2>
                <p>{prettyPrintStat(country[sortingType])}</p>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default TopCountries;
