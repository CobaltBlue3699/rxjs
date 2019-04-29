const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://localhost:4200',
        'webpack/hot/dev-server',
        './index'
    ],
    output: {
        filename: 'index.bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 4200
    },
    plugins: [
        // new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            favicon: path.resolve(__dirname, 'favicon.ico')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(html)$/,
            use: {
                loader: 'raw-loader'
            }
        }]
    }
};