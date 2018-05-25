import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginGroup, logoutGroup } from "../../actions/groupActions";
import AdminLogin from "../dashboard/AdminLogin";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false
    };

    this.logoutGroup = this.logoutGroup.bind(this);
    this.showLogin = this.showLogin.bind(this);
  }

  showLogin(e) {
    this.setState(prevState => ({
      showLogin: !prevState.showLogin
    }));
  }

  logoutGroup(e) {
    e.preventDefault();
    this.setState(prevState => ({
      showLogin: !prevState.showLogin
    }));
    this.props.logoutGroup();
  }

  render() {
    console.log(this.props);
    const { isAuthenticated } = this.props;
    const { showLogin } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link
              className="navbar-brand"
              to={`/dashboard/${this.props.match.params.id}`}
            >
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/dashboard/${this.props.match.params.id}/events`}
                  >
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/dashboard/${this.props.match.params.id}/loottracker`}
                  >
                    Loot-Tracker
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/dashboard/${this.props.match.params.id}/guides`}
                  >
                    Guides
                  </Link>
                </li>
                <li className="nav-item">
                  {isAuthenticated ? (
                    <span onClick={this.logoutGroup} className="nav-link">
                      Logout
                    </span>
                  ) : (
                    <span onClick={this.showLogin} className="nav-link">
                      Login
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {showLogin && !isAuthenticated ? <AdminLogin /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.group.isAuthenticated
});

export default connect(mapStateToProps, { loginGroup, logoutGroup })(NavBar);
