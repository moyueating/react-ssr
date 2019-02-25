const webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.js');
const path = require('path')


const clientConfig = merge(webpackBaseConfig, {
	entry: ['babel-polyfill', 'react-hot-loader/patch', './client/index.js'],
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions:{
				output: {
					comments: false,
				}
			}
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, '../public/index.html'),
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: '!!ejs-compiled-loader!' + path.resolve(__dirname, '../public/server.ejs'),
			filename: 'server.ejs'
		}),
	]
})

module.exports = clientConfig