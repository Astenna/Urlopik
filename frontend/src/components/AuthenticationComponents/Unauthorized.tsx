import { Button, Container, Typography } from "@material-ui/core";
import history from "../../helpers/History";
import { useAuthenticationStyles } from "./AuthenticationStyles";

export const Unauthorized = () => {
  const classes = useAuthenticationStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          401 - Unauthorized
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            history.push("/sign-in");
          }}
        >
          Sign In
        </Button>
      </div>
    </Container>
  );
};
