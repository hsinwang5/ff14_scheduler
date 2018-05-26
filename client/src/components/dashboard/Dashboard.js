import React, { Component } from "react";

import { connect } from "react-redux";
import { getGroup } from "../../actions/groupActions";
import * as moment from "moment";

import Spinner from "../common/Spinner";
import NavBar from "../layout/NavBar";
import Calendar from "./Calendar";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMember: null
    };
  }

  componentDidMount() {
    console.log("mount called");
    this.props.getGroup(this.props.match.params.id);
  }

  render() {
    // const today = moment().format("MMMM Do, YYYY");
    const today = moment("May 25th, 2018 00:33", "MMM-DD-YYYY HH:mm").utc();
    // today.utc();

    // console.log(today.utc().format());
    const { group, loading, date, isAuthenticated } = this.props.group;
    const { showLogin } = this.state;
    let dashboardContent;

    console.log(moment().month());

    if (group === null || loading || Object.keys(group).length === 0) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <h4>
            Welcome {group.groupname}, today is {}
          </h4>
          <div className="dashboard">test</div>
          <Calendar />
        </div>
      );
    }
    return <div className="container">{dashboardContent}</div>;
  }
}

const mapStateToProps = state => ({
  group: state.group,
  errors: state.errors
});

export default connect(mapStateToProps, { getGroup })(Dashboard);
//test
