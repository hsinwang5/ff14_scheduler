import axios from "axios";
import { GET_GROUP, PAGE_LOADING, GET_ERRORS, SET_ADMIN_STATUS } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//register group
export const registerGroup = (registerData, history) => dispatch => {
  axios
    .post("/api/group/register", registerData)
    .then(res => {
      history.push(`/dashboard/${res.data._id}`);
      console.log(registerData.username);
      if (registerData.username) {
        const loginData = {
          username: registerData.username,
          password: registerData.password,
          initialRegistration: true
        };
        axios.post("/api/group/login", loginData).then(res => {
          console.log("login called!");
          const { token } = res.data;
          //Save token to browser localstorage
          localStorage.setItem("jwtToken", token);
          //set token as axios authorization header
          setAuthToken(token);
          //decode token so we can determine if user has group admin status
          const decoded = jwt_decode(token);
          dispatch(setAdminStatus(decoded));
        });
      }
    })
    .catch(err => console.log(err));
};

export const getGroup = id => dispatch => {
  let error;
  dispatch(setPageLoading());
  axios
    .get(`/api/group/${id}`)
    .then(res => {
      if (res.data === null) {
        error.nogroupfound = "No group found";
        throw error;
      }
      dispatch({
        type: GET_GROUP,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

//Login + get user token and set to header
export const loginGroup = loginData => dispatch => {
  axios.post("/api/group/login", loginData).then(res => {
    console.log("login called!");
    const { token } = res.data;
    //Save token to browser localstorage
    localStorage.setItem("jwtToken", token);
    //set token as axios authorization header
    setAuthToken(token);
    //decode token so we can determine if user has group admin status
    const decoded = jwt_decode(token);
    dispatch(setAdminStatus(decoded));
  });
};

//logout user
export const logoutGroup = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setAdminStatus({}));
};

export const setPageLoading = () => {
  return {
    type: PAGE_LOADING
  };
};

//set logged in user
export const setAdminStatus = decoded => {
  return {
    type: SET_ADMIN_STATUS,
    payload: decoded
  };
};
