const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'eslint.bundle.js'
	},

	devServer:{
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
		            // eslint options (if necessary) 
		            // fix : true
		        }
		    },
	    ],
	},

	plugins:[
		new HtmlWebpackPlugin(),
	]
};