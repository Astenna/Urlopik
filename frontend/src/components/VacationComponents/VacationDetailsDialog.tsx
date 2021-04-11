import { useFormStyles } from "../../styles/FormStyles";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Paper,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import moment from "moment";

export const VacationDetailsDialog = ({ open, setOpen, details }) => {
  const classes = useFormStyles();
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => setDialogOpen(open), [open]);

  return (
    <Dialog
      open={dialogOpen}
      aria-labelledby="simple-dialog-title"
      className={classes.form}
    >
      <Paper className={classes.paper}>
        <DialogTitle>Vacation Details</DialogTitle>
        {details && (
          <div>
            <DialogContentText>Title: {details.event.title}</DialogContentText>
            <DialogContentText>
              Vacation Type: {details.event.extendedProps.vacationType}
            </DialogContentText>
            <DialogContentText>
              {/* Start Date: {details.event._instance.range.start.toString()} */}
              Start Date:
              {moment(details.event._instance.range.start).format("DD-MM-YYYY")}
            </DialogContentText>
            <DialogContentText>
              {/* End Date: {details.event._instance.range.end.toString()} */}
              End Date:{" "}
              {moment(details.event._instance.range.end).format("DD-MM-YYYY")}
            </DialogContentText>
            <DialogContentText>
              Description: {details.event.extendedProps.description}
            </DialogContentText>
          </div>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      </Paper>
    </Dialog>
  );
};
