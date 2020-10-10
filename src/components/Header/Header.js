import React from "react";
import { Grid, FormControl, Select, MenuItem } from "@material-ui/core";

import "./Header.scss";

const Header = (props) => {
  return (
    <Grid container spacing={3} className="Header">

      <Grid item xs={6} md={3}>
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
