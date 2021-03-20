import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useAuthenticationStyles } from "./AuthenticationStyles";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  FormControl,
} from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  isUserSignedIn,
  jwtToLocalStorage,
  setAuthorizationToken,
} from "../../helpers/AuthenticationHelpers";
import history from "../../helpers/History";
import { loginUrl } from "../../helpers/ApiURLs";

export const SignIn = () => {
  const classes = useAuthenticationStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: uncomment when backend ready
    // loginUser()
    //   .then((response) => {
    //     jwtToLocalStorage(response);
    //     setAuthorizationToken(response);
    //   })
    //   .then(() => {
    //     if (isUserSignedIn()) {
    //       history.push("/home");
    //     }
    //   });
  };

  const loginUser = () => {
    let loginData = {
      email: email,
      password: password,
    };
    return axios
      .post(loginUrl, loginData)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        toast.error("Invalid username / password");
        history.push("/unauthorized");
      });
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormControl className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </FormControl>
      </div>
    </Container>
  );
};
