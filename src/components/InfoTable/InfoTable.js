import React from "react";

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
} from "@material-ui/core";

function InfoTable({ countries }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, countries.length - page * rowsPerPage);

  return (
    <Card>
      <CardContent>
        <h3>Live cases by Country</h3>

        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {countries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ country, cases }, i) => (
                  <TableRow key={country + i}>
                    <TableCell>{country}</TableCell>
                    <TableCell align="right">{cases}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={2} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={countries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
}

export default InfoTable;
