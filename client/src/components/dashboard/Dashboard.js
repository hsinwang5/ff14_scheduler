import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { getGroup } from "../../actions/groupActions";
import * as moment from "moment";

import Spinner from "../common/Spinner";
import NavBar from "../layout/NavBar";

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
    const today = moment().format("MMMM Do, YYYY");
    const { group, loading } = this.props.group;
    let dashboardContent;

    if (group === null || loading || Object.keys(group).length === 0) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <Route
            path="/dashboard/:id"
            render={props => <NavBar {...props} group={group} />}
          />
          <h4>
            Welcome {group.groupname}, today is {today}
          </h4>
          <div className="dashboard">test</div>
          <div className="dashboard__login-form">TODO: LOGIN FORM</div>
        </div>
      );
    }
    return (
      <Router>
        <div className="container">{dashboardContent}</div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  group: state.group,
  errors: state.errors
});

export default connect(mapStateToProps, { getGroup })(Dashboard);
//test
