import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./containers/Authentication/Login/Login";
import Signup from "./containers/Authentication/Signup/Signup";
import store from "./store/store";
import { bindToken, logoutUser } from "./store/actions/authActions";

if (localStorage.token) {
  store.dispatch(bindToken(localStorage.token));

  const currentTime = new Date() / 1000;
  const { user } = store.getState().auth;
  if (user.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Layout>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </Layout>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
