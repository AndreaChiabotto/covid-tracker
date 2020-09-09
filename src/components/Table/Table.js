import React from "react";
import './table.scss';

function Table({ countries }) {
  return (
    <table className="table">
      <tbody>
      {countries.map(({country, cases}, i) => (
        <tr key={country + i}>
          <td>{country}</td>
          <td>{cases}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Table;
