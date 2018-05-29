import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { registerGroup } from "../../actions/groupActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LandingRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupname: "",
      username: "",
      password: "",
      email: "",
      checked: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeclineClick = this.onDeclineClick.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const registerData = {
      groupname: this.state.groupname,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };

    this.props.registerGroup(registerData, this.props.history);
  }

  onDeclineClick(e) {
    this.setState(prevState => ({
      password: "",
      email: "",
      checked: !prevState.checked
    }));
    console.log("clicked");
  }

  render() {
    let { checked } = this.state;
    return (
      <div className="landing-form">
        <div className="landing-form__register">
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Create a name for your new group"
              name="groupname"
              value={this.state.groupname}
              onChange={this.onChange}
              required={true}
              disabled={false}
            />
            <label htmlFor="checked">Decline Registration</label>
            <input
              type="checkbox"
              value="checked"
              name="checked"
              onClick={this.onDeclineClick}
            />
            <TextFieldGroup
              placeholder="username (unique identifier)"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              required={checked ? false : true}
              disabled={checked ? true : false}
            />
            <TextFieldGroup
              placeholder="email (optional)"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              required={checked ? false : true}
              disabled={checked ? true : false}
            />
            <TextFieldGroup
              placeholder="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              required={checked ? false : true}
              disabled={checked ? true : false}
            />

            <input
              type="submit"
              value="Submit"
              className="btn-btn-info btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { registerGroup })(
  withRouter(LandingRegisterForm)
);
