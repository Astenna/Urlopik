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

export const VacationDetailsDialog = ({
  open,
  setOpen,
  details,
  newVacationEditDialogVisible,
  setNewVacationEditDialogVisible,
  passVacationId,
  setPassVacationId,
}) => {
  const classes = useFormStyles();
  const [dialogOpen, setDialogOpen] = useState(open);
  const [vacationId, setVacationId] = useState(null);
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
        .then((response) =>
          setVacationDetails(mapVacationToEvent(response.data))
        )
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
  }, [vacationId]);

  const handleEdit = () => {
    setNewVacationEditDialogVisible(!newVacationEditDialogVisible);
    setPassVacationId(vacationId);
    setOpen(false);
  };

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
            <DialogTitle className={classes.dialogTitle}>
              Vacation Details
            </DialogTitle>
            {details && (
              <div className={classes.dialogTitle}>
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
                  End Date:{" "}
                  {moment(vacationDetails.end)
                    .add(-1, "days")
                    .format("DD-MM-YYYY")}
                </DialogContentText>
                <DialogContentText>
                  Description: {vacationDetails.description}
                </DialogContentText>
              </div>
            )}
            <div className="row">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.detailsButtons}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.detailsButtons}
                onClick={handleDelete}
              >
                Delete
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.detailsButtons}
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </Paper>
        </Dialog>
      )}
    </>
  );
};
