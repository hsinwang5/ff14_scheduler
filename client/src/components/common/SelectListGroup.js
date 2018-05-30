import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  options,
  required,
  selected,
  image
}) => {
  const selectOptions = options.map(option => (
    <option className="option" key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group form-group__select">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        selected={selected}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool
};

export default SelectListGroup;
