"use strict";

var path = require( "path" );
var webpack = require( "webpack" );
var clean = require( "clean-webpack-plugin" );
var cssimport = require( "postcss-import" );
var cssnext = require( "postcss-cssnext" );
var extractor = require( "extract-text-webpack-plugin" );

// dist config
module.exports = {
  output: {
    path: path.resolve( __dirname, "dist" ),
    publicPath: "./",
    filename: "app.js",
  },
  plugins: [
    new extractor( "styles.css" ),
    new webpack.DefinePlugin( {
      "process.env": {
        "NODE_ENV": JSON.stringify( "production" ),
      },
    } ),
    new clean( [
      path.resolve( __dirname, "dist" ),
    ] ),
    new webpack.optimize.UglifyJsPlugin( {
      compressor: { warnings: true },
    } ),
  ],
};
