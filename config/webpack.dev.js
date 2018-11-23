const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const webpack = require('webpack')


module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: 'js/main.[hash:8].js',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    contentBase: path.join(__dirname, "../public"),
    hot: true,
    overlay: true,
    compress: true,
    disableHostCheck: true,
    // quiet: true,
    historyApiFallback: true
  }
});