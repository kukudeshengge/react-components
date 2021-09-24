
const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require('webpack-merge');
const webpackGlobalConfig = require('./webpack.config');

const proConfig = {
    mode: "development",
    entry: path.resolve(__dirname, "../components/index.js"),
    devtool: false,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
        library: "JiYongShengComponents",
        libraryTarget: 'umd'
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    performance: {
        hints: 'warning'
    },
    externals: {
        'react': "react"
    }
};

module.exports = merge(proConfig, webpackGlobalConfig);