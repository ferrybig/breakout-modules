const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/js/main.js',
	mode: 'production',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: false,
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'src/img', to: 'img', globOptions: { ignore: ["**/*.xcf"] }, }
			],
		})
	],
};

