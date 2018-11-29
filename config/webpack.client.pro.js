const webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.js');
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const clientConfig = merge(webpackBaseConfig, {
  mode: process.env.NODE_ENV,
})

if(isDev){
  clientConfig.devtool = 'cheap-eval-source-map';
  clientConfig.devServer = {
    host: '0.0.0.0',
    port: '3000',
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    overlay: true,
    compress: true,
    disableHostCheck: true,
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}else {

}

module.exports = clientConfig