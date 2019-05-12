"use strict";

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    port: 8080,
    host: "0.0.0.0",
    historyApiFallback: true,
    // public: "10.0.0.50", // set this to your network IP for testing on other devices
  },
};
