var webpack = require( "webpack" );
var html = require( "html-webpack-plugin" );
var merge = require( "webpack-merge" );
var path = require( "path" );
var cssimport = require( "postcss-import" );
var cssnext = require( "postcss-cssnext" );
var cssmixins = require( "postcss-mixins" );
var extractor = require( "extract-text-webpack-plugin" );
var devConfig = require( "./webpack.dev.config" );
var distConfig = require( "./webpack.dist.config" );
var CopyWebpackPlugin = require( "copy-webpack-plugin" );

var SRC_DIR = path.resolve( __dirname, "src" );

var devCss = {
  test: /\.css$/,
  use: [
    {
      loader: "style-loader",
    },
    {
      loader: "css-loader",
    },
    {
      loader: "postcss-loader",
      options: {
        plugins: function () {
          return [
            cssimport,
            cssnext,
            cssmixins,
          ];
        },
      },
    },
  ],
};

var distCss = {
  test: /\.css$/,
  use: extractor.extract( {
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: function () {
            return [
              cssimport,
              cssnext,
              cssmixins,
            ];
          },
        },
      },
    ],
  } ),
};

var cssRule;
switch ( process.env.NODE_ENV ) {
  case "development":
    cssRule = devCss;
    break;
  case "production":
    cssRule = distCss;
    break;
}

var config = {
  entry: SRC_DIR + "/index.jsx",
  output: {
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader",
      },
      cssRule,
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|dist)/,
        use: [ {
          loader: "babel-loader",
          options: {
            presets: [ "es2015", "react", "stage-1" ],
          },
        } ],
      },
      {
        test: /.(ttf|otf|eot|svg|jpg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [ ".js", ".jsx" ],
    modules: [
      path.resolve( SRC_DIR ),
      path.resolve( "./node_modules" ),
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new html( {
      template: SRC_DIR + "/index.html",
    } ),
    new CopyWebpackPlugin( [
      { from: SRC_DIR + "/assets/", to: "assets/" },
    ] ),
  ],
};

// npm run dist vs npm run dev needs different config settings
switch ( process.env.NODE_ENV ) {
  case "development":
    config = merge( config, devConfig );
    break;
  case "production":
    config = merge( config, distConfig );
    break;
}

module.exports = config;
