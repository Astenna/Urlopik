import {
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { useState } from "react";
import moment from "moment";
export const RequestedVacationsList = ({ vacations }) => {
  const [rows, setRows] = useState(vacations);

  const columns = ["Name", "Reason", "From", "To", "Description"];

  return (
    <Paper>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align="center">{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            (row) =>
              !row.hrAccepted && (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.vacationerId}</TableCell>
                  <TableCell align="center">{row.typeId}</TableCell>
                  <TableCell align="center">
                    {moment(row.start).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    {moment(row.end).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
