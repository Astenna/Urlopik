import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useHomePageStyles } from "../../styles/HomePageStyles";
import { removeToken } from "../../helpers/AuthenticationHelpers";

export const NavBar = ({ setRequestedVacationsVisible, user }) => {
  const isHr = user.role == "Hr";
  console.log(user.role);
  const classes = useHomePageStyles();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.toolbarTitle}
        >
          Urlopek
        </Typography>

        {isHr && (
          <Button
            onClick={setRequestedVacationsVisible(true)}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Requested vacations
          </Button>
        )}
        <Button
          onClick={removeToken}
          color="primary"
          variant="outlined"
          className={classes.link}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
