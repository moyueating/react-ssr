const webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.js');
const path = require('path')


const clientConfig = merge(webpackBaseConfig, {
    entry: ['babel-polyfill', 'react-hot-loader/patch', './client/index.js'],
})

module.exports = clientConfig