import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";
import { Countries, CountriesResult } from "./interfaces/result.interface";
import Infobox from "./components/Infobox";

const App: React.FC = () => {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [country, setCountry] = useState("Worldwide");

  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          const countries: Countries[] = result.map(
            (country: CountriesResult) => {
              return {
                name: country.country,
                value: country.countryInfo.iso2,
              };
            }
          );

          setCountries(countries);
        });
    };
    getData();
  }, []);

  const countryChange = async (e: any) => {
    const countryCode: string = e.target.value;
    console.log(countryCode);
    setCountry(countryCode);
  };

  return (
    <div className="App">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropbox">
          <Select variant="outlined" onChange={countryChange} value={country}>
            <MenuItem value="Worldwide">WorldWide</MenuItem>
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className="app_stats">
        <Infobox title="Coronavirus Cases" total={2000} cases={123}/>
        <Infobox title="Recovered" total={2000} cases={1234}/>
        <Infobox title="Deaths" total={2000} cases={12345}/>
      </div>
    </div>
  );
};

export default App;
