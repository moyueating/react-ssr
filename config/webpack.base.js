const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk')

const host = require('../app.config').cdn.host

module.exports = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[hash:8].js",
    publicPath: host
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // use: 'babel-loader',
        use: ['happypack/loader?id=js'],
        include: path.resolve(__dirname, '../client'),
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader'
        ],
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'dist/media/[name].[ext]',
        },
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false,
      width: 200
    }),
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'js',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};