
const DashboardPlugin = require('webpack-dashboard/plugin')
exports.devServer     = ({host, port} = {}) => ({
	devServer: {
		stats  : "errors-only",
		host, // Defaults to `localhost`
		port, // Defaults to 8080
		open   : true,
		overlay: true,
	},
	plugins  : [
		new DashboardPlugin()
	]
});

const HtmlWebpackPlugin = require("html-webpack-plugin")
exports.loadHTML        = ({include, exclude, template = "./src/index.html"} = {}) => ({
	module : {
		rules: [
			{
				test: /\.html$/,
				include,
				exclude,
				use : [{
					loader: 'html-loader'
				}]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template,
			filename: "./index.html"
		})
	]
})

exports.loadJS = ({include, exclude} = {}) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude,
				include,
				use : {
					loader: "babel-loader"
				}
			}
		]
	}
})


exports.loadCSS = ({include, exclude} = {}) => ({
	module: {
		rules: [
			{
				test: /\.css$/,
				include,
				exclude,

				use: ["style-loader", "css-loader"],
			},
		],
	},
});


exports.loadSASS = ({include, exclude} = {}) => ({
	module: {
		rules: [
			{
				test: /\.scss$/,
				include,
				exclude,
				use : ["style-loader", "css-loader", "sass-loader"],
			}
		]
	}
})


const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.extractCSS = ({include, exclude, use = ['css-loader'], test = /\.css$/} = {}) => {
	// Output extracted CSS to a file
	const plugin = new MiniCssExtractPlugin({
		filename: "[name].css",
	});

	return {
		module : {
			rules: [
				{
					test,
					include,
					exclude,

					use: [
						MiniCssExtractPlugin.loader,
					].concat(use),
				},
			],
		},
		plugins: [plugin],
	};
};

exports.extractSASS = ({include, exclude} = {}) => exports.extractCSS({
	include,
	exclude,
	use : ['css-loader', 'sass-loader'],
	test: /\.scss$/
})

