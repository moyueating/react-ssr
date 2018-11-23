const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.js');

module.exports = merge(webpackBaseConfig, {
  plugins: [
    new UglifyJSPlugin()
  ]
})