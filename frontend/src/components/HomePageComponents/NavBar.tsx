import { AppBar, Button, Link, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useHomePageStyles } from "./HomePageStyles";

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
          href="/sign-in"
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