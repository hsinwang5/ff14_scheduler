import React, { Component } from "react";
import * as moment from "moment";
import classnames from "classnames";
// import "../../stylesheets/styles.css";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: 2000,
      currentMonth: 0,
      days: 31
    };

    this.nextMonth = this.nextMonth.bind(this);
    this.sayValue = this.sayValue.bind(this);
  }

  componentWillMount() {
    const currentYear = moment().year();
    const currentMonth = moment().month();
    const days = this.props.months[currentMonth].days;
    this.setState({
      currentYear,
      currentMonth,
      days
    });
  }

  nextMonth(e) {
    let currentMonth = this.state.currentMonth + 1;
    let currentYear = this.state.currentYear;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }
    let days = this.props.months[currentMonth].days;
    this.setState({
      currentMonth,
      currentYear,
      days
    });
  }

  sayValue(e) {
    const num = e.target.getAttribute("value");
    console.log(num);
  }

  render() {
    //create array of length equal to days in month, then fill with divs
    //to render calendar days
    const startDay = moment(
      `${this.props.months[this.state.currentMonth].month} 1st, ${
        this.state.currentYear
      }`,
      "MMM-DD-YYYY"
    ).day();

    const totalDays = this.state.days;

    const calendar = new Array(42).fill(0).map((day, index) => {
      //fills date with null if before actual month's start day of week
      let dateValue = index < startDay ? null : index - (startDay - 1);
      //fulls date with null if greater than total days of month
      dateValue = dateValue > totalDays ? null : dateValue;
      return (
        <div
          key={index}
          value={dateValue}
          onClick={this.sayValue}
          className={classnames({
            calendar__day: dateValue,
            "calendar__day calendar__day--dark": !dateValue
          })}
        >
          {dateValue}
        </div>
      );
    });

    console.log(calendar);
    //className={classnames({ "calendar__weeks-item": true })}
    return (
      <div className="calendar">
        <div className="calendar__header" onClick={this.nextMonth}>
          {this.props.months[this.state.currentMonth].month}{" "}
          {this.state.currentYear}
        </div>
        <div className="calendar__weeks">
          <div className="calendar__weeks-item">Su</div>
          <div className="calendar__weeks-item">Mo</div>
          <div className="calendar__weeks-item">Tu</div>
          <div className="calendar__weeks-item">We</div>
          <div className="calendar__weeks-item">Th</div>
          <div className="calendar__weeks-item">Fr</div>
          <div className="calendar__weeks-item">Sa</div>
        </div>
        <div className="calendar__display">{calendar}</div>
      </div>
    );
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
