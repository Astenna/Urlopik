import { useState } from "react";
import "./App.css";
import history from "./helpers/History";
import axios from "axios";
import { toast } from "react-toastify";
import { Router, Switch, Route } from "react-router-dom";
import {
  setAuthorizationToken,
  getJwtTokenFromLocalStorage,
} from "./helpers/AuthenticationHelpers";
import { SignIn, SignUp } from "./components/AuthenticationComponents/index";
import  HomePage  from "./components/HomePageComponents/HomePage";///////////
import { CircularProgress } from "@material-ui/core";

export const App = () => {
  const [redirectTo500, setRedirectTo500] = useState(false);
  const [loading, setLoading] = useState(false);

  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      setLoading(false);

      return response;
    },
    (error) => {
      setLoading(false);

      if (error.response && error.response.status === 401) {
        history.push("/unauthorized");
        return error;
      }

      if (error.response && error.response.status === 500) {
        setRedirectTo500(true);
        return error;
      }

      if (redirectTo500 === true) {
        toast.error("Internal server error");
        history.push("/sign-in");
      }

      return Promise.reject(error);
    }
  );

  let jwtToken = getJwtTokenFromLocalStorage();
  if (jwtToken !== undefined && jwtToken !== null) {
    setAuthorizationToken(jwtToken);
  }

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/home-page" component={HomePage} />
        </Switch>
        {loading && <CircularProgress />}
      </div>
    </Router>
  );
};
