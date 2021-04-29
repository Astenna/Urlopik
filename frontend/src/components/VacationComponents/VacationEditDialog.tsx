import { useFormStyles } from "../../styles/FormStyles";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { vacationsUrl } from "../../helpers/ApiURLs";
import { toast } from "react-toastify";
import { isNil, toString, values } from "ramda";
import { mapVacationToEvent, vacationTypes } from "../HomePageComponents/utils";

export const VacationEditDialog = ({
  open,
  setOpen,
  details,
  passVacationId,
  setPassVacationId,
}) => {
  const classes = useFormStyles();
  const [dialogOpen, setDialogOpen] = useState(open);
  const [vacationId, setVacationId] = useState(null);
  const [type, setType] = useState(1);
  const [from, setFrom] = useState(moment().format("yyyy-MM-DD"));
  const [to, setTo] = useState(moment().format("yyyy-MM-DD"));
  const [description, setDescription] = useState("");
  const [vacationDetails, setVacationDetails] = useState({} as any);

  useEffect(() => {
    setDialogOpen(open);
    details && setVacationId(details.event._def.publicId);
  }, [open, details]);

  useEffect(() => {
    if (!isNil(vacationId)) {
      const getVacationRequest = `${vacationsUrl}/${vacationId}`;
      axios
        .get(getVacationRequest)
        .then((response) => {
          setVacationDetails(mapVacationToEvent(response.data));
          setType(vacationDetails.typeId);
          setFrom(moment(vacationDetails.start).format("yyyy-MM-DD"));
          setTo(moment(vacationDetails.end).format("yyyy-MM-DD"));
          setDescription(vacationDetails.description);
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
      console.log(vacationDetails);
    }
  }, [vacationId, vacationDetails]);

  const handleEdit = () => {
    const editVacationRequest = `${vacationsUrl}/${vacationId}`;
    axios
      .put(editVacationRequest, {
        typeId: type,
        dateFrom: from,
        dateTo: to,
        description: description,
      })
      .then(() => {
        setTimeout(() => window.location.reload(), 100);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
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
          Edit your vacation
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
            onClick={handleEdit}
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
