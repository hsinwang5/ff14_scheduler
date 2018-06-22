import axios from "axios";
import { GET_EVENT, GET_ERRORS, PAGE_LOADING } from "./types";

export const getEvent = eventid => dispatch => {
  dispatch(setPageLoading());
  axios
    .get(`/api/event/${eventid}`)
    .then(res => {
      dispatch({
        type: GET_EVENT,
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

export const setPageLoading = () => {
  return {
    type: PAGE_LOADING
  };
};
