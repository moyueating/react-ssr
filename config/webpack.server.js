const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  externals: Object.keys(require('../package.json')).dependencies,
  // JS 执行入口文件
  entry: [path.resolve(__dirname, '../server/app.js')],
  output: {
    filename: 'server_entry.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public',
    libraryTarget: 'commonjs2',
  },
  // 启用node的__dirname
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
