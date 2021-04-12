import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import { useFormStyles } from "../../styles/FormStyles";
import history from "../../helpers/History";
import { newUserUrl } from "../../helpers/ApiURLs";
import axios from "axios";
import { toast } from "react-toastify";

export const SignUp = () => {
  const classes = useFormStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    createNewUser();
    history.push("/sign-in");
  };

  const createNewUser = () => {
    let postData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    axios
      .post(newUserUrl, postData)
      .then(() => {
        toast("Successfully created a new user", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch(() => {
        toast.error("There is a problem with creating a new user", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.signing}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid>
            <Grid item xs>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
