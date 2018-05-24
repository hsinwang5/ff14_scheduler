import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginGroup } from "../../actions/groupActions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false
    };
  }

  render() {
    console.log(this.props);
    return (
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
                  Loot Tracker
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
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { loginGroup })(NavBar);
