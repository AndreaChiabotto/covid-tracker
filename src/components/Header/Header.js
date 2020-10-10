import React from "react";
import { Grid, FormControl, Select, MenuItem } from "@material-ui/core";

import "./Header.scss";

const Header = (props) => {
  return (
    <Grid container spacing={3} >
      <Grid item xs={12} className="Header">
        <div className="Header__title">
          <h1>Covid-19 Daily Tracker</h1>
        </div>
       
        <div className="Header__select">
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
        </div>
      </Grid>
    </Grid>
  );
};

export default Header;
