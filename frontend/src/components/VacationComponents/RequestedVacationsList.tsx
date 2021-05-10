import {
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Checkbox,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import moment from "moment";
import { useFormStyles } from "../../styles/FormStyles";
import { vacationTypes } from "../HomePageComponents/utils";
import { isEmpty } from "ramda";
import { acceptVacationUrl } from "../../helpers/ApiURLs";
import axios from "axios";
import { toast } from "react-toastify";
export const RequestedVacationsList = ({ vacations }) => {
  const [rows, setRows] = useState<any>([]);
  const classes = useFormStyles();

  useEffect(() => {
    setRows(vacations);
  }, [vacations]);

  const columns = ["Name", "Reason", "From", "To", "Description", "Accept"];
  const acceptVacation = (id) => {
    const acceptVacationRequest = `${acceptVacationUrl}/${id}`;
    axios
      .put(acceptVacationRequest)
      .then(() => {})
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <Paper>
      <Table aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align="center">{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {!isEmpty(rows) && (
          <TableBody>
            {rows.map(
              (row) =>
                !row.hrAccepted && (
                  <TableRow key={row.id} className={classes.dialogTitle}>
                    <TableCell align="center">{row.vacationerName}</TableCell>
                    <TableCell align="center">
                      {vacationTypes[row.typeId]}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.dateFrom).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.dateTo).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <Checkbox
                      checked={row.hrAccepted.value}
                      onClick={(e) => acceptVacation(row.id)}
                    />
                  </TableRow>
                )
            )}
          </TableBody>
        )}
      </Table>
    </Paper>
  );
};
