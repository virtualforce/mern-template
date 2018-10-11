import React from "react";

import "./Layout.css";
import Aux from "../../hoc/Aux";
import Header from "../../containers/Header/Header";

const Layout = props => (
  <Aux>
    <Header />
    <main id="main" className="container">
      {props.children}
    </main>
  </Aux>
);

export default Layout;
