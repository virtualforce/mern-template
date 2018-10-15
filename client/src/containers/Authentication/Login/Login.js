import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import TextField from "../../../components/UI/FormElements/TextField";
import { loginUser } from "../../../store/actions/authActions";
import Error from "../../../components/Common/Error";
import OAuth from "../OAuth/OAuth";

import io from "socket.io-client";
const socket = io("http://localhost:5000");

const providers = ["google", "facebook"];

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    const socialBtns = providers.map(provider => (
      <OAuth provider={provider} key={provider} socket={socket} />
    ));

    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={this.onSubmit}>
            <Error error={errors.message} />
            <TextField
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Enter Email"
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
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Login
            </button>
            {socialBtns}
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
