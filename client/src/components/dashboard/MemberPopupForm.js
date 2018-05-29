import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createMember } from "../../actions/memberActions";

class MemberPopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      mainclass: "",
      altclass: [],
      declineEmail: false,
      declinePassword: false,
      addSelectInput: [],
      prevValue: "",
      toggleForm: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeclineEmail = this.onDeclineEmail.bind(this);
    this.onDeclinePassword = this.onDeclinePassword.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDeclineEmail(e) {
    this.setState(prevState => ({
      declineEmail: !prevState.declineEmail
    }));
  }

  onDeclinePassword(e) {
    this.setState(prevState => ({
      declinePassword: !prevState.declinePassword
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    const memberData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      mainclass: this.state.mainclass,
      altclass: this.state.altclass,
      groupid: this.props.groupid
    };

    this.props.createMember(memberData);
    console.log("submitted");
  }

  toggleForm(e) {
    this.setState(prevState => ({
      toggleForm: !prevState.toggleForm,
      username: "",
      email: "",
      password: "",
      mainclass: "",
      altclass: [],
      declineEmail: false,
      declinePassword: false,
      addSelectInput: [],
      prevValue: ""
    }));
  }

  onSelect(e) {
    const altclass = this.state.altclass;
    const addSelectInput = this.state.addSelectInput;
    if (e.target.getAttribute("prevValue")) {
      let removed = altclass.splice(
        altclass.indexOf(e.target.getAttribute("prevValue")),
        1
      );
    }
    e.target.setAttribute("prevValue", e.target.value);
    if (!e.target.getAttribute("selected")) {
      addSelectInput.push("x");
    } else {
    }
    e.target.setAttribute("selected", true);
    if (altclass.indexOf(e.target.value) === -1) {
      altclass.push(e.target.value);
    }
    this.setState({
      altclass,
      addSelectInput
    });
  }

  render() {
    const classOptions = [
      { label: "Select Class", value: "" },
      { label: "Warrior", value: "Warrior" },
      { label: "Paladin", value: "Paladin" },
      { label: "Dark Knight", value: "Dark Knight" },
      { label: "Summoner", value: "Summoner" },
      { label: "Bard", value: "Bard" },
      { label: "Dragoon", value: "Dragoon" },
      { label: "Monk", value: "Monk" },
      { label: "Ninja", value: "Ninja" },
      { label: "Machinist", value: "Machinist" },
      { label: "Samurai", value: "Samurai" },
      { label: "Red Mage", value: "Red Mage" },
      { label: "Black Mage", value: "Black Mage" },
      { label: "White Mage", value: "White Mage" },
      { label: "Astrologian", value: "Astrologian" },
      { label: "Scholar", value: "Scholar" }
    ];
    const addonSelect = this.state.addSelectInput.map((add, index) => {
      return (
        <SelectListGroup
          placeholder="alt classes"
          name="altclass"
          onChange={this.onSelect}
          options={classOptions}
          info="Select any number of alt classes"
          key={index}
        />
      );
    });
    return (
      <div className="member-form">
        <h4 onClick={this.toggleForm}>
          Don't see your character? Register one now!
        </h4>
        {this.state.toggleForm ? (
          <form className="member-form__form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="player handle (unique)"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              required={true}
            />
            <label className="label" htmlFor="declineemail">
              Decline email
            </label>
            <input
              className="checkbox"
              type="checkbox"
              value="checked"
              name="declineemail"
              onClick={this.onDeclineEmail}
            />
            <TextFieldGroup
              placeholder="email (optional)"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              required={this.state.declineEmail ? false : true}
              disabled={this.state.declineEmail ? true : false}
            />
            <label className="label" htmlFor="decline">
              Decline password
            </label>
            <input
              className="checkbox"
              type="checkbox"
              value="decline"
              name="decline"
              onClick={this.onDeclinePassword}
            />
            <TextFieldGroup
              placeholder="password (optional)"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              required={this.state.declinePassword ? false : true}
              disabled={this.state.declinePassword ? true : false}
            />
            <div className="select-group">
              <SelectListGroup
                placeholder="main class"
                name="mainclass"
                onChange={this.onChange}
                options={classOptions}
                info="Select your main class (required)"
                required={true}
              />
              <SelectListGroup
                placeholder="alt classes"
                name="altclass"
                onChange={this.onSelect}
                options={classOptions}
                info="Select any number of alt classes(optional)"
              />
            </div>
            {addonSelect}
            <input
              type="submit"
              value="Submit"
              className="button button--green"
            />
          </form>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groupid: state.group.group._id,
  showMemberForm: state.member.showMemberForm
});

export default connect(mapStateToProps, { createMember })(MemberPopupForm);
