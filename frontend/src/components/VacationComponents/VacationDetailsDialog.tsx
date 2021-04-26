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
import axios from "axios";
import { vacationsUrl } from "../../helpers/ApiURLs";
import { toast } from "react-toastify";
import { isNil } from "ramda";
import { mapVacationToEvent, vacationTypes } from "../HomePageComponents/utils";

export const VacationDetailsDialog = ({ open, setOpen, details }) => {
  const classes = useFormStyles();
  const [dialogOpen, setDialogOpen] = useState(open);
  const [vacationId, setVacationId] = useState(null);
  const [vacationDetails, setVacationDetails] = useState({} as any);

  useEffect(() => {
    setDialogOpen(open);
    details && setVacationId(details.event._def.publicId);
  }, [open]);

  useEffect(() => {
    if (!isNil(vacationId)) {
      const getVacationRequest = `${vacationsUrl}/${vacationId}`;
      axios
        .get(getVacationRequest)
        .then((response) =>
          setVacationDetails(mapVacationToEvent(response.data))
        )
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
  }, [vacationId]);

  const handleDelete = () => {
    const deleteVacationRequest = `${vacationsUrl}/${vacationId}`;
    axios
      .delete(deleteVacationRequest)
      .then(() => {
        setTimeout(() => window.location.reload(), 100);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
    setOpen(false);
  };

  return (
    <>
      {vacationDetails && vacationDetails.title && (
        <Dialog
          open={dialogOpen}
          aria-labelledby="simple-dialog-title"
          className={classes.form}
        >
          <Paper className={classes.paper}>
            <DialogTitle>Vacation Details</DialogTitle>
            {details && (
              <div>
                <DialogContentText>
                  Vacationer: {vacationDetails.title}
                </DialogContentText>
                <DialogContentText>
                  Vacation Type: {vacationTypes[vacationDetails.typeId]}
                </DialogContentText>
                <DialogContentText>
                  {/* Start Date: {details.event._instance.range.start.toString()} */}
                  Start Date:
                  {moment(vacationDetails.start).format("DD-MM-YYYY")}
                </DialogContentText>
                <DialogContentText>
                  {/* End Date: {details.event._instance.range.end.toString()} */}
                  End Date: {moment(vacationDetails.end).format("DD-MM-YYYY")}
                </DialogContentText>
                <DialogContentText>
                  Description: {vacationDetails.description}
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Paper>
        </Dialog>
      )}
    </>
  );
};
