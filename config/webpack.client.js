const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  plugins: [
    // new CleanWebpackPlugin(['dist'], {
    //   root: process.cwd(),
    //   verbose: true,
    //   dry: false
    // }),
    new UglifyJSPlugin()
  ]
})