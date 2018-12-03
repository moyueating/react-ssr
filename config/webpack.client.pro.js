const webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.js');
const path = require('path')


const clientConfig = merge(webpackBaseConfig, {
  
})

module.exports = clientConfig