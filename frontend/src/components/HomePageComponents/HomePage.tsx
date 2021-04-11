import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useHomePageStyles } from "./HomePageStyles";
import Container from "@material-ui/core/Container";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { VacationDialog } from "../VacationComponents/VacationDialog";
import { Calendar } from "./Calendar";
import { VacationDetailsDialog } from "../VacationComponents/VacationDetailsDialog";
import history from "../../helpers/History";
import axios from "axios";
import { vacationsUrl } from "../../helpers/ApiURLs";
import { toast } from "react-toastify";

export default function HomePage() {
  const classes = useHomePageStyles();
  const [newVacationVisible, setNewVacationVisible] = useState(false);
  const [newVacationDetailsVisible, setNewVacationDetailsVisible] = useState(
    false
  );

  const [vacations, setVacations] = useState([] as any);

  const createVacation = (newVacationData) => {
    // axios
    //   .post(vacationsUrl, newVacationData)
    //   .then(({ data }) => {
    //     const { oldVacations } = vacations;
    //     const newVacations = [...oldVacations, data];
    //     setVacations(newVacations);
    //   })
    //   .catch((error) => {
    //     toast.error(
    //       "There is a problem with creating a new vacation: ",
    //       error.response
    //     );
    //   });
  };

  useEffect(() => {
    getVacations();
  }, []);

  const getVacations = () => {
    axios
      .get(vacationsUrl)
      .then((response) => {
        setVacations(response);
      })
      .catch((error) => {
        toast.error(
          "There is a problem with loading vacations: ",
          error.response
        );
        history.push("/unauthorized");
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar
        setNewVacationVisible={setNewVacationVisible}
        newVacationVisible={newVacationVisible}
      />
      {
        <VacationDialog
          open={newVacationVisible}
          setOpen={setNewVacationVisible}
          createVacation={createVacation}
        />
      }
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
      <Container maxWidth="md" component="main">
        <Calendar
          vacations={vacations}
          newVacationDetailsVisible={newVacationDetailsVisible}
          setNewVacationDetailsVisible={setNewVacationDetailsVisible}
        />
        {/* {
          <VacationDetailsDialog
            open={newVacationDetailsVisible}
            setOpen={setNewVacationDetailsVisible}
            details={vacations}
          />
        } */}
      </Container>
      <Footer />
    </React.Fragment>
  );
}
