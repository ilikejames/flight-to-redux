'use strict';

const webpack = require('webpack');

module.exports = function (config) {
	config.set({

		browsers: ['PhantomJS'],

		singleRun: !!process.env.CI,

		frameworks: [ 'mocha' ],

		files: [
			'./node_modules/phantomjs-polyfill/bind-polyfill.js',
			'karma.test.js'
		],

		preprocessors: {
			'karma.test.js': [ 'webpack', 'sourcemap' ]
		},

		reporters: [ 'mocha' ],

		plugins: [
			require("karma-webpack"),
			require("karma-mocha"),
			require("karma-mocha-reporter"),
			require("karma-phantomjs-launcher"),
			require("karma-sourcemap-loader")
		],

		webpack: {

			devtool: 'inline-source-map',

			module: {
				loaders: [
					{ test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']},
					{ test: /\.json$/, loader: 'json-loader' },
					{ test: /sinon\.js$/, loader: 'imports?define=>false,require=>false' },
					{ test: /\.scss$/, loader : 'style!css!sass?sourceMap' }
				],
				noParse: [
			        /node_modules\/sinon\//,
			    ]
			},

			resolve: {
				modulesDirectories: [
					'src',
					'node_modules'
				],
				alias: {
			        'sinon': 'sinon/pkg/sinon'
			    },
				extensions: ['', '.json', '.js', '.jsx']
			},

			externals: {
				'jsdom': 'window',
				'cheerio': 'window',
				'react/lib/ExecutionEnvironment': true,
				'react/lib/ReactContext': 'window',
		        'text-encoding': 'window'
			},

			plugins: [
				new webpack.IgnorePlugin(/\.json$/),
				new webpack.NoErrorsPlugin(),
				new webpack.EnvironmentPlugin([
		      'NODE_ENV',
		      'API_HOST'
		    ])
			]
		},

		webpackServer: {
			noInfo: true
		}

	});
};