import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ( { label, click, type, disabled, data, addClass } ) => (
  <button className={ `btn ${ addClass }` } type={ type } disabled={ disabled } onClick={ () => click( data ) }>
    <span>{ label }</span>
  </button>
);

Button.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  click: PropTypes.func,
  addClass: PropTypes.string,
  data: PropTypes.shape( {
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    clearanceType: PropTypes.string,
    status: PropTypes.string,
    position: PropTypes.string,
    age: PropTypes.oneOfType( [
      PropTypes.string,
      PropTypes.number ] ),
    height: PropTypes.string,
    weight: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  } ),
};

Button.defaultProps = {
  label: undefined,
  type: "button",
  disabled: false,
  click: undefined,
  addClass: "",
  data: undefined,
};

export default Button;
