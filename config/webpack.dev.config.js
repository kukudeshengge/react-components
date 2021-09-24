
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const webpackGlobalConfig = require('./webpack.config');
const devConfig = {
    mode: "development",
    cache: true,
    entry: path.resolve(__dirname, "../index.js"),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist')
        },
        client: {
            logging: 'none',
            progress:true
        },
        compress: true,
        open: true,
        port: 8888,
        hot: true
    },
    stats: 'none'
};


module.exports = merge(devConfig, webpackGlobalConfig);
