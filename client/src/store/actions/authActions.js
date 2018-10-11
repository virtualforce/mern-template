import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, SET_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      dispatch(bindToken(token));
    })
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};

export const currentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const bindToken = token => dispatch => {
  localStorage.setItem("token", token);
  const decodedToken = jwt_decode(token);
  setAuthToken(token);
  dispatch(currentUser(decodedToken));
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  setAuthToken(false);
  dispatch(currentUser({}));
};

export const signupUser = userData => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => {
      const { token } = res.data;
      dispatch(bindToken(token));
    })
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};
