import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createMember, loginMember } from "../../actions/memberActions";
import classnames from "classnames";
// import bcrypt from "bcryptjs";

//Initial blocking popup page that forces users to log in as a registered
//in-game character or create a new character
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
      toggleForm: false,
      memberPassword: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeclineEmail = this.onDeclineEmail.bind(this);
    this.onDeclinePassword = this.onDeclinePassword.bind(this);
    this.onSelectCharacter = this.onSelectCharacter.bind(this);
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
    //remove non-ff14 class elements from altclass
    const altclass = this.state.altclass.filter(element => element !== null);
    let password, email;
    if (this.state.declinePassword) {
      password = "";
    } else {
      password = this.state.password;
    }
    if (this.state.declineEmail) {
      email = undefined;
    } else {
      email = this.state.password;
    }
    const memberData = {
      username: this.state.username,
      email,
      password,
      mainclass: this.state.mainclass,
      altclass,
      groupid: this.props.groupid,
      memberid: this.props._id
    };

    this.props.createMember(memberData);
  }

  toggleForm(e) {
    this.setState(prevState => {
      return {
        toggleForm: !prevState.toggleForm,
        username: "",
        email: "",
        password: "",
        prevValue: ""
      };
    });
    if (!this.state.toggleForm) {
      setTimeout(() => {
        window.scrollTo({
          top: 10000,
          behavior: "smooth"
        });
      }, 350);
    }
  }

  //adds a new html select input option upon selecting an alt class.
  //replaces duplicate alt classes with null values (to be filtered later)
  onSelect(e) {
    const altclass = this.state.altclass;
    const addSelectInput = this.state.addSelectInput;

    //puts index of alt class option into html sttribute stored as data
    if (!e.target.getAttribute("selected")) {
      addSelectInput.push("x");
      e.target.setAttribute("selected", addSelectInput.length - 1);
    }
    //If 'selected' attribute is present, replace that value in state.altclass
    //with the appropriate value if user changes his mind about a prev selection
    if (e.target.value === "" || altclass.indexOf(e.target.value) !== -1) {
      altclass[e.target.getAttribute("selected")] = null;
    } else {
      altclass[e.target.getAttribute("selected")] = e.target.value;
    }
    this.setState({
      altclass,
      addSelectInput
    });
    //auto-scroll to the newly created select option
    setTimeout(() => {
      window.scrollTo({
        top: 10000,
        behavior: "smooth"
      });
    }, 100);
  }

  onSelectCharacter(e) {
    e.preventDefault();

    const password =
      this.state.memberPassword === "" ? "password" : this.state.memberPassword;

    const loginData = {
      memberid: e.target.memberUsername.value,
      password
    };
    this.props.loginMember(loginData);
  }

  render() {
    const { members, classOptions } = this.props;

    const addonSelect = this.state.addSelectInput.map((add, index) => {
      return (
        <SelectListGroup
          placeholder="alt classes"
          name="altclass"
          onChange={this.onSelect}
          options={classOptions}
          image={true}
          info="Select any number of alt classes"
          key={index}
        />
      );
    });

    let memberSelect;

    if (members) {
      memberSelect = members.map((member, index) => {
        return (
          <div className="member-cards__card" key={index}>
            <h4>{member.username}</h4>
            <h5>{member.mainclass}</h5>
            <div
              className={`member-cards__icon member-cards__icon--${
                member.mainclass
              }`}
            />
            <form onSubmit={this.onSelectCharacter}>
              {member.passwordenabled ? (
                <TextFieldGroup
                  placeholder="password"
                  name="memberPassword"
                  type="password"
                  value={this.state.memberPassword}
                  onChange={this.onChange}
                  required={member.passwordenabled ? true : false}
                />
              ) : null}
              <input
                type="text"
                name="memberUsername"
                defaultValue={member._id}
                className="hidden-username"
              />
              <input
                type="submit"
                value="Select"
                className="button button--green"
              />
            </form>
          </div>
        );
      });
    } else {
      memberSelect = "test";
    }
    return (
      <div className="member-popup-section">
        <h4>Select your in-game character</h4>
        <div className="member-cards">{memberSelect}</div>
        <div className="member-form">
          <h4 onClick={this.toggleForm}>
            Don't see your character? Click here to register!
          </h4>

          <form
            className={classnames("member-form__form", {
              "js-slide-toggle": this.state.toggleForm
            })}
            onSubmit={this.onSubmit}
          >
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
                image={true}
                info="Select your main class (required)"
                required={true}
              />
              <SelectListGroup
                placeholder="alt classes"
                name="altclass"
                onChange={this.onSelect}
                options={classOptions}
                image={true}
                info="Select any number of alt classes"
              />
            </div>
            {addonSelect}
            <input
              type="submit"
              value="Submit"
              className="button button--green"
            />
          </form>
        </div>
      </div>
    );
  }
}

MemberPopupForm.defaultProps = {
  classOptions: [
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
  ]
};

const mapStateToProps = state => ({
  groupid: state.group.group._id,
  showMemberForm: state.member.showMemberForm
});

export default connect(mapStateToProps, { createMember, loginMember })(
  MemberPopupForm
);
