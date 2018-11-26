const merge = require('webpack-merge')
const parts = require('./build-config/webpack.parts')

const commonConfig = merge([
	parts.loadJS({exclude: /node_modules/}),
	parts.loadHTML({template: "./src/index.html"}),
])

const productionConfig  = merge([
	parts.extractCSS(),
	parts.extractSASS()
])

const developmentConfig = merge([
	parts.devServer({
		// Customize host/port here if needed
		host: process.env.HOST,
		port: process.env.PORT,
	}),
	parts.loadCSS(),
	parts.loadSASS()
])

module.exports = mode => {
	if (mode === "production") {
		return merge(commonConfig, productionConfig, {mode});
	}

	return merge(commonConfig, developmentConfig, {mode});
};
