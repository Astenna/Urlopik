import { Dialog, DialogTitle, Button, Paper } from "@material-ui/core";
import { useFormStyles } from "../../styles/FormStyles";
import { RequestedVacationsList } from "./RequestedVacationsList";

export const RequestedVacations = ({ open = false, setOpen, vacations }) => {
  const classes = useFormStyles();
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      aria-labelledby="simple-dialog-title"
      className={classes.form}
    >
      <Paper className={classes.paper}>
        <DialogTitle className={classes.dialogTitle}>
          Manage requested vacations
        </DialogTitle>
        <RequestedVacationsList vacations={vacations} />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.close}
          onClick={handleClose}
        >
          Close
        </Button>
      </Paper>
    </Dialog>
  );
};
