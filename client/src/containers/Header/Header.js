import { connect } from "react-redux";

import { logoutUser } from "../../store/actions/authActions";
import Navbar from "../../components/Navbar/Navbar";

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
