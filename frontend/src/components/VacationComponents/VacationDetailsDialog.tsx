import { useFormStyles } from "../../styles/FormStyles";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Paper,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";

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
        <DialogContentText>Title: {details[0].title}</DialogContentText>
        <DialogContentText>
          Vacation Type: {details[0].vacationType}
        </DialogContentText>
        <DialogContentText>Start Date: {details[0].start}</DialogContentText>
        <DialogContentText>
          Description: {details[0].description}
        </DialogContentText>
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
