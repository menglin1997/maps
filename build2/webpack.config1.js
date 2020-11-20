/*
 * @Descripttion: 
 * @version: 
 * @Author: zml
 * @Date: 2020-11-10 15:23:32
 * @LastEditors: zml
 * @LastEditTime: 2020-11-12 11:33:57
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: {
        // app: './src/index.js',
        // print: './src/print.js'
        app: './src/index.js',
        another:'./src/another-module.js'
    },
    output: {
        // filename: '[name].bundle.js',
        filename: '[name].[chunkhash].js', // 通过使用 output.filename 进行文件名替换，可以确保浏览器获取到修改后的文件
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(), // 清除之前打包数据
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
          }),
        //   new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common' // 指定公共 bundle 的名称。
        //   })
        
    ],
    // 代码重复包合并
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
        ]
        }
        ]
    }
  };