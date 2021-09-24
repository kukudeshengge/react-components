const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TersetPlugin = require('terser-webpack-plugin');
const path = require('path');
const isPro = process.env.NODE_ENV === 'production';

module.exports = {
    resolve: {
        extensions: ['.js', '.json', '.wasm'],
        alias: {
            "@": path.resolve(__dirname, 'components/')
        }
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new TersetPlugin({
                extractComments: false
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(less)$/,
                exclude: /node_modules/,
                use: [
                    // isPro ? MiniCssExtractPlugin.loader : 'style-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    // isPro ? MiniCssExtractPlugin.loader : 'style-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: 'css/[hash].css'
        // }),
        // new CssMinimizerPlugin()
    ]
}