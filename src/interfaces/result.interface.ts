export interface CountriesResult {
  country: string,
  countryInfo: {
    iso2: string
  }
}

export interface Countries {
  name: string,
  value: string;
}

export interface DataInfo {
  todayCases:number,
  todayDeaths:number,
  todayRecovered:number,
  cases:number,
  deaths:number,
  recovered:number
}

export interface TableData {
  country:string,
  cases:number
}