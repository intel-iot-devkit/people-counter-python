import React from "react";
import PropTypes from "prop-types";
import CameraFeed from "../../features/camera-feed/CameraFeed";

class Monitor extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <CameraFeed />
    );
  }
}

Monitor.propTypes = {
  // this provides route info, will cause lint error
  match: PropTypes.object,
};

Monitor.defaultProps = {
  match: {},
};

export default Monitor;