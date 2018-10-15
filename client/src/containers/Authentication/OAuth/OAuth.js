import React, { Component } from "react";
import { PropTypes } from "prop-types";

import "./OAuth.css";

class OAuth extends Component {
  state = {
    token: "",
    disabled: ""
  };

  componentDidMount() {
    const { socket, provider } = this.props;
    socket.on(provider, token => {
      this.popup.close();
      console.log(token);
      this.setState({ token });
    });
  }

  checkPopup = () => {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: "" });
      }
    }, 1000);
  };

  openPopup = () => {
    const { provider, socket } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `http://localhost:5000/api/auth/${provider}?socketId=${
      socket.id
    }`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
    );
  };

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: "disabled" });
    }
  };

  closeCard = () => {
    this.setState({ user: {} });
  };

  render() {
    return (
      <button
        className="btn btn-lg btn-primary btn-block social-btn"
        onClick={this.startAuth}
        disabled={this.state.disabled}
      >
        {this.props.provider}
      </button>
    );
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
};

export default OAuth;
