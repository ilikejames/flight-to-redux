'use strict';

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const minify = process.argv.indexOf('--minify') !== -1
const noop = require('node-noop').noop;

module.exports = {

	entry: "./src/index",

	resolve: {
		root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
		extensions: ['', '.js', '.jsx'],
	},

	devtool: 'source-map',

	output: {
		path: path.join(__dirname, 'dist'),
		filename: `bundle-${process.env.NODE_ENV || 'unk'}${ minify ? '.min' : ''},.js`
	},

	module: {

		preLoaders: [
			{
				// test: /\.js?/, loader: "eslint-loader", exclude: /node_modules/
			}
		],

		loaders: [
			{
				test: /\.jsx?/,
				loaders: ['babel'],
				include: path.join(__dirname, 'src')
			},
			{
		    	test: /\.scss$/,
		    	loader: ExtractTextPlugin.extract('css!sass')
		    }
		]
	},

	plugins: [
	    new webpack.EnvironmentPlugin([
	      'NODE_ENV',
	      'API_HOST'
	    ]),
	    new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
        minify
         ? new webpack.optimize.UglifyJsPlugin({
	      compress: { warnings: false }
	    }) : noop
	],

	postcss: function() {
	    return [
	    	autoprefixer({
	    		browsers: ['last 3 versions']
    		})
    	]
    }

};

