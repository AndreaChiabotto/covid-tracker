import React from "react";
import { Grid, FormControl, Select, MenuItem } from "@material-ui/core";

import "./Header.scss";

const Header = (props) => {
  return (
    <Grid container spacing={3} className="Header">
      <Grid item xs={12}>
        <h1>Covid-19 Daily Tracker</h1>
      </Grid>

      <Grid item xs={12}>
        <h3>Select a country: </h3>
        <FormControl>
          <Select
            variant="outlined"
            onChange={props.onCountryChange}
            value={props.country}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {props.countries.map((country, i) => (
              <MenuItem key={"country nr " + i} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Header;
