import { Button, Container, Typography } from "@material-ui/core";
import history from "../../helpers/History";
import { useFormStyles } from "../../styles/FormStyles";

export const Unauthorized = () => {
  const classes = useFormStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.signing}>
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
