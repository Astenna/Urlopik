import { Dialog, DialogTitle, Button } from "@material-ui/core";
import { useFormStyles } from "../../styles/FormStyles";
import { RequestedVacationsList } from "./RequestedVacationsList";

export const RequestedVacations = ({ open = false, setOpen, vacations }) => {
  const classes = useFormStyles();

  return (
    <Dialog open={open}>
      <DialogTitle
        aria-labelledby="simple-dialog-title"
        className={classes.form}
      >
        Manage requested vacations
      </DialogTitle>
      <RequestedVacationsList vacations={vacations} />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => setOpen(false)}
      >
        Close
      </Button>
    </Dialog>
  );
};
