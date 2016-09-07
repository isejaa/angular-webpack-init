const webpack = require('webpack');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

module.export = function makeConfig() {
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
    * Loaders
    * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
    * List: http://webpack.github.io/docs/list-of-loaders.html
    * This handles most of the magic responsible for converting modules
    */
   config.module = {
     preLoaders: [],
     loaders: []
   };

   config.plugins = [];

   /**
    * Dev server configuration
    * Reference: http://webpack.github.io/docs/configuration.html#devserver
    * Reference: http://webpack.github.io/docs/webpack-dev-server.html
    */
   config.devServer = {
     contentBase: './src',
     stats: 'minimal'
   };

   console.log(config);

   return config;
}();
