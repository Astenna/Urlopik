import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormStyles } from "../../styles/FormStyles";
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
  const classes = useFormStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser()
      .then((tokenObj) => {
        jwtToLocalStorage(tokenObj.accessToken);
        setAuthorizationToken(tokenObj.accessToken);
      })
      .then(() => {
        if (isUserSignedIn()) {
          history.push("/home-page");
        }
      })
      .catch(() => {
        toast.error("Invalid username / password");
        history.push("/unauthorized");
      });
  };

  const loginUser = () => {
    let loginData = {
      email: email,
      password: password,
    };
    return axios.post(loginUrl, loginData).then((response) => {
      return response.data;
    });
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.signing}>
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
          <div className={classes.buttons}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </div>
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
