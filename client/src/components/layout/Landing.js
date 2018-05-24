import React, { Component } from "react";
import LandingRegisterForm from "./LandingRegisterForm";

class Landing extends Component {
  render() {
    return (
      <div>
        <h3 className="header-text">Final Fantasy XIV Raid Scheduler</h3>
        <LandingRegisterForm />
      </div>
    );
  }
}

export default Landing;
