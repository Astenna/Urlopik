import axios from "axios";
import history from "./History";

export const isUserSignedIn = () => {
  let jwtToken = localStorage.getItem("JWT");
  if (jwtToken !== undefined && jwtToken !== null) {
    return true;
  } else {
    return false;
  }
};

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const removeToken = () => {
  localStorage.removeItem("JWT");
  history.push("sign-in");
};

export const jwtToLocalStorage = (token) => {
  localStorage.setItem("JWT", token);
};

export const getJwtTokenFromLocalStorage = () => {
  return localStorage.getItem("JWT");
};

export const roleToLocalStorage = (role) => {
  return localStorage.setItem("ROLE", role);
};

export const getRoleFromLocalStorage = () => {
  return localStorage.getItem("ROLE");
};
