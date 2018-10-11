import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import TextField from "../../../components/UI/FormElements/TextField";
import { signupUser } from "../../../store/actions/authActions";

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    };
    console.log(userData);
    this.props.signupUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={this.onSubmit}>
            <TextField
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={this.state.firstName}
              onChange={this.onChange}
              error={errors.firstName}
            />
            <TextField
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={this.state.lastName}
              onChange={this.onChange}
              error={errors.lastName}
            />
            <TextField
              type="email"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextField
              type="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextField
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              value={this.state.passwordConfirmation}
              onChange={this.onChange}
              error={errors.passwordConfirmation}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signupUser }
)(Signup);
