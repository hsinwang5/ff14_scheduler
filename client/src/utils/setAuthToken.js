import axios from "axios";
//axios defaults can set auth headers
//this file will send all axios requests with the header

const setAuthToken = token => {
  if (token) {
    //Apply to every request if token exists
    //Bracket is header name
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
