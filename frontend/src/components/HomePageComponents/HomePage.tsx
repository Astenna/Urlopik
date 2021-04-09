import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useHomePageStyles } from "./HomePageStyles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "@material-ui/core/Container";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export default function HomePage() {
  const classes = useHomePageStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Calendar
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Plan your vacation!
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          //defaultView: "agendaWeek"
        />
      </Container>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}
