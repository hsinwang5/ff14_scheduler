import React, { Component } from "react";

import { connect } from "react-redux";
import { getGroup } from "../../actions/groupActions";
import * as moment from "moment";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { logoutGroup } from "../../actions/groupActions";
import isEmpty from "../../utils/is-empty";

import Spinner from "../common/Spinner";
// import NavBar from "../layout/NavBar";
import Calendar from "./Calendar";
import MemberPopupForm from "./MemberPopupForm";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMember: null
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
    const cookies = new Cookies();
    if (cookies.get("tutorials") === undefined) {
      console.log("gonna call some cookies");
      cookies.set("tutorialsx", "Pacman", {
        path: "/",
        expires: new Date("May 28, 2028")
      });
    }
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      setTimeout(() => {
        if (decoded.groupname !== this.props.group.group.groupname) {
          console.log("logging user out - no match");
          this.props.logoutGroup();
        }
      }, 1000);
    }
  }

  render() {
    const today = moment().format("MMMM Do, YYYY");
    // const today = moment("May 25th, 2018 00:33", "MMM-DD-YYYY HH:mm").utc();
    // today.utc();

    // console.log(today.utc().format());
    const { group, loading, isAuthenticated } = this.props.group;
    let dashboardContent;

    if (group === null || loading || Object.keys(group).length === 0) {
      dashboardContent = <Spinner />;
    } else {
      console.log(group);
      dashboardContent = (
        <div>
          <h4>
            Welcome {group.groupname}, today is {today}
          </h4>
          <div className="dashboard">
            <Calendar />
            {this.props.showMemberForm ? (
              <MemberPopupForm members={group.members} />
            ) : null}
          </div>
        </div>
      );
    }
    console.log(dashboardContent);
    return <div className="container">{dashboardContent}</div>;
  }
}

const mapStateToProps = state => ({
  group: state.group,
  errors: state.errors,
  member: state.member,
  showMemberForm: state.member.showMemberForm
});

export default connect(mapStateToProps, { getGroup, logoutGroup })(Dashboard);
//test
