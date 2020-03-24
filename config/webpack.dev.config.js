const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: path.join(__dirname, '../example/app.js'),
    output: {
        path: path.join(__dirname, '../example/'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '../example/'),
        compress: true,
        host: '127.0.0.1',
        port: 3001,
        open: true
    }
};
module.exports = merge(devConfig, baseConfig);
