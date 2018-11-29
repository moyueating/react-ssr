const path = require('path');
const nodeExternals = require('webpack-node-externals');

console.log(path.resolve(__dirname, 'node_modules'))


module.exports = {
  mode: 'production',
  // JS 执行入口文件
  entry: './server/index.js',
  target: 'node',
  // 为了不打包进 node_modules 目录下的第三方模块
  externals: [nodeExternals()],
  output: {
    // 为了以 CommonJS2 规范导出渲染函数，以给采用 Nodejs 编写的 HTTP 服务调用
    libraryTarget: 'commonjs2',
    // 把最终可在 Nodejs 中运行的代码输出到一个 bundle.js 文件
    filename: 'server.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public'
  },
  // 启用node的__dirname
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude:  /node_modules/,  
      }
    ]
  },
  devtool: 'source-map' // 输出 source-map 方便直接调试 ES6 源码
};
