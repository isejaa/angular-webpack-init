const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

console.log(`${ENV} -- Test:${isTest} Prod:${isProd}`);

module.exports = function makeConfig() {
  const config = {};
  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = isTest ? {} : {
    todo: './src/app/app.js'
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
   config.output = isTest ? {} : {
     // Absolute output directory
     path: './dist',
     // Output path from the view of the page
     // Uses webpack-dev-server in development
     publicPath: isProd ? '/' : 'http://localhost:8080/',
     // Filename for entry points
     // Only adds hash in build mode
     filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
     // Filename for non-entry points
     // Only adds hash in build mode
     chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
   };

   /**
    * Devtool
    * Reference: http://webpack.github.io/docs/configuration.html#devtool
    * Type of sourcemap to use per build type
    */
    /*
   if (isTest) {
     config.devtool = 'inline-source-map';
   } else if (isProd) {
     config.devtool = 'source-map';
   } else {
     config.devtool = 'eval-source-map';
   }
   */

   /**
    * Loaders
    * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
    * List: http://webpack.github.io/docs/list-of-loaders.html
    * This handles most of the magic responsible for converting modules
    */
   config.module = {
     preLoaders: [],
     loaders: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'html'
    }]
   };

   config.plugins = [];

   // Skip rendering index.html in test mode
  if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      })
    );
  }

   /**
    * Dev server configuration
    * Reference: http://webpack.github.io/docs/configuration.html#devserver
    * Reference: http://webpack.github.io/docs/webpack-dev-server.html
    */
   config.devServer = {
     contentBase: './src',
     stats: 'minimal'
   };

   return config;
}();
