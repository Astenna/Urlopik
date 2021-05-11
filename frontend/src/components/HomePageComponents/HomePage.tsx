import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useHomePageStyles } from "../../styles/HomePageStyles";
import Container from "@material-ui/core/Container";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { VacationDialog } from "../VacationComponents/VacationDialog";
import { Calendar } from "./Calendar";
import { VacationDetailsDialog } from "../VacationComponents/VacationDetailsDialog";
import { VacationEditDialog } from "../VacationComponents/VacationEditDialog";
import { FilterDialog } from "../VacationComponents/FilterDialog";
import history from "../../helpers/History";
import axios from "axios";
import { vacationsUrl } from "../../helpers/ApiURLs";
import { toast } from "react-toastify";
import { RequestedVacations } from "../VacationComponents/RequestedVacationsDialog";
import { getJwtTokenFromLocalStorage } from "../../helpers/AuthenticationHelpers";
import jwt_decode from "jwt-decode";

export default function HomePage() {
  const classes = useHomePageStyles();
  const [newVacationVisible, setNewVacationVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [newVacationDetailsVisible, setNewVacationDetailsVisible] = useState(
    false
  );
  const [
    newVacationEditDialogVisible,
    setNewVacationEditDialogVisible,
  ] = useState(false);
  const [requestedVacationsVisible, setRequestedVacationsVisible] = useState(
    false
  );
  const [clickInfo, setClickInfo] = useState(false);
  const [passVacationId, setPassVacationId] = useState(null);
  const [vacations, setVacations] = useState([] as any);
  const [user, setUser] = useState({
    firstName: "Some",
    lastName: "User",
    role: "Employee",
  });
  const [filterData, setFilterData] = useState({
    typeId: "",
    vacationerId: "",
    earlierThan: "",
    laterThan: "",
    description: "",
  });

  const createVacation = (newVacationData) => {
    axios
      .post(vacationsUrl, newVacationData)
      .then(({ data }) => {
        const { oldVacations } = vacations;
        const newVacations = [...oldVacations, data];
        setVacations(newVacations);
        setTimeout(() => window.location.reload(), 100);
      })
      .catch((error) => {
        error.response && toast.error(error.response.data);
      });
  };

  const getVacations = () => {
    axios
      .get(vacationsUrl)
      .then((response) => {
        setVacations(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
        history.push("/unauthorized");
      });
  };

  const filterVacations = (filterData) => {
    axios
      .get(vacationsUrl, {
        params: {
          typeId: filterData.typeId,
          vacationerId: filterData.userId,
          earlierThan: filterData.earlierThan,
          laterThan: filterData.laterThan,
          description: filterData.description,
        },
      })
      .then((response) => {
        setVacations(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
        history.push("/unauthorized");
      });
  };

  useEffect(() => {
    getVacations();
    getUserData();
  }, []);

  useEffect(() => {
    filterVacations(filterData);
  }, [filterData]);

  const getUserData = () => {
    const jwtToken = getJwtTokenFromLocalStorage() || "";
    setUser(jwt_decode(jwtToken));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar
        setRequestedVacationsVisible={() => setRequestedVacationsVisible}
        user={user}
      />
      {
        <VacationDialog
          open={newVacationVisible}
          setOpen={setNewVacationVisible}
          createVacation={createVacation}
        />
      }
      {
        <FilterDialog
          open={filterVisible}
          setOpen={setFilterVisible}
          filterVacation={filterVacations}
        />
      }
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography variant="h3" align="center">
          Hello {user.firstName} {user.lastName}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Your role: {user.role}
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Calendar
          vacations={vacations}
          newVacationDetailsVisible={newVacationDetailsVisible}
          setNewVacationDetailsVisible={setNewVacationDetailsVisible}
          newVacationVisible={newVacationVisible}
          setNewVacationVisible={setNewVacationVisible}
          filterVisible={filterVisible}
          setFilterVisible={setFilterVisible}
          setClickInfo={setClickInfo}
        />
        {
          <VacationDetailsDialog
            open={newVacationDetailsVisible}
            setOpen={setNewVacationDetailsVisible}
            newVacationEditDialogVisible={newVacationEditDialogVisible}
            setNewVacationEditDialogVisible={setNewVacationEditDialogVisible}
            passVacationId={passVacationId}
            setPassVacationId={setPassVacationId}
            details={clickInfo}
          />
        }
        {
          <VacationEditDialog
            open={newVacationEditDialogVisible}
            setOpen={setNewVacationEditDialogVisible}
            passVacationId={passVacationId}
            setPassVacationId={setPassVacationId}
            details={clickInfo}
          />
        }
        {
          <RequestedVacations
            open={requestedVacationsVisible}
            setOpen={setRequestedVacationsVisible}
            vacations={vacations}
          />
        }
      </Container>
      <Footer />
    </React.Fragment>
  );
}
