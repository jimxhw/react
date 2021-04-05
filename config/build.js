// config/build.js
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod');

webpack(webpackConfig, function (err, stats) {
	console.log(err, 'err');
	console.log(stats, 'stats');
});
