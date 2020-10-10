import React from "react";
import { Grid, FormControl, Select, MenuItem } from "@material-ui/core";
import logo from '../../assets/images/coronavirus.svg';

import "./Header.scss";

const Header = (props) => {
  return (

/*
    <div>Icons made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
*/
    <Grid container spacing={3} >
      <Grid item xs={12} className="Header">

        <div className="Header__title">
          <img alt="covid-19 tracker icons" src={logo} className="logo"/>
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
      <Grid item xs={12} >
        <p className="update">COVID-19 data sourced from Worldometers, updated every 10 minutes)</p>
      </Grid>
    </Grid>
  );
};

export default Header;
