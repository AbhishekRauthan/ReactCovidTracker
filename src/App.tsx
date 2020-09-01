import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";

import "./App.css";

import {
  Countries,
  CountriesResult,
  DataInfo,
} from "./interfaces/result.interface";
import Infobox from "./components/Infobox";
import Map from "./components/Map";

const App: React.FC = () => {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState<DataInfo>();

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, [])

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
    setCountry(countryCode);
    const url = countryCode === "Worldwide" ? `/all` : `/countries/${countryCode}`;
    await fetch(`https://disease.sh/v3/covid-19${url}`)
      .then((result) => result.json())
      .then((data) => {

        console.log(data);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropbox">
            <Select variant="outlined" onChange={countryChange} value={country}>
              <MenuItem value="Worldwide">WorldWide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <Infobox
            title="Coronavirus Cases"
            cases={countryInfo?.todayCases}
            total={countryInfo?.cases}
          />
          <Infobox
            title="Recovered"
            cases={countryInfo?.todayRecovered}
            total={countryInfo?.recovered}
          />
          <Infobox
            title="Deaths"
            cases={countryInfo?.todayDeaths}
            total={countryInfo?.deaths}
          />
        </div>
        <div className="app_map">
          <Map />
        </div>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <h3>Worldwide Live cases</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
