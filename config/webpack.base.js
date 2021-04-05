// config/webpack.base.js
const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const APP_PATH = path.resolve(__dirname, '../src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.tsx',
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: config.assetsRoot,
		publicPath: config.publicPath,
	},
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.(html)$/,
						loader: 'html-loader',
					},
					{
						test: /\.(j|t)sx?$/,
						include: APP_PATH,
						use: [
							{
								loader: 'babel-loader',
								options: {
									presets: [
										'@babel/preset-react', // jsx支持
										['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }], // 按需使用polyfill
									],
									plugins: [
										['@babel/plugin-proposal-class-properties', { loose: true }], // class中的箭头函数中的this指向组件
									],
									cacheDirectory: true, // 加快编译速度
								},
							},
							{
								loader: 'awesome-typescript-loader',
							},
						],
					},
					{
						test: /\.svg$/,
						loader: 'svg-inline-loader',
					},
					{
						test: /\.(less|css)$/,
						use: [
							{ loader: 'style-loader' },
							{
								loader: 'css-loader',
								options: {
									modules: true, // 如果要启用css modules，改为true即可
								},
							},
							{
								loader: 'less-loader',
								options: { javascriptEnabled: true },
							},
						],
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 自动判断后缀名，引入时可以不带后缀
		alias: {
			'@': path.resolve(__dirname, '../src/'), // 以 @ 表示src目录
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: config.indexPath,
			showErrors: true,
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {},
};
