import {
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Checkbox,
} from "@material-ui/core";
import { useState } from "react";
import moment from "moment";
import { useFormStyles } from "../../styles/FormStyles";
export const RequestedVacationsList = ({ vacations }) => {
  const [rows, setRows] = useState(vacations);
  const classes = useFormStyles();

  const columns = ["Name", "Reason", "From", "To", "Description", "Accepted"];

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
                <TableRow key={row.id} className={classes.dialogTitle}>
                  <TableCell>{row.vacationerId}</TableCell>
                  <TableCell>{row.typeId}</TableCell>
                  <TableCell>
                    {moment(row.start).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>{moment(row.end).format("DD-MM-YYYY")}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <Checkbox checked={row.hrAccepted.value} />
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
