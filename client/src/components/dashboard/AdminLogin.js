import React, { Component } from "react";
import { loginGroup } from "../../actions/groupActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("onsubmit called");
    const loginData = {
      email: this.state.email,
      password: this.state.password,
      id: this.props.groupId
    };
    this.props.loginGroup(loginData);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    console.log(this.props.groupId);
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="email (optional)"
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.onChange}
          required={true}
        />
        <TextFieldGroup
          placeholder="password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          required={true}
        />
        <input
          type="submit"
          value="Submit"
          className="btn-btn-info btn-block"
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  groupId: state.group.group._id
});

export default connect(mapStateToProps, { loginGroup })(withRouter(AdminLogin));
