const webpack = require('webpack');
const { merge } = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portFinder = require('portfinder');
const WebpackBase = require('./webpack.base');

const webpackDevConfig = merge(WebpackBase, {
    mode: 'development',
    context: __dirname,
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        compress: true,
        historyApiFallback: true,
        port: 8000,
        hot: true,
        open: true,
        quiet: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        hotOnly: true,
    },
    watchOptions: { // 监听
        ignored: [ // 不被监听项
            /node_modules/,
        ],
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
})

module.exports = portFinder.getPortPromise({
    port: 3009,
}).then((port) => merge(webpackDevConfig, {
    devServer: {
        port,
    },
}))