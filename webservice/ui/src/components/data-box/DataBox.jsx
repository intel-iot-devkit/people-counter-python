import React from "react";
import PropTypes from "prop-types";
import "./DataBox.css";

const DataBox = ( { title, data, color } ) => (
  <div className="data-box">
    <div className="header"> { title } </div>
    <div className={ `data ${ color }` }> { data } </div>
  </div>
);

DataBox.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.oneOfType( [
    PropTypes.string,
    PropTypes.number ] ).isRequired,
  color: PropTypes.string.isRequired,
};
DataBox.defaultProps = {
  color: "",
};

export default DataBox;
