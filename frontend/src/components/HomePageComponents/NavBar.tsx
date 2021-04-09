import { AppBar, Button, Link, Toolbar, Typography } from "@material-ui/core";
import { useHomePageStyles } from "./HomePageStyles";
import { removeToken } from "../../helpers/AuthenticationHelpers";

export const NavBar = () => {
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
          noWrap
          className={classes.toolbarTitle}
        >
          Urlopek
        </Typography>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarPriviledge}
        >
          Employee
        </Typography>
        <nav>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Plan Vacation
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Settings
          </Link>
        </nav>
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
