import React from "react";

const Error = props => {
  const errorContent = props.error ? (
    <div className="alert alert-danger" role="alert">
      {props.error}
    </div>
  ) : null;
  return errorContent;
};

export default Error;
