import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setAdminStatus } from "./actions/groupActions";
// import "./stylesheets/App.css";
// import "./stylesheets/styles.css";

//components
import Landing from "./components/layout/Landing.js";
import Dashboard from "./components/dashboard/Dashboard";
import NavBar from "./components/layout/NavBar";
import Schedule from "./components/schedule/Schedule";

//check for token and set if admin is logged in
if (localStorage.jwtToken) {
  //set header with admin authorization
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setAdminStatus(decoded));
}

//implement auto-logout? Not really essential

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path="/dashboard" component={NavBar} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard/:id" component={Dashboard} />
            <Route exact path="/dashboard/:id/:eventid" component={Schedule} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
