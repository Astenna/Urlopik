import { useFormStyles } from "../../styles/FormStyles";
import {
  Dialog,
  DialogTitle,
  Select,
  TextField,
  MenuItem,
  Paper,
  Button,
} from "@material-ui/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { toString, values } from "ramda";

export const VacationDialog = ({ open, setOpen, createVacation }) => {
  const classes = useFormStyles();
  const vacationTypes = { 1: "Vacation", 2: "Sick leave", 3: "On request" };
  const [type, setType] = useState(1);
  const [from, setFrom] = useState(moment().format("yyyy-MM-DD"));
  const [to, setTo] = useState(moment().format("yyyy-MM-DD"));
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => setDialogOpen(open), [open]);

  const handleSubmit = () => {
    const newVacation = {
      typeId: type,
      dateFrom: from,
      dateTo: to,
      description,
    };
    createVacation(newVacation);
    setOpen(false);
  };
  return (
    <Dialog
      open={dialogOpen}
      aria-labelledby="simple-dialog-title"
      className={classes.form}
    >
      <Paper className={classes.paper}>
        <DialogTitle>Plan your vacation</DialogTitle>
        <Select
          value={type}
          onChange={(event) => setType(parseInt(toString(event.target.value)))}
        >
          {values(vacationTypes).map((type, i) => (
            <MenuItem key={i} value={i + 1}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="From"
          type="date"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
        />
        <TextField
          label="To"
          type="date"
          value={to}
          onChange={(event) => setTo(event.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </Paper>
    </Dialog>
  );
};
