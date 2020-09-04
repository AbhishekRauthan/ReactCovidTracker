import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";

import "./App.css";
import "leaflet/dist/leaflet.css"

import {
  Countries,
  CountriesResult,
  DataInfo,
  TableData,
} from "./interfaces/result.interface";
import Infobox from "./components/Infobox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";

const App: React.FC = () => {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState<DataInfo>();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
          setTableData(result);
          setCountries(countries);
        });
    };
    getData();
  }, []);

  const countryChange = async (e: any) => {
    const countryCode: string = e.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "Worldwide" ? `/all` : `/countries/${countryCode}`;
    await fetch(`https://disease.sh/v3/covid-19${url}`)
      .then((result) => result.json())
      .then((data) => {
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
          <Map center={mapCenter} zoom={mapZoom} />
        </div>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide Live cases</h3>
          <LineGraph casesType="cases"/>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
