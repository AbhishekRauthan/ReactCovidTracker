import React from "react";
import { TableData } from "../interfaces/result.interface";

interface Props {
  countries: TableData[];
}

const sortData = (data: TableData[]): TableData[] => {
  const sortData = [...data];
  sortData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

  return sortData;
};

const Table: React.FC<Props> = ({ countries }) => {
  return (
    <div className="table">
      {sortData(countries).map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
