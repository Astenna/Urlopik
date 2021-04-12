import { makeStyles } from "@material-ui/core";

// TODO: Change it to css (if necessary)
export const useFormStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: theme.spacing(3),
  },
  dialogTitle: {
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    display: "inline-block",
    width: "150px",
  },
  buttons: {
    alignItems: "center",
  },
}));
