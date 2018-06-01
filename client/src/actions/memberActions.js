import axios from "axios";
import { GET_MEMBER, GET_ERRORS } from "./types";

export const createMember = memberData => dispatch => {
  axios
    .post("/api/member/register", memberData)
    .then(res => {
      dispatch({
        type: GET_MEMBER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginMember = loginData => dispatch => {
  axios
    .post("/api/member/login", loginData)
    .then(res => {
      dispatch({
        type: GET_MEMBER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
