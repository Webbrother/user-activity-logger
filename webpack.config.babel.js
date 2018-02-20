import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
    devtool: 'source-map',
	module: {
		rules: [
			{
			    test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
			}
		]
	},
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        index: 'index.html',
        port: 9000,
        open: true,
        compress: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'src/index.html'
        })
    ]
};
