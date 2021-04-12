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
import { toString } from "ramda";

export const VacationDialog = ({ open, setOpen, createVacation }) => {
  const classes = useFormStyles();
  const vacationTypes = ["Vacation", "Sick leave", "On request"];
  const [type, setType] = useState(0);
  const [from, setFrom] = useState(moment().format("yyyy-MM-DD"));
  const [to, setTo] = useState(moment().format("yyyy-MM-DD"));
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => setDialogOpen(open), [open]);

  const handleSubmit = () => {
    const newVacation = {
      id: 1,
      title: "Tomasz Zawadzki",
      start: from,
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
        <DialogTitle className={classes.dialogTitle}>
          Plan your vacation
        </DialogTitle>
        <Select
          value={type}
          onChange={(event) => setType(toString(event.target.value))}
        >
          {vacationTypes.map((type, i) => (
            <MenuItem key={i} value={i}>
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
        <div className={classes.buttons}>
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
        </div>
      </Paper>
    </Dialog>
  );
};
