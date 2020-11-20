/*
 * @Descripttion: 
 * @version: 
 * @Author: zml
 * @Date: 2020-11-10 16:47:36
 * @LastEditors: zml
 * @LastEditTime: 2020-11-12 14:06:44
 */
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    output: {
      filename: '[name].bundle.js',

    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist'
    }
})