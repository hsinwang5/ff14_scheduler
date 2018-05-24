import React, { Component } from "react";

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div />;
  }
}

Calendar.defaultProps = {
  months: [
    { month: "January", days: 31 },
    { month: "February", days: 28 },
    { month: "March", days: 31 },
    { month: "April", days: 30 },
    { month: "May", days: 31 },
    { month: "June", days: 30 },
    { month: "July", days: 31 },
    { month: "August", days: 31 },
    { month: "September", days: 30 },
    { month: "October", days: 31 },
    { month: "November", days: 30 },
    { month: "December", days: 31 }
  ]
};

export default Calendar;
