import React from "react";
import './table.scss';

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({country, cases}, i) => (
        <tr key={country + i}>
          <td>{country}</td>
          <td>{cases}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
