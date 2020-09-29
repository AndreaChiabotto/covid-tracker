import React from 'react';
import {
    FormControl,
    Select,
    MenuItem,
  } from "@material-ui/core";

  import './Header.scss';

const Header = (props) => {
    return (
       <div className="Header">
        <h1>Covid-19 World Tracker</h1>
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
    );
};

export default Header;