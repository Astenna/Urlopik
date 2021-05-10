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
import { vacationTypes } from "../HomePageComponents/utils";

export const FilterDialog = ({ open, setOpen, filterVacation }) => {
  const classes = useFormStyles();
  const [type, setType] = useState(1);
  const [earlierThen, setEarlierThen] = useState(moment().format("yyyy-MM-DD"));
  const [laterThan, setLaterThan] = useState(moment().format("yyyy-MM-DD"));
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => {
    setDialogOpen(open);
    //setType(0);
  }, [open]);

  const handleSubmit = () => {
    const filterData = {
      typeId: type,
      earlierThen,
      laterThan,
      userId,
      description,
    };
    filterVacation(filterData);
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
          Set filter parameters
        </DialogTitle>
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
          label="Earlier than"
          type="date"
          value={earlierThen}
          onChange={(event) => setEarlierThen(event.target.value)}
        />
        <TextField
          label="Later than"
          type="date"
          value={laterThan}
          onChange={(event) => setLaterThan(event.target.value)}
        />
        <TextField
          label="UserID"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
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
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Apply
          </Button>
        </div>
      </Paper>
    </Dialog>
  );
};
