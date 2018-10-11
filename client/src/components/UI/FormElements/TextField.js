import React from "react";
import { PropTypes } from "prop-types";
import classnames from "classnames";

import "./FloatingLabels.css";

const TextField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  error
}) => {
  const fieldId = `${name}_field`;
  return (
    <div className="form-label-group">
      <input
        className={classnames("form-control", { "is-invalid": error })}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        id={fieldId}
      />
      <label htmlFor={fieldId}>{placeholder}</label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string
};

export default TextField;
