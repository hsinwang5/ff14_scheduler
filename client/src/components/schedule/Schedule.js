import React, { Component } from "react";
import { connect } from "react-redux";
import { getEvent } from "../../actions/eventActions";
import classnames from "classnames";

import Spinner from "../common/Spinner";
import ResultsPopup from "./ResultsPopup";

let fillSquare = true;

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false,
      signupCount: [],
      currentMemberInfo: ["test"],
      popupDate: "none",
      popupMembers: ["no signups"],
      popupDisplay: "block",
      popupHour: "default",
      xPos: "0px",
      yPos: "0px"
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    this.props.getEvent(this.props.match.params.eventid);
  }

  showPopup(e) {
    let membersArr = this.state.signupData[e.target.dataset.index].signups.map(
      (signup, index) => {
        if (signup.availability.indexOf(Number(e.target.dataset.hour)) !== -1) {
          return signup.member;
        }
      }
    );
    if (membersArr.length === 0 || membersArr[0] === undefined) {
      membersArr = ["No signups"];
    }
    this.setState({
      popupMembers: membersArr,
      popupDisplay: "block",
      popupDate: this.state.signupData[e.target.dataset.index].week,
      popupHour: this.props.hoursValues[e.target.dataset.hour],
      xPos: e.pageX,
      yPos: e.pageY
    });
  }

  closePopup(e) {
    this.setState({
      popupDisplay: "none"
    });
  }

  componentWillReceiveProps(nextProps) {
    //creates array containing total number of members signed up
    const signups = [];
    nextProps.event.event.weekly.forEach(week => {
      const weekData = {};
      weekData.week = week.week;
      weekData.signups = [];
      week.signups.forEach(signup => {
        const signupData = {};
        signupData.availability = signup.availability;
        signupData.member = signup.member.username;
        weekData.signups.push(signupData);
      });
      signups.push(weekData);
    });
    this.setState(
      {
        signupData: signups
      },
      () => {
        const { signupData } = this.state;
        const { hoursValues } = this.props;
        const signupCount = [];
        const currentMemberInfo = [];
        if (signupData) {
          signupData.forEach((signupData, index1) => {
            const tempHourArray = hoursValues.map((hour, index1) => {
              let counter = 0;
              signupData.signups.forEach((signup, index2) => {
                if (signup.availability.indexOf(hour) !== -1) {
                  counter += 1;
                }
              });
              return counter;
            });
            signupCount.push(tempHourArray);
            //creates signup array of current logged in member
            //Copy tempHourArray, add +1 to coutner only if signup.member === memberName
            const tempMemberInfo = hoursValues.map((hour, index1) => {
              let counter = 0;
              signupData.signups.forEach((signup, index2) => {
                if (signup.member === this.props.memberName) {
                  if (signup.availability.indexOf(hour) !== -1) {
                    counter += 1;
                  }
                }
              });
              return counter;
            });
            currentMemberInfo.push(tempMemberInfo);
          });
        }
        console.log(currentMemberInfo);
        this.setState({
          signupCount,
          currentMemberInfo
        });
      }
    );
  }

  onMouseDown(e) {
    this.setState({
      mouseDown: true
    });
    e.target.dataset.on === "false"
      ? (e.target.dataset.on = "true")
      : (e.target.dataset.on = "false");
    if (e.target.dataset.on === "true") {
      fillSquare = true;
      if (fillSquare) {
        e.target.classList.add("js-column-cell-selected");
      }
    } else {
      fillSquare = false;
      if (fillSquare === false) {
        e.target.classList.remove("js-column-cell-selected");
      }
    }
  }

  onMouseEnter(e) {
    if (this.state.mouseDown) {
      e.target.dataset.on === "false"
        ? (e.target.dataset.on = "true")
        : (e.target.dataset.on = "false");
      if (e.target.dataset.on === "true") {
        if (fillSquare) {
          e.target.classList.add("js-column-cell-selected");
        }
      } else {
        if (!fillSquare) {
          e.target.classList.remove("js-column-cell-selected");
        }
      }
    }
  }

  onMouseUp(e) {
    this.setState({
      mouseDown: false
    });
  }

  //RENDER ====================================================================

  render() {
    console.log(this.state.currentMemberInfo);
    const { event, loading } = this.props.event;
    const { hoursArray, hoursValues, styleColor } = this.props;
    const {
      signupData,
      signupCount,
      popupDate,
      popupMembers,
      popupHour,
      popupDisplay,
      xPos,
      yPos,
      currentMemberInfo
    } = this.state;

    console.log(event);

    let eventContent, resultsContent;

    if (
      event === null ||
      loading ||
      Object.keys(event).length === 0 ||
      signupCount.length === 0
    ) {
      eventContent = <Spinner />;
      resultsContent = null;
    } else {
      //1st column of signup grid - Time + time labels
      const timeColumn = hoursArray.map((hour, index) => {
        return (
          <div className="signup-table__hour-column" key={index}>
            {index === 0 ? "Time" : hour}
          </div>
        );
      });

      //Date headers + columns for time signup selection

      let signupCells = event.weekly.map((week, index1) => {
        const hoursGrid = hoursValues.map((value, index2) => {
          if (styleColor) {
          }
          return (
            <div
              data-hour={value}
              data-date={week.week}
              data-on={
                currentMemberInfo[index1][index2] === 1 ? "true" : "false"
              }
              data-index={index2}
              key={index2}
              className={classnames("schedule-container__signup-cells", {
                "js-column-cell-selected":
                  currentMemberInfo[index1][index2] === 1
              })}
              onMouseDown={this.onMouseDown}
              onMouseEnter={this.onMouseEnter}
            />
          );
        });
        return (
          <div key={index1} className="signup-table__grid-column">
            <div className="signup-table__grid-column-headers">{week.week}</div>
            {hoursGrid}
          </div>
        );
      });

      let resultsCells = event.weekly.map((week, weekIndex) => {
        const hoursGrid = hoursValues.map((value, valueIndex) => {
          return (
            <div
              data-hour={value}
              data-date={week.week}
              data-on="false"
              data-index={weekIndex}
              key={valueIndex}
              style={{
                backgroundColor: styleColor[signupCount[weekIndex][valueIndex]]
              }}
              className="schedule-container__signup-cells"
              onMouseEnter={this.showPopup}
              onMouseLeave={this.closePopup}
            />
          );
        });
        return (
          <div key={weekIndex} className="signup-table__grid-column">
            <div className="signup-table__grid-column-headers">{week.week}</div>
            {hoursGrid}
          </div>
        );
      });

      //Final grid component + results component
      eventContent = (
        <div className="schedule-container">
          <div className="schedule-container__titlebar">
            <h4>{event.name}</h4>
            <p>{event.description}</p>
          </div>
          <div className="schedule-container__content-body">
            <div className="signup-table">
              <div className="signup-table__time-column">{timeColumn}</div>
              {signupCells}
            </div>
          </div>
        </div>
      );

      resultsContent = (
        <div className="schedule-container">
          <div className="schedule-container__content-body">
            <div className="signup-table">
              <div className="signup-table__time-column">{timeColumn}</div>
              {resultsCells}
            </div>
          </div>
        </div>
      );
    }

    console.log(signupData);

    return (
      <div onMouseUp={this.onMouseUp} className="schedule-component">
        {eventContent}
        <div className="results-container">
          <h4 className="results-container__title">
            Current Schedule Results:
          </h4>
          <div className="schedule-component">{resultsContent}</div>
        </div>
        <ResultsPopup
          popupDate={popupDate}
          popupHour={popupHour}
          popupMembers={popupMembers}
          popupDisplay={popupDisplay}
          xPos={xPos}
          yPos={yPos}
        />
      </div>
    );
  }
}

Schedule.defaultProps = {
  styleColor: ["", "white", "blue", "green", "black"],
  hoursValues: [
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11
  ],
  hoursArray: [
    null,
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM"
  ]
};

const mapStateToProps = state => ({
  event: state.event,
  memberName: state.member.member.username
});

export default connect(
  mapStateToProps,
  { getEvent }
)(Schedule);
