var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: [
    'webpack-dev-server/client?http://localhost:7700', // Setting the URL for the hot reload
    'webpack/hot/only-dev-server', // Reload only the dev server
    './src/index.jsx'
  ],
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true,
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
