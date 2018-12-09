const webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.js');
const path = require('path')

module.exports =  merge(webpackBaseConfig, {
  devtool: 'cheap-eval-source-map',
  entry: ['babel-polyfill', 'react-hot-loader/patch', './client/index.js'],
  devServer: {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    overlay: true,
    compress: true,
    disableHostCheck: true,
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
