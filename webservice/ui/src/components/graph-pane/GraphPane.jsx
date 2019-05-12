import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "./GraphPane.css";

const GraphPane = ( { graphId, graphData, graphOptions } ) => {
  return (
    <div className="graph-pane" key={ graphId }>
      <Line data={ graphData } redraw={ true } options={ graphOptions } />
    </div>
  );
};

GraphPane.propTypes = {
  graphId: PropTypes.string.isRequired,
  graphData: PropTypes.shape( {
    labels: PropTypes.array,
    datasets: PropTypes.obj,
    options: PropTypes.obj,
  } ),
  graphOptions: PropTypes.shape( {

  } ),
};

GraphPane.defaultProps = {
};

export default GraphPane;
