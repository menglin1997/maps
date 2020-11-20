/*
 * @Descripttion: 
 * @version: 
 * @Author: zml
 * @Date: 2020-11-10 16:47:25
 * @LastEditors: zml
 * @LastEditTime: 2020-11-19 15:01:46
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    entry: {
        // app: './src/index.js',
        // print: './src/print.js'
        app: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(), // 清除之前打包数据
        new HtmlWebpackPlugin({
            title: 'Production'
        }),
        // new webpack.ProvidePlugin({
        //     _: 'lodash'
        // })
    ],
    // 代码重复包合并
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
            // {
            //     test:require.resolve('./src/index.js'),
            //     use: 'imports-loader?this=>window'
            // }
        ]
    }
  };