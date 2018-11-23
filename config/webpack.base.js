const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})


module.exports = {
  entry: ["babel-polyfill", './src/index.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "js/main.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // use: 'babel-loader',
        use: ['happypack/loader?id=js'],
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'dist/media/[name].[ext]',
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd(),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'js',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
  ],
};